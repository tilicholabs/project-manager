import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressCircle from 'react-native-progress-circle';
import shortid from 'shortid';
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './projectStyle';
import {TabScreenHeader, TaskInfo} from '../../components';
import {combineData} from '../../utils/DataHelper';
import {AppContext} from '../../context';
import appTheme from '../../constants/colors';
import ActionButton from 'react-native-action-button';
import {Modals} from '../../api/firebaseModal';
import {dataFormatter} from '../../utils/DataFormatter';
import {Loader} from '../../components/Loader';

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
  const tabs = ['All Tasks', 'Ongoing', 'Completed'];
  const {bottomModal} = state;

  const [data, setData] = useState({
    activeTab: 'Task List',
  });

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Reject', value: 'All Tasks'},
    {label: 'OnProgress', value: 'Ongoing'},
    {label: 'Completed', value: 'Completed'},
  ]);

  // const getTasks = () => {
  //   let tasksToRender = [];
  //   if (!value || value === 'All Tasks') {
  //     tasksToRender = tasks;
  //   } else if (value === 'Ongoing') {
  //     tasksToRender = tasks.filter(task => task.progress < 100) || [];
  //   } else if (value === 'Completed') {
  //     tasksToRender = tasks.filter(task => task.progress === 100) || [];
  //   }

  //   return tasksToRender;
  // };

  const handleBackButton = () => {
    navigation?.goBack();
  };

  const toggleTab = tab => {
    setData(combineData(data, {activeTab: tab}));
    setValue(tab);
  };

  const isActiveTab = tab => {
    const value = data?.activeTab === tab;
    return value;
  };

  const handleCreateTask = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'CreateTask'},
    });
  };

  const getProjectTasks = async id => {
    const data = await Modals.tasks.getProjectTasks(id);
    const formattedData = dataFormatter(data);
    setTasksFun(formattedData);
    setLoading(false);
    return data;
  };

  const setTasksFun = data => {
    setTasks(data);
  };

  useEffect(() => {
    setSelectedProject(prev => ({
      ...prev,
      selectedMembers: [...prev.selectedMembers, ...selectedMembers],
    }));
    getProjectTasks(selectedProject?.id);
    setSelectedMembers([]);
    return () => setIsProjectSelected(false);
  }, [bottomModal]);

  const filterMembers = arr => {
    const result = members.filter(item => {
      return arr?.find(ele => {
        return item?.id === ele;
      });
    });

    return result;
  };

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
                percent={0}
                radius={50}
                borderWidth={10}
                color="#6AC67E"
                shadowColor="#f4f4f4"
                bgColor="#fff">
                <Text style={styles.projectProgress}>
                  {selectedProject?.percent}%
                </Text>
              </ProgressCircle>
            </View>
            <View>
              <Text style={styles.projectTeamTitle}>Team</Text>
              <View style={styles.projectTeamWrapper}>
                {filterMembers(selectedProject?.selectedMembers)?.map(
                  member => {
                    return (
                      <Image
                        key={shortid.generate()}
                        style={styles.projectMemberPhoto}
                        source={{
                          uri: 'https://images.unsplash.com/photo-1609010697446-11f2155278f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                        }}
                      />
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
          <DropDownPicker
            placeholder="All Tasks"
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
          />
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
          {/* {data?.activeTab === 'Task List' ? (
            <>
              <View style={styles.tasksHeader}>
                <TouchableOpacity
                  style={styles.tasksRow}
                  onPress={() => handleCreateTask()}>
                  <Text style={styles.tasksLeftText}>Add Task</Text>
                  <View style={styles.plusBtnContainer2}>
                    <MaterialCommunityIcons
                      name="plus"
                      size={19}
                      color="#fff"
                    />
                  </View>
                </TouchableOpacity>
                <DropDownPicker
                  placeholder="All Tasks"
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
                />
              </View>
              <View style={styles.bottomContainer}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  <View style={styles.bottomContent}>
                    {getTasks()?.map(task => (
                      <TaskInfo task={task} key={shortid.generate()} />
                    ))}
                  </View>
                </ScrollView>
              </View>
            </>
          ) : data?.activeTab === 'File' ? (
            <></>
          ) : null} */}

          <>
            <View style={styles.tasksHeader}>
              {/* <TouchableOpacity
                style={styles.tasksRow}
                onPress={() => handleCreateTask()}>
                <Text style={styles.tasksLeftText}>Add Task</Text>
                <View style={styles.plusBtnContainer2}>
                  <MaterialCommunityIcons name="plus" size={19} color="#fff" />
                </View>
              </TouchableOpacity> */}
              {/* <DropDownPicker
                placeholder="All Tasks"
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
            </View>
            <View style={styles.bottomContainer}>
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.bottomContent}>
                  {loading ? (
                    <View style={{marginTop: 30}}>
                      <Loader />
                    </View>
                  ) : (
                    tasks?.map(task => (
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
