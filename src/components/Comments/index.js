import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useRef, useState} from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import appTheme from '../../constants/colors';
import {Modals} from '../../api/firebaseModal';
import {getTime} from '../../utils/DataHelper';

export const Comments = () => {
  const comment = useRef('');
  const [loading, setLoading] = useState(false);

  const commentHandler = async () => {
    console.log(comment.current);
    setLoading(true);
    await Modals.comments.set({
      title: comment.current,
      task_id: '',
      commenter_id: '',
      created_at: getTime(),
    });
    setLoading(false);
  };

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text>loading</Text>
    </View>
  ) : (
    <View
      style={{
        position: 'relative',
        flex: 1,
        justifyContent: 'space-between',
      }}>
      <Text style={{textAlign: 'center', fontWeight: 'bold', fontSize: 20}}>
        Comments
      </Text>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TextInput
          placeholder="Enter comment"
          style={{
            borderWidth: 1,
            borderRadius: 17,
            height: 45,
            marginBottom: 20,
            paddingHorizontal: 10,
            borderColor: 'gray',
            width: '90%',
          }}
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
