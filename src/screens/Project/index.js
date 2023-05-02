import React, {useState, useContext, useEffect, useRef} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firestore from '@react-native-firebase/firestore';

import ProgressCircle from 'react-native-progress-circle';
import shortid from 'shortid';
import styles from './projectStyle';
import {TabScreenHeader, TaskInfo} from '../../components';
import {combineData} from '../../utils/DataHelper';
import {AppContext} from '../../context';
import appTheme from '../../constants/colors';
import ActionButton from 'react-native-action-button';
import {Modals} from '../../api/firebaseModal';
import {Loader} from '../../components/Loader';
import {dataFormatter} from '../../utils/DataFormatter';

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
    const res = await Modals.tasks.getProjectTasks(id);
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

  const filterMembers = arr => {
    const result = members.filter(item => {
      return arr?.find(ele => {
        return item?.id === ele;
      });
    });

    return result;
  };

  const completedTasks = (
    Array?.isArray(totalTasks?.current) ? totalTasks?.current : []
  )?.filter(item => item?.status == 'Completed');

  const percent =
    Math?.round((completedTasks?.length / totalTasks?.current?.length) * 100) ||
    0;

  useEffect(() => {
    if (!!percent) {
      if (percent == 100 && selectedProject?.status != 'Completed') {
        Modals.projects.update(selectedProject?.id, {status: 'Completed'});
        setSelectedProject(prv => ({...prv, status: 'Completed'}));
      } else if (percent == 0 && selectedProject?.status != 'Not Started') {
        Modals.projects.update(selectedProject?.id, {status: 'Not Started'});
        setSelectedProject(prv => ({...prv, status: 'Not Started'}));
      } else if (
        selectedProject?.status != 'In Progress' &&
        percent > 0 &&
        percent < 100
      ) {
        Modals.projects.update(selectedProject?.id, {status: 'In Progress'});
        setSelectedProject(prv => ({...prv, status: 'In Progress'}));
      }
    }
  }, [completedTasks, tasks]);

  return (
    <SafeAreaView style={styles.container}>
      <ActionButton
        buttonColor={appTheme?.PRIMARY_COLOR}
        style={{zIndex: 1}}
        onPress={() => {
          setIsProjectSelected(true);
          dispatch({
            type: 'toggleBottomModal',
            payload: {bottomModal: 'CreateTask'},
          });
        }}
      />
      <TabScreenHeader
        leftComponent={() => (
          <Text style={{fontSize: 16}}>Project Details</Text>
        )}
        isSearchBtnVisible={true}
        isMoreBtnVisible={true}
      />
      <View>
        <View style={styles.projectDetailsSection}>
          <View style={styles.projectTitleWrapper}>
            <Text style={styles.projectTitle}>{selectedProject?.title}</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={20}
                color="#000"
              />
            </TouchableOpacity>
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
                {filterMembers(selectedProject?.selectedMembers)?.map(
                  member => {
                    return !!member?.profile_image ? (
                      <Image
                        style={{
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                          marginLeft: -10,
                        }}
                        source={{
                          uri: member?.profile_image,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          justifyContent: 'center',
                          display: 'flex',
                          alignItems: 'center',
                          backgroundColor: '#60C877',
                          height: 40,
                          width: 40,
                          borderRadius: 50,
                          marginLeft: -10,
                        }}>
                        <Text style={{fontSize: 24, fontWeight: 'bold'}}>
                          {member?.user_name[0].toUpperCase()}
                        </Text>
                      </View>
                    );
                  },
                )}
                <TouchableOpacity
                  style={styles.plusBtnContainer}
                  onPress={() =>
                    dispatch({
                      type: 'toggleBottomModal',
                      payload: {bottomModal: 'SelectMembers'},
                    })
                  }>
                  <MaterialCommunityIcons name="plus" size={22} color="#fff" />
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
          <Text style={styles.projectStatus}>{selectedProject?.status}</Text>
        </View>
        <View style={styles.projectBody}>
          <View style={styles.projectTabs}>
            {tabs?.map(tab => (
              <TouchableOpacity
                style={[
                  styles.projectTab,
                  isActiveTab(tab) ? styles.activeProjectTab : null,
                ]}
                onPress={() => {
                  toggleTab(tab);
                }}
                key={shortid.generate()}>
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
                  {loading ? (
                    <View style={{marginTop: 30}}>
                      <Loader />
                    </View>
                  ) : (
                    (Array?.isArray(tasks) ? tasks : [])?.map(task => (
                      <TaskInfo task={task} key={shortid.generate()} />
                    ))
                  )}
                </View>
              </ScrollView>
            </View>
          </>
        </View>
      </View>
    </SafeAreaView>
  );
}
