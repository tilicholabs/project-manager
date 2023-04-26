import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appTheme from '../../constants/colors';
import {Modals} from '../../api/firebaseModal';
import {getTime} from '../../utils/DataHelper';
import {AppContext} from '../../context';
import firestore from '@react-native-firebase/firestore';
import {dataFormatter} from '../../utils/DataFormatter';
import styles from './commentsStyle';
import moment from 'moment';

export const Comments = () => {
  const comment = useRef('');
  const [loading, setLoading] = useState(false);
  const {selectedTask} = useContext(AppContext);
  const [taskComments, setTaskComments] = useState([]);

  const commentHandler = async () => {
    setLoading(true);
    await Modals.comments.set({
      title: comment.current,
      task_id: selectedTask?.id,
      commenter_id: '',
      created_at: getTime(),
    });
    setLoading(false);
  };

  useEffect(() => {
    firestore()
      .collection('comments')
      .where('task_id', '==', selectedTask?.id)
      .onSnapshot(snap => {
        const data = dataFormatter(snap);
        setTaskComments(data);
      });
  }, []);

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>loading</Text>
    </View>
  ) : (
    <View style={styles.commentsContainer}>
      <Text style={styles.commentsText}>Comments</Text>
      <ScrollView>
        {taskComments?.map(item => (
          <View style={styles.displayComments}>
            <View style={styles.commentHeader}>
              <Text style={styles.personNameText}>You</Text>
              <Text style={styles.timeText}>
                {moment(item?.created_at).fromNow()}
              </Text>
            </View>
            <Text style={styles.comment}>{item?.title}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.enterCommentView}>
        <TextInput
          placeholder="Enter comment"
          style={styles.textInputStyle}
          onChangeText={text => (comment.current = text)}
        />
        <TouchableOpacity
          onPress={() => comment.current.length > 0 && commentHandler()}>
          <MaterialCommunityIcons
            name="send"
            size={30}
            color={appTheme.PRIMARY_COLOR}
            style={{paddingBottom: 20, marginLeft: 5}}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
