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

export function TaskInfo({task}) {
  const {state, dispatch, setTask} = useContext(AppContext);

  const handleNavigation = (screen, params) => {
    setTask(task);
    navigateToNestedRoute(getScreenParent(screen), screen, params);
  };

  return (
    <TouchableWithoutFeedback onPress={() => handleNavigation('TaskView')}>
      <View style={styles.container}>
        <View style={{position: 'absolute', left: 8, top: -8}}>
          <Text style={{fontSize: 12, letterSpacing: 1, color: '#1c1c1c'}}>
            {task?.projectName}
          </Text>
        </View>
        <AntDesign
          name="checksquareo"
          size={20}
          color={
            task?.progress === 100 ? appTheme.COLOR2 : appTheme.INACTIVE_COLOR
          }
          style={styles.taskProgressIndicator}
        />
        <View style={styles.taskMiddleColumn}>
          <Text style={styles.taskTitle} numberOfLines={1} ellipsizeMode="tail">
            {task?.title}
          </Text>
          <ProgressBar
            progress={Number(task?.progress)}
            color={task?.progress === 100 ? appTheme.COLOR2 : appTheme.COLOR1}
            style={styles.taskProgressBar}
          />
        </View>
        <View style={styles.teamWrapper}>
          <Text>due 20 days </Text>
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
