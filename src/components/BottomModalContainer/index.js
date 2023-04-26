import React, {useContext} from 'react';
import {View, SafeAreaView, TouchableOpacity, Modal, Text} from 'react-native';
import {CreateProject} from '../Project';
import {CreateTask, TaskView} from '../Task';
import styles from './bottomModalContainerStyle';
import {AppContext} from '../../context';
import {SelectedMembers} from '../SelectMembers';
import {Comments} from '../Comments';
import {AddMember} from '../AddMember';

export function BottomModalContainer() {
  const {state, dispatch} = useContext(AppContext);
  const {bottomModal} = state;

  const handleBottomModal = bottomModal => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal},
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => handleBottomModal(null)}
      style={{backgroundColor: 'red'}}>
      <SafeAreaView style={styles.modalContainer}>
        <TouchableOpacity
          style={styles.closeButton}
          onPress={() => handleBottomModal(null)}></TouchableOpacity>
        <View style={styles.setModalDimensions('70%', '100%')}>
          {bottomModal === 'CreateProject' ? (
            <CreateProject />
          ) : bottomModal === 'CreateTask' ? (
            <CreateTask />
          ) : bottomModal === 'TaskView' ? (
            <TaskView />
          ) : bottomModal === 'CreateSubTask' ? (
            <CreateTask subTask={true} />
          ) : bottomModal === 'SelectMembers' ? (
            <>
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 20,
                  fontWeight: 'bold',
                  paddingBottom: 30,
                }}>
                Select Members
              </Text>
              <SelectedMembers doneButton={true} />
            </>
          ) : bottomModal === 'Comments' ? (
            <Comments />
          ) : bottomModal === 'AddMember' ? (
            <AddMember />
          ) : null}
        </View>
      </SafeAreaView>
    </Modal>
  );
}
