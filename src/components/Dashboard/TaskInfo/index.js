import React, {useContext} from 'react';
import {View, Text, TouchableWithoutFeedback, Image} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {ProgressBar} from 'react-native-paper';
import shortid from 'shortid';
import styles from './taskInfoStyle';
import appTheme from '../../../constants/colors';
import {AppContext} from '../../../context';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/NavigationHelper';
import {StatusPopUp} from '../../StatusPopUp';
import {Modals} from '../../../api/firebaseModal';
import moment from 'moment';
import {findDueDate} from '../../../utils/functions';

export function TaskInfo({task}) {
  const {setSelectedTask} = useContext(AppContext);

  const handleNavigation = (screen, params) => {
    setSelectedTask(task);
    navigateToNestedRoute(getScreenParent(screen), screen, params);
  };

  const statusUpateHandler = async (id, status) => {
    await Modals.tasks.update(id, {status: status});
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleNavigation('TaskView')}>
      <View style={styles.container}>
        <View style={{position: 'absolute', left: 8, top: -8}}>
          <Text
            style={{
              fontSize: 12,
              letterSpacing: 1,
              color: '#1c1c1c',
              fontStyle: 'italic',
              fontWeight: '600',
              backgroundColor: 'white',
              paddingLeft: 4,
              paddingRight: 10,
            }}>
            {task?.project_name}
          </Text>
        </View>
        <StatusPopUp task={task} onSelect={statusUpateHandler} />
        <View style={styles.taskMiddleColumn}>
          <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">
            {task?.title}
          </Text>
        </View>
        <View style={styles.teamWrapper}>
          <Text>{findDueDate(JSON?.parse(task?.due_date))} </Text>
        </View>
        <MaterialIcons
          name="keyboard-arrow-right"
          size={25}
          color={appTheme.INACTIVE_COLOR}
        />
      </View>
    </TouchableWithoutFeedback>
  );
}
