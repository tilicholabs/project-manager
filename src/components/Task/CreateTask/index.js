import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Pressable,
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
import {CustomDatePicker} from '../../CustomDatePicker';

export function CreateTask({subTask = false}) {
  const {
    dispatch,
    task,
    selectedMembers,
    setSelectedMembers,
    selectedProject,
    setSelectedProject,
  } = useContext(AppContext);
  const [data, setData] = useState({
    title: '',
    description: '',
    due_date: new Date(),
  });
  const [modalOpen, setModalOpen] = useState(false);

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
      await Modals.tasks.set({
        title: data?.title || '',
        description: data?.description || '',
        project_id: selectedProject?.id,
        team: selectedMembers || [],
        status: 'Not started',
        due_date: JSON?.stringify(data?.due_date),
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
  const dateHandler = date => {
    setData(prv => ({...prv, due_date: date}));
  };

  const buttonEnableCondition = subTask
    ? data?.title !== '' && selectedMembers?.length > 0
    : data?.title !== '' &&
      selectedMembers?.length > 0 &&
      data?.description !== '' &&
      selectedProject;

  useEffect(() => {
    return () => {
      setSelectedMembers([]);
      setSelectedProject();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.boldText}>
        {subTask ? 'Create Sub Task' : 'Create Task'}
      </Text>
      <ScrollView
        style={{flex: 1, width: '100%'}}
        contentContainerStyle={{alignItems: 'center'}}>
        <TextInput
          placeholder="Task"
          placeholderTextColor="gray"
          style={styles.textInput}
          onChangeText={text => setData(prev => ({...prev, title: text}))}
        />
        {!subTask && (
          <>
            <TextInput
              placeholder="Description"
              placeholderTextColor="gray"
              style={styles.textInput}
              onChangeText={text =>
                setData(prev => ({...prev, description: text}))
              }
            />
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontWeight: 'bold', fontSize: 14}}>
                Select due Date:{' '}
              </Text>
              <TouchableOpacity onPress={() => setModalOpen(true)}>
                <Text
                  style={{
                    color: appTheme.INACTIVE_COLOR,
                    marginLeft: 5,
                  }}>{`${data?.due_date?.getDate()}-${
                  data?.due_date?.getMonth() + 1
                }-${data?.due_date?.getFullYear()}`}</Text>
              </TouchableOpacity>
            </View>
          </>
        )}

        {!subTask && !selectedProject && (
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
      </ScrollView>
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
      <CustomDatePicker
        open={modalOpen}
        intialDate={data?.due_date || new Date()}
        onClose={() => setModalOpen(false)}
        childrenStyle={{marginTop: 100}}
        {...{newDateCallBack: dateHandler}}
      />
    </View>
  );
}
