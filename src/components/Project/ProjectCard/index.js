import React, {useContext, useRef} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressCircle from 'react-native-progress-circle';
import shortid from 'shortid';
import styles from './projectCardStyle';
import appTheme from '../../../constants/colors';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/NavigationHelper';
import {AppContext} from '../../../context';
import {Modals} from '../../../api/firebaseModal';

export function ProjectCard({project, navigation}) {
  const {state, dispatch, setSelectedProject} = useContext(AppContext);

  const handleNavigation = (screen, params) => {
    setSelectedProject(project);
    navigateToNestedRoute(getScreenParent(screen), screen, params);
  };

  const {members} = state;

  const p = useRef('');

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

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => handleNavigation('Project', project)}>
      <Text style={styles.projectTitle}>{project?.title}</Text>
      <View style={styles.projectTeamAndProgress}>
        <View>
          <Text style={styles.projectDescription}>{project?.description}</Text>
          <Text style={styles.projectTeamTitle}>Team</Text>
          <View style={styles.projectTeamWrapper}>
            {filterMembers(project?.team_id)?.map(member => {
              // let percent1 = 0;
              // percent1 = percent();

              return (
                <Image
                  key={shortid.generate()}
                  style={styles.projectMemberPhoto}
                  source={{
                    uri: 'https://images.unsplash.com/photo-1609010697446-11f2155278f0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
                  }}
                />
              );
            })}
            <TouchableOpacity style={styles.plusBtnContainer}>
              <MaterialCommunityIcons name="plus" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <ProgressCircle
          percent={project?.percent}
          radius={40}
          borderWidth={8}
          color="#6AC67E"
          shadowColor="#f4f4f4"
          bgColor="#fff">
          <Text style={styles.projectProgress}>{project?.percent}%</Text>
        </ProgressCircle>
      </View>
      <View style={styles.rowJustifyBetween}>
        <View style={styles.flexRow}>
          <MaterialCommunityIcons
            name="calendar-month-outline"
            size={20}
            color={appTheme.INACTIVE_COLOR}
          />
          <Text style={styles.projectBottomText}>{project?.createdAt}</Text>
        </View>
        <View style={styles.flexRow}>
          <MaterialCommunityIcons
            name="checkbox-marked"
            size={20}
            color={appTheme.INACTIVE_COLOR}
          />
          <Text style={styles.projectBottomText}>{project?.tasks} Tasks</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}
