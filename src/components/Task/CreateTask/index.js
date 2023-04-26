import React, {useState, useContext} from 'react';
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

export function CreateTask({subTask = false}) {
  const {
    state,
    dispatch,
    setSubTasks,
    task,
    selectedMembers,
    setSelectedMembers,
  } = useContext(AppContext);
  const [data, setData] = useState({
    title: '',
  });

  const handleSetValue = text => {
    setData(prev => ({...prev, title: text}));
  };

  const taskCreateHandler = async () => {
    if (subTask) {
      await Modals.subTasks.set({
        title: data?.title || '',
        parent_task_id: task?.id || '',
        status: 'Not started',
        team: selectedMembers || [],
        created_at: getTime(),
      });
    } else {
    }
    setSelectedMembers([]);
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: ''},
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>
        {subTask ? 'Create Sub Task' : 'Create Task'}
      </Text>
      <TextInput
        placeholder="Task"
        placeholderTextColor="gray"
        style={styles.textInput}
        onChangeText={text => handleSetValue(text)}
      />
      {!subTask && (
        <View style={styles.teamTextWrapper}>
          <Text style={styles.teamText}>Projects</Text>
          <ProjectsListing />
        </View>
      )}
      <View style={styles.teamTextWrapper}>
        <Text style={styles.teamText}>Select Members</Text>
      </View>
      <View style={styles.teamSection}>
        <SelectedMembers />
      </View>
      <TouchableOpacity style={styles.btnWrapper} onPress={taskCreateHandler}>
        <Text style={styles.btnText}>Create</Text>
      </TouchableOpacity>
    </View>
  );
}
