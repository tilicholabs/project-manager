import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import shortid from 'shortid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import styles from './dashboardStyle';
import {AppContext} from '../../context';
import {TabScreenHeader, TaskInfo} from '../../components';
import appTheme from '../../constants/colors';
import {dashboardDetails} from '../../constants/all';
import ActionButton from 'react-native-action-button';
import Search from '../../components/Search';
import firestore from '@react-native-firebase/firestore';
import {dataFormatter} from '../../utils/DataFormatter';
import {useKeyboardDetails} from '../../hooks/useKeyboardDetails';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {getScreenParent} from '../../utils/NavigationHelper';
import AppLogo from '../../components/AppLogo';
import {Modals} from '../../api/firebaseModal';
import {Loader} from '../../components/Loader';

export function Dashboard({navigation}) {
  const {state, dispatch, user} = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState('All Tasks');
  const [searchValue, setSearch] = useState('');
  const [tasks, setTasks] = useState();
  const [keyboardDetails] = useKeyboardDetails();
  const [loading, setLoading] = useState(true);

  const getTasks = async () => {
    const data = await Modals.tasks.getUserTasks(user?.uid);
    setTasks(data);
    setLoading(false);
    firestore()
      .collection('tasks')
      .where('team', 'array-contains', user?.uid)
      .onSnapshot(async document => {
        console.log(document);
        const data = await dataFormatter(document);

        setTasks(data);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const getFiltered = () => {
    let tasksToRender = [];
    if (!value || value === 'All Tasks') {
      tasksToRender = tasks;
    } else if (value === 'In progress') {
      tasksToRender = tasks.filter(task => task?.status == 'In Progress') || [];
    } else if (value === 'Completed') {
      tasksToRender = tasks.filter(task => task?.status == 'Completed') || [];
    } else if (value === 'Not started') {
      tasksToRender = tasks.filter(task => task?.status == 'Not started') || [];
    }
    return tasksToRender;
  };

  const handleCreateTask = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'CreateTask'},
    });
  };

  const handleCreateProject = () => {
    navigateToNestedRoute(
      getScreenParent('CreateProject'),
      'CreateProject',
      {},
    );
  };

  const Card = ({
    bg = '',
    icon = '',
    size = 19,
    color = '#fff',
    status = '',
    count = '',
    onPress = () => {},
    selected,
    ...props
  }) => {
    return (
      <TouchableOpacity
        style={[
          styles.statisticsContent,
          {
            backgroundColor: bg,
            position: 'relative',
            opacity: 0.6,
          },
          selected && {
            borderWidth: 1,
            borderColor: 'black',
            opacity: 1,
          },
        ]}
        {...{onPress, ...props}}>
        {selected && (
          <View style={{position: 'absolute', top: -8, left: -5}}>
            <Entypo name={'dot-single'} size={50} color={'white'} />
          </View>
        )}
        <MaterialCommunityIcons
          name={icon}
          size={size}
          color={color}
          style={styles.statisticsIcon}
        />
        <View style={styles.statisticsCounter}>
          <Text style={styles.statisticsValue}>{count}</Text>
          <Text style={styles.statisticsTitle}>{status}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  const leftComponent = () => {
    return <AppLogo />;
  };

  const findFilterValue = (tasks = []) => {
    return (Array?.isArray(tasks) ? tasks : [])?.filter(item =>
      item?.title?.toLowerCase()?.includes(searchValue?.toLowerCase()),
    );
  };

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Loader />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      <TabScreenHeader {...{leftComponent, isBackButtonPresent: false}} />
      <ActionButton buttonColor={appTheme?.PRIMARY_COLOR} style={{zIndex: 1}}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          useNativeDriver={false}
          onPress={() => handleCreateTask()}>
          <MaterialCommunityIcons name={'clock-outline'} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="New Project"
          useNativeDriver={false}
          onPress={() => handleCreateProject()}>
          <MaterialCommunityIcons name={'file-check-outline'} />
        </ActionButton.Item>
      </ActionButton>
      <View style={{paddingVertical: 10}}>
        <Search
          {...{
            placeholder: 'Search task',
            value: searchValue,
            onChangeText: setSearch,
            backgroundColor: 'white',
          }}
        />
      </View>
      <ScrollView style={{paddingHorizontal: 16}}>
        {!keyboardDetails?.isVisible && (
          <View style={styles.statisticsSection}>
            <View style={styles.statisticsContainer}>
              {dashboardDetails?.map((items, index) => {
                return (
                  <Card
                    selected={items?.status == value}
                    {...{...items}}
                    onPress={() => {
                      setValue(items?.status);
                    }}
                  />
                );
              })}
            </View>
          </View>
        )}
        <View
          style={{
            ...styles.tasksSection,
            paddingTop: !keyboardDetails?.isVisible ? 30 : 0,
          }}>
          <Text style={{fontSize: 16, fontWeight: '700'}}>Tasks</Text>
          <View style={styles.tasksBody}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.tasksList}>
                {findFilterValue(getFiltered())?.map(task => (
                  <TaskInfo task={task} key={shortid.generate()} />
                ))}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
