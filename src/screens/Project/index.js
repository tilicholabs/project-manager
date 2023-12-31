import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import ProgressCircle from 'react-native-progress-circle';
import shortid from 'shortid';
import styles from './projectStyle';
import {TabScreenHeader, TaskInfo} from '../../components';
import {combineData} from '../../utils/DataHelper';
import {AppContext} from '../../context';
import appTheme from '../../constants/colors';
import ActionButton from 'react-native-action-button';
import {Models} from '../../api/firebaseModel';
import {Loader} from '../../components/Loader';
import {dataFormatter} from '../../utils/DataFormatter';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {getScreenParent} from '../../utils/NavigationHelper';
import {colors} from '../../constants/all';
import {taskModel} from '../../api/taskModel';
import {MemberView, MembersView} from '../../components/MembersView';
import {fonts} from '../../constants/fonts';

export function Project({navigation, route}) {
  const {
    state,
    dispatch,
    setIsProjectSelected,
    members,
    selectedProject,
    setSelectedProject,
    selectedMembers,
    setSelectedMembers,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState([]);
  const tabs = ['All Tasks', 'In Progress', 'Completed'];
  const {bottomModal} = state;
  const [updated, setUpdated] = useState(false);
  const id = useRef(selectedProject?.id);

  const [data, setData] = useState({
    activeTab: 'All Tasks',
  });

  const totalTasks = useRef([]);

  const toggleTab = tab => {
    setData(combineData(data, {activeTab: tab}));
    setTasks(
      tab == 'All Tasks'
        ? [...totalTasks?.current]
        : totalTasks?.current?.filter(item => item?.status == tab),
    );
  };

  useEffect(() => {
    if (!!totalTasks?.current) toggleTab(data?.activeTab);
  }, [updated]);

  const isActiveTab = tab => {
    const value = data?.activeTab === tab;
    return value;
  };

  const getProjectTasks = async id => {
    // const res = await Models.tasks.getProjectTasks(id);
    const res = await taskModel.getProjectTasks(id);
    const formattedData = await dataFormatter(res);
    setTasks([...formattedData]);
    totalTasks.current = [...formattedData];
    firestore()
      .collection('tasks')
      .where('project_id', '==', id)
      .onSnapshot(async document => {
        const res = await dataFormatter(document);
        totalTasks.current = [...res];
        setUpdated(prv => !prv);
      });
    setLoading(false);
  };

  useEffect(() => {
    setSelectedProject(prev => ({
      ...prev,
      selectedMembers: [
        ...(Array?.isArray(prev?.selectedMembers) ? prev?.selectedMembers : []),
        ...selectedMembers,
      ],
    }));

    setSelectedMembers([]);
  }, [bottomModal]);

  useEffect(() => {
    getProjectTasks(selectedProject?.id);
  }, []);

  useEffect(() => {
    return () => setIsProjectSelected(false);
  }, []);

  const filterMembers = useCallback(arr => {
    const result = members.filter(item => {
      return arr?.find(ele => {
        return item?.id === ele;
      });
    });

    return result;
  }, []);

  const completedTasks = (
    Array?.isArray(totalTasks?.current) ? totalTasks?.current : []
  )?.filter(item => item?.status == 'Completed');

  const percent =
    Math?.round((completedTasks?.length / totalTasks?.current?.length) * 100) ||
    0;

  useEffect(() => {
    if (percent != undefined) {
      const numberOfCompletedTasks = completedTasks?.length;
      const numberOfInProgressTasks = (
        Array?.isArray(totalTasks?.current) ? totalTasks?.current : []
      )?.filter(item => item?.status === 'In Progress')?.length;

      if (
        numberOfCompletedTasks === totalTasks?.current?.length &&
        selectedMembers?.status != 'Completed' &&
        totalTasks?.current?.length != 0
      ) {
        Models.projects.update(selectedProject?.id, {status: 'Completed'});
        setSelectedProject(prv => ({...prv, status: 'Completed'}));
      } else if (
        (numberOfInProgressTasks > 0 || numberOfCompletedTasks > 0) &&
        selectedMembers?.status != 'In Progress'
      ) {
        Models.projects.update(selectedProject?.id, {status: 'In Progress'});
        setSelectedProject(prv => ({...prv, status: 'In Progress'}));
      } else if (
        numberOfInProgressTasks == 0 &&
        numberOfCompletedTasks == 0 &&
        selectedMembers?.status != 'Not Started'
      ) {
        Models.projects.update(selectedProject?.id, {status: 'Not Started'});
        setSelectedProject(prv => ({...prv, status: 'Not Started'}));
      }
    }
  }, [tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <ActionButton
        buttonColor={appTheme?.PRIMARY_COLOR}
        style={{zIndex: 1}}
        onPress={() => {
          setIsProjectSelected(true);
          navigateToNestedRoute(
            getScreenParent('CreateTask'),
            'CreateTask',
            {},
          );
        }}
      />
      <TabScreenHeader
        leftComponent={() => (
          <Text
            style={{
              fontSize: 20,
              fontWeight: 'bold',
              fontFamily: fonts.regular,
            }}>
            Project Details
          </Text>
        )}
        isSearchBtnVisible={true}
        isMoreBtnVisible={true}
      />
      {loading ? (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Loader />
        </View>
      ) : (
        <View>
          <View style={styles.projectDetailsSection}>
            <View style={styles.projectTitleWrapper}>
              <Text style={styles.projectTitle}>{selectedProject?.title}</Text>
            </View>
            <Text style={styles.projectDescription}>
              {selectedProject?.description}
            </Text>
            <View style={styles.projectTeamAndProgress}>
              <View style={styles.projectProgressWrapper}>
                <ProgressCircle
                  percent={percent}
                  radius={50}
                  borderWidth={10}
                  color="#6AC67E"
                  shadowColor="#f4f4f4"
                  bgColor="#fff">
                  <Text style={styles.projectProgress}>{percent}%</Text>
                </ProgressCircle>
              </View>
              <View>
                <Text style={styles.projectTeamTitle}>Team</Text>
                <View style={styles.projectTeamWrapper}>
                  <MembersView
                    members={
                      filterMembers(selectedProject?.selectedMembers) || []
                    }
                  />
                  <TouchableOpacity
                    style={styles.plusBtnContainer}
                    onPress={() =>
                      dispatch({
                        type: 'toggleBottomModel',
                        payload: {bottomModal: 'SelectMembers'},
                      })
                    }>
                    <MaterialCommunityIcons
                      name="plus"
                      size={22}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* <DropDownPicker
            placeholderStyle={{fontSize: 15}}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            containerStyle={{
              width: 130,
            }}
            style={{
              borderColor: 'transparent',
              backgroundColor: 'transparent',
            }}
            dropDownContainerStyle={{
              backgroundColor: '#fff',
              borderColor: 'transparent',
            }}
            labelStyle={{
              fontSize: 15,
            }}
          /> */}
            <Text
              style={[
                styles.projectStatus,
                {
                  borderColor: colors?.[selectedProject?.status],
                  color: 'black',
                  backgroundColor: colors?.[selectedProject?.status],
                },
              ]}>
              {selectedProject?.status}
            </Text>
          </View>
          <View style={styles.projectBody}>
            <View style={styles.projectTabs}>
              {tabs?.map((tab, index) => (
                <TouchableOpacity
                  style={[
                    styles.projectTab,
                    isActiveTab(tab) ? styles.activeProjectTab : null,
                  ]}
                  onPress={() => {
                    toggleTab(tab);
                  }}
                  key={shortid.generate(index)}>
                  <Text
                    style={[
                      styles.projectTabText,
                      isActiveTab(tab)
                        ? styles.activeProjectTabText
                        : styles.inActiveProjectTabText,
                    ]}>
                    {tab}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <>
              <View style={styles.bottomContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.bottomContent}>
                    {(Array?.isArray(tasks) ? tasks : [])?.map(
                      (task, index) => (
                        <View key={index}>
                          <TaskInfo task={task} key={shortid.generate()} />
                        </View>
                      ),
                    )}
                  </View>
                </ScrollView>
              </View>
            </>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
}
