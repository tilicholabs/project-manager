import {Button, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useContext, useState} from 'react';
import CustomTextInput from './Global/CustomTextInput';
import appTheme from '../constants/colors';
import {AppContext} from '../context';
import {Modals} from '../api/firebaseModal';

export default function EditProfile() {
  const {dispatch, user, setUser} = useContext(AppContext);

  const [name, setName] = useState(user?.user_name || '');
  const [designation, setDesignation] = useState(user?.designation || '');

  const validation = () => {
    if (!name || !designation) return true;
    return false;
  };

  const handleEdit = async () => {
    if (user?.user_name != name) {
      Modals.users.update(user?.id, {user_name: name});
    }
    if (user?.designation != designation) {
      Modals.users.update(user?.id, {designation});
    }
    setUser(prv => ({...prv, user_name: name, designation}));
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: null},
    });
  };
  return (
    <View style={{flex: 1}}>
      <Text style={styles.boldText}>Edit Profile</Text>
      <View style={styles.inputContainer}>
        <CustomTextInput
          style={styles.textInput}
          value={name}
          placeholder={'Enter Your Name'}
          onChangeText={newText => setName(newText)}
        />

        <CustomTextInput
          style={styles.textInput}
          placeholder={'Enter Your Designation'}
          value={designation}
          onChangeText={newText1 => setDesignation(newText1)}
        />
      </View>
      <TouchableOpacity
        style={{
          ...styles.btnWrapper,
          ...{
            backgroundColor: validation()
              ? appTheme.INACTIVE_COLOR
              : appTheme.PRIMARY_COLOR,
          },
        }}
        disabled={validation()}
        onPress={handleEdit}>
        <Text style={styles.btnText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    borderColor: appTheme.INACTIVE_COLOR,
    borderWidth: 1,
    marginBottom: 20,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 8,
  },
  boldText: {
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 40,
    marginTop: 10,
  },
  btnWrapper: {
    marginTop: 'auto',
    height: 45,
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    borderRadius: 5,
    position: 'absolute',
    bottom: 0,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
  },
});
