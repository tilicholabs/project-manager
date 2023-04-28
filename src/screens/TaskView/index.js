import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  Button,
  TouchableHighlight,
  Pressable,
} from 'react-native';
import shortid from 'shortid';
import ProgressCircle from 'react-native-progress-circle';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './taskViewStyle';
import {AppContext} from '../../context';
import appTheme from '../../constants/colors';
import {AddIcon} from '../../components';
import firestore from '@react-native-firebase/firestore';
import {Modals} from '../../api/firebaseModal';
import {dataFormatter} from '../../utils/DataFormatter';
import {StatusPopUp} from '../../components/StatusPopUp';
import moment from 'moment/moment';
import {Loader} from '../../components/Loader';
import DatePicker from 'react-native-date-picker';
import {CustomDatePicker} from '../../components/CustomDatePicker';

export function TaskView() {
  const {
    state,
    dispatch,
    selectedTask,
    members,
    selectedMembers,
    setSelectedTask,
    setSelectedMembers,
  } = useContext(AppContext);
  const [subTasks, setSubTasks] = useState([]);
  const {bottomModal} = state;
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
  };
  const handleCreateTask = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'CreateSubTask'},
    });
  };

  const handleAddTeamMember = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'SelectMembers'},
    });
  };

  const handleComments = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'Comments'},
    });
  };

  const statusUpateHandler = async (id, status) => {
    setLoading(true);
    const completedTasks = subTasks?.filter(
      item => item?.status === 'Completed',
    );
    if (completedTasks !== subTasks?.length) {
      await Modals.tasks.update(selectedTask?.id, {status: 'In Progress'});
      setSelectedTask(prev => ({...prev, status: 'In Progress'}));
    }
    if (completedTasks === subTasks?.length) {
      await Modals.tasks.update(selectedTask?.id, {status: 'Completed'});
      setSelectedTask(prev => ({...prev, status: 'Completed'}));
    }
    await Modals.subTasks.update(id, {status: status});
    setLoading(false);
  };
  const dateHandler = date => {
    const due_date = JSON?.stringify(date);
    setSelectedTask(prv => ({...prv, due_date}));
    Modals?.tasks?.update(selectedTask?.id, {due_date});
  };

  useEffect(() => {
    firestore()
      .collection('sub_tasks')
      .where('parent_task_id', '==', selectedTask?.id)
      .onSnapshot(async document => {
        const data = await dataFormatter(document);
        setSubTasks(data);
      });
    return () => setSelectedMembers([]);
  }, []);

  const progressHandler = () => {
    if (selectedTask?.status === 'Completed') {
      return 100;
    } else if (subTasks?.length === 0) {
      return 0;
    } else {
      const completedTasks = subTasks?.filter(
        item => item?.status === 'Completed',
      );
      return (completedTasks?.length / subTasks?.length).toFixed(2) * 100;
    }
  };

  const teamHandler = async () => {
    setSelectedTask(prev => ({
      ...prev,
      team: [...prev.team, ...selectedMembers],
    }));
    await Modals.tasks.update(selectedTask?.id, {
      team: [...selectedTask?.team, ...selectedMembers],
    });
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: null},
    });
  };

  const allSubTasksHandler = async () => {
    if (subTasks?.length > 0) {
      if (selectedTask?.status === 'Completed') {
        setLoading(true);
        await Promise.all(
          subTasks?.map(async item => {
            await statusUpateHandler(item?.id, 'Completed');
          }),
        );
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    allSubTasksHandler();
  }, [subTasks]);

  useEffect(() => {
    progressHandler();
  }, [subTasks]);

  useEffect(() => {
    if (bottomModal === 'closeSelectMembers') {
      teamHandler();
    }
  }, [bottomModal]);
  const findDate = new Date(JSON?.parse(selectedTask?.due_date));

  const date = `${findDate?.getDate()}-${
    findDate?.getMonth() + 1
  }-${findDate?.getFullYear()}`;

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Loader />
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 50}}>
        <View style={styles.topWrapper}>
          <View style={styles.taskProgressWrapper}>
            <ProgressCircle
              percent={progressHandler() || 0}
              radius={30}
              borderWidth={7}
              color="#6AC67E"
              shadowColor="#f4f4f4"
              bgColor="#fff">
              <Text style={styles.taskProgress}>{progressHandler() || 0}%</Text>
            </ProgressCircle>
          </View>
          <Text style={styles.taskTitle}>{selectedTask?.title}</Text>
        </View>
        <Text style={styles.dueDateText}>Due Date - Today</Text>
        <Text style={styles.statusText}>{`Status - ${
          progressHandler() === 100 ? 'Completed' : 'In progress'
        }`}</Text>
        <Text style={styles.taskTeamText}>Team</Text>
        <View style={styles.taskMembersWrapper}>
          {members?.map(member => {
            return selectedTask?.team?.includes(member?.id) ? (
              member?.photo_url ? (
                <Image
                  key={shortid.generate()}
                  style={styles.taskMemberPhoto}
                  source={{uri: member?.photo}}
                />
              ) : (
                <View
                  style={{
                    ...styles.taskMemberPhoto,
                    ...{
                      backgroundColor: '#644CBC',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      shadowColor: 'black',
                      shadowOffset: {
                        height: 0,
                        width: 1,
                      },
                      elevation: 1,
                    },
                  }}
                  key={shortid.generate()}>
                  <Text
                    style={{fontSize: 15, fontWeight: 'bold', color: '#fff'}}>
                    {member?.user_name[0]}
                  </Text>
                </View>
              )
            ) : null;
          })}
          <AddIcon
            style={{marginLeft: -10, elevation: 2}}
            onPress={handleAddTeamMember}
          />
        </View>
        <View style={styles.scheduleWrapper}>
          <View style={styles.scheduleRow}>
            <AntDesign
              name="calendar"
              size={20}
              color={appTheme.INACTIVE_COLOR}
            />

            <TouchableOpacity onPress={() => setModalOpen(true)}>
              <Text style={styles.scheduleText}>{date}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.longText}>{selectedTask?.description}</Text>
        <Text style={styles.subTaskText}>Sub-Tasks</Text>
        {subTasks?.length > 0 ? (
          subTasks.map((task, index) => {
            return (
              <View key={index} style={styles.subTasksStyle}>
                <View>
                  <Text>{task.title}</Text>
                </View>
                <StatusPopUp task={task} onSelect={statusUpateHandler} />
              </View>
            );
          })
        ) : (
          <Text style={{textAlign: 'center', fontSize: 13}}>No Sub tasks</Text>
        )}
      </ScrollView>
      <AddIcon
        style={{
          position: 'absolute',
          bottom: 70,
          right: 35,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 1,
          elevation: 3,
          zIndex: 10,
        }}
        onPress={handleCreateTask}
        bg={appTheme.PRIMARY_COLOR}
      />
      <View style={styles.bottomWrapper}>
        <TouchableOpacity style={styles.bottomContent} onPress={handleComments}>
          <EvilIcons name="comment" size={25} color={appTheme.INACTIVE_COLOR} />
          <Text style={styles.bottomText}>3 comments</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomContent}>
          <Ionicons name="attach" size={25} color={appTheme.INACTIVE_COLOR} />
          <Text style={styles.bottomText}>2 attachments</Text>
        </TouchableOpacity>
      </View>
      <CustomDatePicker
        open={modalOpen}
        intialDate={findDate || new Date()}
        onClose={() => setModalOpen(false)}
        {...{newDateCallBack: dateHandler}}
      />
    </View>
  );
}
