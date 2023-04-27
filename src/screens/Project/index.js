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

export function Project({navigation, route}) {
  const project = route.params;
  const {state, dispatch, setIsProjectSelected} = useContext(AppContext);
  const {members} = state;

  const [tasks, setTasks] = useState([]);

  // const tabs = ['Task List', 'File', 'Comments'];
  const tabs = ['All Tasks', 'Ongoing', 'Completed'];

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

    return data;
  };

  //  const getProjects = () => {
  //    let {activeTab} = data;
  //    let projectsToRender = [];
  //    if (activeTab === 'All') {
  //      projectsToRender = projects;
  //    } else {
  //      projectsToRender =
  //        projects?.filter(
  //          project => project.status === activeTab?.toLowerCase(),
  //        ) || [];
  //    }

  //    return projectsToRender;
  //  };

  const setTasksFun = data => {
    setTasks(data);
  };

  useEffect(() => {
    getProjectTasks(project?.id);
    return () => setIsProjectSelected(false);
  }, []);
  const filterMembers = arr => {
    const result = members.filter(item => {
      let bool = false;

      return arr?.find(ele => {
        return item?._data?.id === ele;
      });

      if (bool) {
        console.log(bool);
      }

      return bool;

      //  return item?._data?.id === ele;
    });

    return result;
  };
  const handleChangeTaskStatus = value => {};

  return (
    <SafeAreaView style={styles.container}>
      <ActionButton
        buttonColor={appTheme?.PRIMARY_COLOR}
        style={{zIndex: 1}}
        onPress={() => {
          dispatch({
            type: 'toggleBottomModal',
            payload: {bottomModal: 'CreateTask'},
          });
        }}
      />
      <TabScreenHeader
        leftComponent={() => (
          <TouchableOpacity
            onPress={() => handleBackButton()}
            style={styles.backButton}>
            <Ionicons name="arrow-back-outline" size={25} color="#000" />
          </TouchableOpacity>
        )}
        isSearchBtnVisible={true}
        isMoreBtnVisible={true}
      />
      <View>
        <View style={styles.projectDetailsSection}>
          <View style={styles.projectTitleWrapper}>
            <Text style={styles.projectTitle}>{project?.title}</Text>
            <TouchableOpacity>
              <MaterialCommunityIcons
                name="calendar-month-outline"
                size={20}
                color="#000"
              />
            </TouchableOpacity>
          </View>
          <Text style={styles.projectDescription}>{project?.description}</Text>
          <View style={styles.projectTeamAndProgress}>
            <View style={styles.projectProgressWrapper}>
              <ProgressCircle
                percent={0}
                radius={50}
                borderWidth={10}
                color="#6AC67E"
                shadowColor="#f4f4f4"
                bgColor="#fff">
                <Text style={styles.projectProgress}>{project?.percent}%</Text>
              </ProgressCircle>
            </View>
            <View>
              <Text style={styles.projectTeamTitle}>Team</Text>
              <View style={styles.projectTeamWrapper}>
                {filterMembers(project?.team_id)?.map(member => {
                  return (
                    // <View
                    //   style={{
                    //     // ...styles.singleMemberText,
                    //     backgroundColor: `#${Math.floor(
                    //       Math.random() * 16777215,
                    //     ).toString(16)}`,
                    //   }}>
                    <Image
                      key={shortid.generate()}
                      style={styles.projectMemberPhoto}
                      source={{
                        uri: 'https://images.unsplash.com/photo-1609010697446-11f2155278f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                      }}
                    />
                    // </View>
                  );
                })}
                <TouchableOpacity style={styles.plusBtnContainer}>
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
          <Text style={styles.projectStatus}>{project?.status}</Text>
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
                  {tasks?.map(task => (
                    <TaskInfo task={task} key={shortid.generate()} />
                  ))}
                </View>
              </ScrollView>
            </View>
          </>
        </View>
      </View>
    </SafeAreaView>
  );
}
