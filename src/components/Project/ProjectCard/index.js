import React, {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProgressCircle from 'react-native-progress-circle';
import shortid from 'shortid';
import styles from './projectCardStyle';
import appTheme from '../../../constants/colors';
import {navigateToNestedRoute} from '../../../navigators/RootNavigation';
import {getScreenParent} from '../../../utils/NavigationHelper';
import {AppContext} from '../../../context';
import {Models} from '../../../api/firebaseModel';
import {dataFormatter} from '../../../utils/DataFormatter';
import {taskModel, tasks} from '../../../api/taskModel';
import {MemberView, MembersView} from '../../MembersView';
import {teamMembersCount} from '../../../constants/constants';

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

  const filterMembers = useCallback(arr => {
    const result = members.filter(item => {
      return arr?.find(ele => {
        return item?.id === ele;
      });
    });
    return result;
  }, []);

  const addTeamHandler = async () => {
    await Models.projects.update(project?.id, {
      selectedMembers: [...project?.selectedMembers, ...selectedMembers],
    });
    dispatch({
      type: 'toggleBottomModel',
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
    // const data = await Models.tasks.getProjectTasks(project?.id);

    const data = await taskModel.getProjectTasks(project?.id);
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
            <MembersView
              members={filterMembers(project?.selectedMembers) || []}
            />
            <TouchableOpacity
              style={styles.plusBtnContainer}
              onPress={() => {
                setSelectedProject(project);
                dispatch({
                  type: 'toggleBottomModel',
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
    </TouchableOpacity>
  );
}
