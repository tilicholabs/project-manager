import React, {useContext, useEffect, useMemo, useState} from 'react';
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
import {useIsFocused} from '@react-navigation/native';
import {taskModal} from '../../api/taskModal';

export function Dashboard({navigation}) {
  const {state, dispatch, user} = useContext(AppContext);
  const [value, setValue] = useState('All Tasks');
  const [searchValue, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);
  const [keyboardDetails] = useKeyboardDetails();
  const [loading, setLoading] = useState(true);

  const tasksCount = useMemo(
    () => ({
      'All Tasks': tasks?.length,
      'In Progress': tasks.filter(task => task?.status == 'In Progress')
        ?.length,
      Completed: tasks.filter(task => task?.status == 'Completed')?.length,
      'Not started': tasks.filter(task => task?.status == 'Not started')
        ?.length,
    }),
    [tasks],
  );

  const getTasks = async () => {
    if (user?.id) {
      // const data = await Modals.tasks.getUserTasks(user?.id);

      const data = await taskModal.getUserTasks(user?.id);

      setTasks(data);
      setLoading(false);
      firestore()
        .collection('tasks')
        .where('team', 'array-contains', user?.id)
        .onSnapshot(async document => {
          const data = await dataFormatter(document);

          setTasks(data);
        });
    }
  };

  useEffect(() => {
    getTasks();
  }, [user?.id]);

  const getFiltered = () => {
    let tasksToRender = [];
    if (!value || value === 'All Tasks') {
      tasksToRender = tasks;
    } else if (value === 'In Progress') {
      tasksToRender = tasks.filter(task => task?.status == 'In Progress') || [];
    } else if (value === 'Completed') {
      tasksToRender = tasks.filter(task => task?.status == 'Completed') || [];
    } else if (value === 'Not started') {
      tasksToRender = tasks.filter(task => task?.status == 'Not started') || [];
    }
    return tasksToRender;
  };

  const handleCreateTask = () => {
    navigateToNestedRoute(getScreenParent('CreateTask'), 'CreateTask', {});
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
    size = 25,
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
            opacity: 0.5,
          },
          selected && {opacity: 1},
        ]}
        {...{onPress, ...props}}>
        {selected && (
          <View style={{position: 'absolute', top: -21, left: -20}}>
            <Entypo name={'dot-single'} size={70} color={'black'} />
          </View>
        )}
        <MaterialCommunityIcons
          name={icon}
          size={size}
          color={'black'}
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

  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) setValue('All Tasks');
  }, [isFocused]);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Loader />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      {/* <TabScreenHeader {...{leftComponent, isBackButtonPresent: false}} /> */}
      <ActionButton
        buttonTextStyle={{fontSize: 30}}
        buttonColor={appTheme?.PRIMARY_COLOR}
        style={{zIndex: 1}}
        offsetX={20}
        offsetY={10}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          useNativeDriver={false}
          onPress={() => handleCreateTask()}>
          <MaterialCommunityIcons size={25} name={'clock-outline'} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="New Project"
          useNativeDriver={false}
          onPress={() => handleCreateProject()}>
          <MaterialCommunityIcons size={25} name={'file-check-outline'} />
        </ActionButton.Item>
      </ActionButton>
      <Text
        style={{
          fontSize: 18,
          fontWeight: '700',
          color: 'black',
          marginHorizontal: 16,
          marginTop: 10,
          fontFamily: 'Montserrat-Regular',
        }}>{`Welcome ${user?.user_name}`}</Text>
      <View style={{paddingTop: 10, paddingBottom: 20}}>
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
            {dashboardDetails?.map((items, index) => {
              return (
                <Card
                  selected={items?.status == value}
                  {...{...items, count: tasksCount?.[items?.status] || 0}}
                  onPress={() => {
                    setValue(items?.status);
                  }}
                />
              );
            })}
          </View>
        )}
        <View
          style={{
            ...styles.tasksSection,
            paddingTop: !keyboardDetails?.isVisible ? 20 : 0,
          }}>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '600',
              fontFamily: 'Montserrat-Regular',
            }}>
            Your Tasks
          </Text>
          <View style={styles.tasksBody}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.tasksList}>
                {findFilterValue(getFiltered())?.length > 0 ? (
                  findFilterValue(getFiltered())?.map(task => (
                    <TaskInfo task={task} key={shortid.generate()} />
                  ))
                ) : (
                  <Text
                    style={{
                      fontSize: 17,
                      textAlign: 'center',
                      marginTop: 50,
                      fontFamily: 'Montserrat-Regular',
                    }}>
                    No tasks available
                  </Text>
                )}
              </View>
            </ScrollView>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
