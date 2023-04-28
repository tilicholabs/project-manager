import React, {useContext, useEffect, useRef, useState} from 'react';
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
import {dataFormatter} from '../../../utils/DataFormatter';

export function ProjectCard({project, navigation}) {
  const {
    state,
    dispatch,
    setSelectedProject,
    setIsProjectSelected,
    members,
    selectedMembers,
    setSelectedMembers,
  } = useContext(AppContext);
  const {bottomModal} = state;

  const [percentage, setPercentage] = useState(0);

  const handleNavigation = (screen, params) => {
    setIsProjectSelected(true);
    setSelectedProject(project);
    navigateToNestedRoute(getScreenParent(screen), screen, params);
  };

  const filterMembers = arr => {
    const result = members.filter(item => {
      let bool = false;
      return arr?.find(ele => {
        return item?.id === ele;
      });
    });
    return result;
  };

  const addTeamHandler = async () => {
    await Modals.projects.update(project?.id, {
      selectedMembers: [...project?.selectedMembers, ...selectedMembers],
    });
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: null},
    });
    setSelectedMembers([]);
  };

  useEffect(() => {
    if (bottomModal === 'closeSelectMembers') {
      addTeamHandler();
    }
  }, [bottomModal]);

  // const percent = Math?.round(
  //   (completedTasks?.length / totalTasks?.current?.length) * 100,
  // );

  const getPercentage = async () => {
    const data = await Modals.tasks.getProjectTasks(project?.id);
    const formattedData = await dataFormatter(data);
    const completedTasks = (
      Array?.isArray(formattedData) ? formattedData : []
    )?.filter(item => item?.status == 'Completed');
    const percent = Math?.round(
      (completedTasks?.length / formattedData?.length) * 100,
    );
    setPercentage(percent || 0);
  };

  useEffect(() => {
    getPercentage();
  }, []);

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        setSelectedProject(project);
        handleNavigation('Project');
      }}>
      <Text style={styles.projectTitle}>{project?.title}</Text>
      <View style={styles.projectTeamAndProgress}>
        <View>
          <Text style={styles.projectDescription}>{project?.description}</Text>
          <Text style={styles.projectTeamTitle}>Team</Text>
          <View style={styles.projectTeamWrapper}>
            {filterMembers(project?.selectedMembers)?.map(member => {
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
            <TouchableOpacity
              style={styles.plusBtnContainer}
              onPress={() => {
                setSelectedProject(project);
                dispatch({
                  type: 'toggleBottomModal',
                  payload: {bottomModal: 'SelectMembers'},
                });
              }}>
              <MaterialCommunityIcons name="plus" size={22} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>
        <ProgressCircle
          percent={percentage}
          radius={40}
          borderWidth={8}
          color="#6AC67E"
          shadowColor="#f4f4f4"
          bgColor="#fff">
          <Text style={styles.projectProgress}>{percentage}%</Text>
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
