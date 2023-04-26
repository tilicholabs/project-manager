import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import shortid from 'shortid';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './dashboardStyle';
import {AppContext} from '../../context';
import {TabScreenHeader, TaskInfo} from '../../components';
import appTheme from '../../constants/colors';
import {dashboardDetails} from '../../constants/all';
import ActionButton from 'react-native-action-button';
import Search from '../../components/Search';
import {Modals} from '../../api/firebaseModal';
import firestore from '@react-native-firebase/firestore';
import {dataFormatter} from '../../utils/DataFormatter';

export function Dashboard() {
  const {state, dispatch, setMembers, members} = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(0);
  const [value, setValue] = useState(null);
  const [searchValue, setSearch] = useState('');
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    const data = await Modals.tasks.get();
    setTasks(data);
    firestore()
      .collection('tasks')
      .onSnapshot(document => {
        const data = dataFormatter(document);
        setTasks(data);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleCreateTask = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'CreateTask'},
    });
  };

  const handleCreateProject = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'CreateProject'},
    });
  };

  const Card = ({
    bg = appTheme.PRIMARY_COLOR,
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
            backgroundColor: '#BB84E8',
          },
          selected && {
            borderWidth: 0,
            backgroundColor: appTheme?.PRIMARY_COLOR,
          },
        ]}
        {...{onPress, ...props}}>
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
    return <Text>POC logo</Text>;
  };

  return (
    <SafeAreaView style={styles.container}>
      <TabScreenHeader {...{leftComponent}} />
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
        <View style={styles.statisticsSection}>
          <View style={styles.statisticsContainer}>
            {dashboardDetails?.map((items, index) => {
              return (
                <Card
                  selected={index === selectedItem}
                  {...{...items}}
                  onPress={() => setSelectedItem(index)}
                />
              );
            })}
          </View>
        </View>
        <View style={styles.tasksSection}>
          <View style={styles.tasksBody}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.tasksList}>
                {tasks?.map(task => (
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
