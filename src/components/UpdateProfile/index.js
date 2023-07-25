import React, {useContext, useEffect, useRef} from 'react';
import {useState} from 'react';
import {Linking, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import styles from './updateProfileStyle';
import colors from '../../constants/colors';
import {AppContext} from '../../context';
import {UploadImage} from '../UploadImage';
import {Models} from '../../api/firebaseModel';
import {InputTextField} from '../TextInput';
import {Loader} from '../Loader';
import appTheme from '../../constants/colors';

export const UpdateProfile = () => {
  const {state, dispatch, members, user} = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [memberDetails, setMemberDetails] = useState({});
  const current_user = useRef({});
  const [FormValidator, setFormValidator] = useState(false);

  useEffect(() => {
    const profile_user = members?.find(item => item?.id === user?.id);
    current_user.current = profile_user;
    setMemberDetails(prev => ({
      ...prev,
      user_name: profile_user?.user_name || '',
      designation: profile_user?.designation || '',
      phone_number: profile_user?.phone_number || '',
      location: profile_user?.location || '',
      department: profile_user?.department || '',
      role: profile_user?.role || '',
    }));
    setLoading(false);
  }, []);

  useEffect(() => {
    const validatePhoneNumberRegex = /^\+?[91][0-9]{11}$/;
    if (
      memberDetails?.user_name?.length > 3 &&
      validatePhoneNumberRegex.test(memberDetails?.phone_number) &&
      memberDetails?.designation?.length > 3 &&
      memberDetails?.role?.length > 3 &&
      memberDetails?.location?.length > 3
    ) {
      setFormValidator(true);
    } else {
      setFormValidator(false);
    }
  }, [memberDetails]);

  const validation = () => {
    const length = Object.keys(memberDetails).length;
    const validatePhoneNumberRegex = /^\+?[91][0-9]{11}$/;
    let count = 0;
    Object.keys(memberDetails)?.map(item => {
      if (memberDetails[item].length > 0) {
        if (item === 'phone_number') {
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

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Loader />
    </View>
  ) : (
    <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
      <InputTextField
        title={'Name'}
        placeholder={'Name'}
        // isRequired={true}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, user_name: e};
          })
        }
        keyboardType={'default'}
        value={memberDetails?.user_name}
      />
      <InputTextField
        title={'Designation'}
        placeholder={'Designation'}
        // isRequired={true}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, designation: e};
          })
        }
        keyboardType={'default'}
        value={memberDetails?.designation}
      />
      <InputTextField
        title={'Phone Number'}
        placeholder="Eg:+916302634470"
        // isRequired={true}
        maxLength={13}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, phone_number: e};
          })
        }
        keyboardType={'phone-pad'}
        value={memberDetails?.phone_number}
      />
      <InputTextField
        title={'location'}
        placeholder="location"
        // isRequired={true}
        maxLength={13}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, location: e};
          })
        }
        keyboardType={'default'}
        value={memberDetails?.location}
      />
      <InputTextField
        title={'Department'}
        placeholder="Department"
        // isRequired={false}
        maxLength={13}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, department: e};
          })
        }
        keyboardType={'default'}
        value={memberDetails?.department}
      />
      <InputTextField
        title={'Role'}
        placeholder="Role"
        // isRequired={true}
        maxLength={13}
        onChangeText={e =>
          setMemberDetails(prev => {
            return {...prev, role: e};
          })
        }
        keyboardType={'default'}
        value={memberDetails?.role}
      />
      {/* TODO Send correct body and description to email */}
      <TouchableOpacity
        disabled={!FormValidator}
        style={{
          ...styles.addButtonStyle,
          ...{
            backgroundColor: FormValidator
              ? appTheme.PRIMARY_COLOR
              : appTheme.INACTIVE_COLOR,
          },
        }}
        onPress={async () => {
          // Linking.openURL(
          //   `mailto:${memberDetails?.email}?subject=SendMail&body=URL: https://example.com`,
          // );
          await Models.users.update(user?.id, memberDetails);
          // dispatch({
          //   type: 'members',
          //   payload: {memberDetails: memberDetails},
          // });
          dispatch({
            type: 'toggleBottomModel',
            payload: {bottomModel: ''},
          });
        }}>
        <Text style={styles.addTextStyle}>Update</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
