import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import shortid from 'shortid';
import styles from './createTaskStyle';
import {combineData, getTime} from '../../../utils/DataHelper';
import {AppContext} from '../../../context';
import {SelectedMembers} from '../../SelectMembers';
import {Modals} from '../../../api/firebaseModal';
import {ProjectsListing} from '../../ProjectsListing';
import appTheme from '../../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';

export function CreateTask({subTask = false}) {
  const {
    dispatch,
    selectedTask,
    selectedMembers,
    setSelectedMembers,
    selectedProject,
    setSelectedProject,
    isProjectSelected,
  } = useContext(AppContext);
  const [data, setData] = useState({
    title: '',
    description: '',
  });

  const taskCreateHandler = async () => {
    if (subTask) {
      await Modals.subTasks.set({
        title: data?.title || '',
        parent_task_id: selectedTask?.id || '',
        status: 'Not started',
        team: selectedMembers || [],
        created_at: getTime(),
      });
    } else {
      await Modals.tasks.set({
        title: data?.title || '',
        description: data?.description || '',
        project_id: selectedProject?.id,
        team: selectedMembers || [],
        status: 'Not started',
        due_date: 0,
        created_at: getTime(),
      });
    }
    setSelectedMembers([]);
    setSelectedProject();
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: ''},
    });
  };

  const buttonEnableCondition = subTask
    ? data?.title !== '' && selectedMembers?.length > 0
    : data?.title !== '' &&
      selectedMembers?.length > 0 &&
      data?.description !== '' &&
      selectedProject;

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>
        {subTask ? 'Create Sub Task' : 'Create Task'}
      </Text>
      <TextInput
        placeholder="Task"
        placeholderTextColor="gray"
        style={styles.textInput}
        onChangeText={text => setData(prev => ({...prev, title: text}))}
      />
      {!subTask && (
        <TextInput
          placeholder="Description"
          placeholderTextColor="gray"
          style={styles.textInput}
          onChangeText={text => setData(prev => ({...prev, description: text}))}
        />
      )}
      {!subTask && !isProjectSelected && (
        <View style={styles.teamTextWrapper}>
          <Text style={styles.teamText}>Select Project</Text>
          <ProjectsListing />
        </View>
      )}
      <View style={styles.teamTextWrapper}>
        <Text style={styles.teamText}>Select Members</Text>
      </View>
      <View style={styles.teamSection}>
        <SelectedMembers />
      </View>
      <TouchableOpacity
        style={{
          ...styles.btnWrapper,
          ...{
            backgroundColor: buttonEnableCondition
              ? appTheme.PRIMARY_COLOR
              : appTheme.INACTIVE_COLOR,
          },
        }}
        disabled={!buttonEnableCondition}
        onPress={taskCreateHandler}>
        <Text style={styles.btnText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}
