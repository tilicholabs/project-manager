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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import styles from './taskViewStyle';
import {combineData} from '../../utils/DataHelper';
import {AppContext} from '../../context';
import appTheme from '../../constants/colors';
import {AddIcon} from '../../components';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {statusColors, taskStatusOptions} from '../../constants/constants';
import firestore from '@react-native-firebase/firestore';
import {Modals} from '../../api/firebaseModal';
import {dataFormatter} from '../../utils/DataFormatter';
import DatePicker from 'react-native-date-picker';
import {CustomDatePicker} from '../../components/CustomDatePicker';

export function TaskView() {
  const {state, dispatch, selectedTask, setSelectedTask} =
    useContext(AppContext);

  const [subTasks, setSubTasks] = useState({});
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

  const dateHandler = date => {
    const due_date = JSON?.stringify(date);
    setSelectedTask(prv => ({...prv, due_date}));
    Modals?.tasks?.update(selectedTask?.id, {due_date});
  };

  useEffect(() => {
    firestore()
      .collection('sub_tasks')
      .onSnapshot(document => {
        const data = dataFormatter(document);
        setSubTasks(data);
      });
  }, []);

  const findDate = new Date(JSON?.parse(selectedTask?.due_date));

  const date = `${findDate?.getDate()}-${
    findDate?.getMonth() + 1
  }-${findDate?.getFullYear()}`;

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>loading</Text>
    </View>
  ) : (
    <View style={{flex: 1, backgroundColor: '#fafafa'}}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{paddingBottom: 50}}>
        <View style={styles.topWrapper}>
          <View style={styles.taskProgressWrapper}>
            <ProgressCircle
              percent={selectedTask?.progress}
              radius={30}
              borderWidth={7}
              color="#6AC67E"
              shadowColor="#f4f4f4"
              bgColor="#fff">
              <Text style={styles.taskProgress}>{selectedTask?.progress}%</Text>
            </ProgressCircle>
          </View>
          <Text style={styles.taskTitle}>{selectedTask?.title}</Text>
        </View>
        <Text style={styles.dueDateText}>Due Date - Today</Text>
        <Text style={styles.statusText}>Status - Completed</Text>
        <Text style={styles.taskTeamText}>Team</Text>
        <View style={styles.taskMembersWrapper}>
          {selectedTask?.members?.map(member => (
            <Image
              key={shortid.generate()}
              style={styles.taskMemberPhoto}
              source={{uri: member?.photo}}
            />
          ))}
          <AddIcon style={{marginLeft: -10}} onPress={handleAddTeamMember} />
        </View>
        <View style={styles.scheduleWrapper}>
          <View style={styles.scheduleRow}>
            <MaterialCommunityIcons
              name="clock"
              size={20}
              color={appTheme.INACTIVE_COLOR}
            />
            <Text style={styles.scheduleText}>1:30PM - 2:00PM</Text>
          </View>
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
        <Text style={styles.longText}>
          It is an established fact that a reader will be distracted by the
          readable content of a page when looking at its layout. {'\n'} {'\n'}
          The point of using Lorem Ipsum is that it has a more-or-less normal
          distribution of letters, as opposed to using 'Content here, content
          here', making it look like readable English. Many desktop publishing
          packages and web page editors now use Lorem Ipsum as their default
          model text, and a search for 'lorem ipsum' will uncover many web sites
          still in their infancy.
        </Text>
        <Text style={styles.subTaskText}>Sub-Tasks</Text>
        {subTasks?.length > 0 ? (
          subTasks.map((task, index) => {
            return (
              <View key={index} style={styles.subTasksStyle}>
                <View>
                  <Text>{task.title}</Text>
                </View>
                <Menu>
                  <MenuTrigger>
                    <View style={styles.checkBoxOuterView}>
                      <View
                        style={{
                          ...styles.checkBoxInnerView,
                          ...{
                            backgroundColor: statusColors[task.status],
                          },
                        }}></View>
                    </View>
                  </MenuTrigger>
                  <MenuOptions>
                    {taskStatusOptions?.map((status, index1) => (
                      <MenuOption
                        style={{
                          borderBottomWidth:
                            index1 !== taskStatusOptions.length - 1 ? 1 : 0,
                          borderBottomColor: 'gray',
                          flexDirection: 'row',
                          alignItems: 'center',
                        }}
                        key={index1}
                        onSelect={async () => {
                          setLoading(true);
                          await Modals.subTasks.update(task.id, status.title);
                          setLoading(false);
                        }}>
                        <View
                          style={{
                            ...styles.checkBox,
                            ...{backgroundColor: statusColors[status.title]},
                          }}></View>
                        <Text style={styles.menuOptionsText}>
                          {status.title}
                        </Text>
                      </MenuOption>
                    ))}
                  </MenuOptions>
                </Menu>
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
