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
import {combineData} from '../../../utils/DataHelper';
import {AppContext} from '../../../context';
import {SelectedMembers} from '../../SelectMembers';

export function CreateTask({subTask = false}) {
  const {state, dispatch, setSubTasks} = useContext(AppContext);
  const [data, setData] = useState({
    newTask: {title: '', description: '', selectedMembers: []},
  });

  const handleSetValue = text => {
    setData(prev => ({...prev, newTask: {...prev.newTask, title: text}}));
  };

  const taskCreateHandler = () => {
    if (subTask) {
      setSubTasks(prev => [
        ...prev,
        {title: data?.newTask?.title, status: 'Not started'},
      ]);
    }
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
