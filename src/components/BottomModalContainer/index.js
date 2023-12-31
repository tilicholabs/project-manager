import React, {useContext} from 'react';
import {
  View,
  SafeAreaView,
  TouchableOpacity,
  Modal,
  Text,
  Pressable,
} from 'react-native';
import {CreateTask, TaskView} from '../Task';
import styles from './bottomModalContainerStyle';
import {AppContext} from '../../context';
import {SelectedMembers} from '../SelectMembers';
import {Comments} from '../Comments';
import EditProfile from '../EditProfile';
import {fonts} from '../../constants/fonts';

export function BottomModalContainer() {
  const {state, dispatch} = useContext(AppContext);
  const {bottomModal} = state;

  const handleBottomModel = bottomModal => {
    dispatch({
      type: 'toggleBottomModel',
      payload: {bottomModal},
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => handleBottomModel(null)}
      style={{backgroundColor: 'red'}}>
      <SafeAreaView style={styles.ModelContainer}>
        <Pressable
          onPress={() => handleBottomModel(null)}
          style={{flex: 1, display: 'flex', justifyContent: 'flex-end'}}>
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => handleBottomModel(null)}></TouchableOpacity>
          <View style={styles.setModelDimensions('70%', '100%')}>
            <Pressable
              style={{
                flex: 1,
                paddingTop: 16,
                paddingHorizontal: 20,
                paddingBottom: 10,
              }}>
              {bottomModal === 'CreateTask' ? (
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
                      fontFamily: fonts.regular,
                    }}>
                    Select Members
                  </Text>
                  <SelectedMembers showDone={true} />
                </>
              ) : bottomModal === 'Comments' ? (
                <Comments />
              ) : bottomModal === 'EditProfile' ? (
                <EditProfile />
              ) : null}
            </Pressable>
          </View>
        </Pressable>
      </SafeAreaView>
    </Modal>
  );
}
