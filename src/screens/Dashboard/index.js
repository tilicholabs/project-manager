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
import DropDownPicker from 'react-native-dropdown-picker';
import styles from './dashboardStyle';
import {AppContext} from '../../context';
import {TabScreenHeader, TaskInfo, EmptyListComponent} from '../../components';
import {formatCurrentDate} from '../../utils/DataHelper';
import appTheme from '../../constants/colors';

export function Dashboard() {
  const {state, dispatch} = useContext(AppContext);
  let {tasks} = state;
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'All Tasks', value: 'All Tasks'},
    {label: 'Ongoing', value: 'Ongoing'},
    {label: 'Completed', value: 'Completed'},
  ]);

  const getTasks = () => {
    let tasksToRender = [];
    if (!value || value === 'All Tasks') {
      tasksToRender = tasks;
    } else if (value === 'Ongoing') {
      tasksToRender = tasks.filter(task => task.progress < 100) || [];
    } else if (value === 'Completed') {
      tasksToRender = tasks.filter(task => task.progress === 100) || [];
    }

    return tasksToRender;
  };

  const handleCreateTask = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'CreateTask'},
    });
  };

  const Card = ({
    bg = appTheme.PRIMARY_COLOR,
    icon = '',
    size = 19,
    color = '#fff',
    status = '',
    count = '',
  }) => {
    return (
      <View style={[styles.statisticsContent, {backgroundColor: bg}]}>
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
      </View>
    );
  };

  return (
    <SafeAreaView>
      <TabScreenHeader
        leftComponent={() => (
          <View style={styles.flexRow}>
            <Text style={styles.headerLeftText}>{formatCurrentDate()}</Text>
            <MaterialCommunityIcons
              name="calendar-month-outline"
              size={20}
              color="#000"
            />
          </View>
        )}
        isSearchBtnVisible={true}
        isMoreBtnVisible={true}
      />
      <ScrollView style={styles.contentBody}>
        <View style={styles.statisticsSection}>
          <Text style={styles.contentTitle}>Today</Text>
          <View style={styles.statisticsContainer}>
            <Card icon="refresh" status="All Tasks" count="35" />
            <Card
              icon="clock-outline"
              status="In progress"
              count="20"
              bg={appTheme.COLOR1}
            />
            <Card
              icon="file-check-outline"
              bg={appTheme.COLOR2}
              count="10"
              status="Completed"
            />
            <Card
              icon="heart-outline"
              bg="pink"
              count="10"
              status="Favourites"
            />
          </View>
        </View>
        <View style={styles.tasksSection}>
          <View style={styles.tasksHeader}>
            <TouchableOpacity
              style={styles.tasksRow}
              onPress={() => handleCreateTask()}>
              <Text style={styles.tasksLeftText}>Add Task</Text>
              <View style={styles.plusBtnContainer}>
                <MaterialCommunityIcons name="plus" size={19} color="#fff" />
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
          <View style={styles.tasksBody}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.tasksList}>
                {getTasks()?.map(task => (
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
