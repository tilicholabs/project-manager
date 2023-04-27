import React, {useContext} from 'react';
import {useState} from 'react';
import {Linking, ScrollView, Text, TouchableOpacity} from 'react-native';
import styles from './AddMeberStyle';
import {InputTextField} from '../TextInput';
import colors from '../../constants/colors';
import {AppContext} from '../../context';
import {UploadImage} from '../UploadImage';
import {Modals} from '../../api/firebaseModal';

export const AddMember = () => {
  const {state, dispatch} = useContext(AppContext);
  const [memberDetails, setMemberDetails] = useState({
    name: '',
    email: '',
    designation: '',
    phoneNumber: '',
    location: '',
    department: '',
    role: '',
    // photo: '',
    // 'https://images.unsplash.com/photo-1607050132114-8241718a5b4e?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mzd8fHdvbWVuJTIwcHJvZmlsZSUyMHBob3RvfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  });

  const validation = () => {
    const length = Object.keys(memberDetails).length;
    const validatePhoneNumberRegex = /^\+?[91][0-9]{11}$/;
    let count = 0;
    Object.keys(memberDetails)?.map(item => {
      if (memberDetails[item].length > 0) {
        if (item === 'phoneNumber') {
          if (validatePhoneNumberRegex.test(memberDetails[item])) {
            count += 1;
          }
        } else {
          count += 1;
        }
      }
    });
    if (count === length) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <ScrollView>
      {/* <UploadImage /> */}
      <InputTextField
        title={'Name'}
        placeholder={'Name'}
        isRequired={true}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, name: e};
          })
        }
        keyboardType={'default'}
      />
      <InputTextField
        title={'Email'}
        placeholder={'Email'}
        isRequired={true}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, email: e};
          })
        }
        keyboardType={'email-address'}
      />
      <InputTextField
        title={'Designation'}
        placeholder={'Designation'}
        isRequired={true}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, designation: e};
          })
        }
        keyboardType={'default'}
      />
      <InputTextField
        title={'Phone Number'}
        placeholder="+916302634470"
        isRequired={true}
        maxLength={13}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, phoneNumber: e};
          })
        }
        keyboardType={'phone-pad'}
      />
      <InputTextField
        title={'location'}
        placeholder="location"
        isRequired={true}
        maxLength={13}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, location: e};
          })
        }
        keyboardType={'default'}
      />
      <InputTextField
        title={'Department'}
        placeholder="Department"
        isRequired={false}
        maxLength={13}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, department: e};
          })
        }
        keyboardType={'default'}
      />
      <InputTextField
        title={'Role'}
        placeholder="Role"
        isRequired={true}
        maxLength={13}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, role: e};
          })
        }
        keyboardType={'default'}
      />
      {/* TODO Send correct body and description to email */}
      <TouchableOpacity
        disabled={validation()}
        style={styles.addButtonStyle}
        onPress={async () => {
          console.log('click');
          // Linking.openURL(
          //   `mailto:${memberDetails?.email}?subject=SendMail&body=URL: https://example.com`,
          // );
          await Modals.users.registerUser(memberDetails);
          // dispatch({
          //   type: 'members',
          //   payload: {memberDetails: memberDetails},
          // });
          dispatch({
            type: 'toggleBottomModal',
            payload: {bottomModal: ''},
          });
        }}>
        <Text
          style={{
            backgroundColor: validation()
              ? colors.INACTIVE_COLOR
              : colors.PRIMARY_COLOR,
            ...styles.addTextStyle,
          }}>
          Add
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
