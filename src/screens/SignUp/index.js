import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Octicons from 'react-native-vector-icons/Octicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './signUpStyle';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {getScreenParent} from '../../utils/NavigationHelper';
import appTheme from '../../constants/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {
  emailValidator,
  passwordValidator,
  phoneNumberValidator,
  userNameValidator,
} from '../../utils/FormValidator';
import auth from '@react-native-firebase/auth';
import {Modals} from '../../api/firebaseModal';
import firestore from '@react-native-firebase/firestore';

export function SignUp({navigation}) {
  const handleBackButton = () => {
    navigation?.goBack();
  };
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    phoneNumber: '',
    password: '',
  });
  const [error, setError] = useState({
    userName: false,
    email: false,
    phoneNumber: false,
    password: false,
  });

  const handleNavigation = (screen, params) => {
    navigateToNestedRoute(getScreenParent(screen), screen, params);
  };

  const userNameHandler = text => {
    if (userNameValidator(text)) {
      setFormData(prev => ({...prev, userName: text}));
      setError(prev => ({...prev, userName: false}));
    } else {
      setError(prev => ({...prev, userName: true}));
    }
  };

  const emailHandler = email => {
    if (emailValidator(email)) {
      setFormData(prev => ({...prev, email}));
      setError(prev => ({...prev, email: false}));
    } else {
      setError(prev => ({...prev, email: true}));
    }
  };

  const phoneNumberHandler = number => {
    if (phoneNumberValidator(number)) {
      setFormData(prev => ({...prev, phoneNumber: number}));
      setError(prev => ({...prev, phoneNumber: false}));
    } else {
      setError(prev => ({...prev, phoneNumber: true}));
    }
  };

  const passwordHandler = password => {
    if (passwordValidator(password)) {
      setFormData(prev => ({...prev, password}));
      setError(prev => ({...prev, password: false}));
    } else {
      setError(prev => ({...prev, password: true}));
    }
  };

  const signUpHandler = () => {
    if (
      (formData.userName !== '' &&
        formData.email !== '' &&
        formData.phoneNumber !== '',
      formData.password !== '')
    ) {
      auth()
        .createUserWithEmailAndPassword(formData.email, formData.password)
        .then(async userCredential => {
          userCredential.user.updateProfile({
            displayName: formData.userName,
          });
          const userData = {
            phoneNumber: formData.phoneNumber,
            email: formData.email,
          };
          await Modals.users.registerUser(userCredential?.user?.uid, userData);
          navigation.navigate('BottomStack');
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            Alert.alert('Email is already in use');
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            Alert.alert('That email address is invalid!');
            console.log('That email address is invalid!');
          }
        });
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handleBackButton()}>
          <MaterialIcons name="keyboard-arrow-left" size={25} color="gray" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContent}>
        <Text style={styles.largeText}>Sign Up</Text>
        <Text style={styles.smallText}>
          Log into your account &amp; manage {'\n'}your tasks
        </Text>
        <View
          style={{
            ...styles.inputRow,
            ...{
              borderBottomColor: error.userName ? 'red' : 'gray',
            },
          }}>
          <Ionicons name="person-outline" size={20} color="gray" />
          <TextInput
            placeholder="Username"
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={text => userNameHandler(text)}
          />
        </View>
        <View
          style={{
            ...styles.inputRow,
            ...{
              borderBottomColor: error.email ? 'red' : 'gray',
            },
          }}>
          <MaterialCommunityIcons name="email-outline" size={20} color="gray" />
          <TextInput
            placeholder="Email"
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={text => emailHandler(text)}
          />
        </View>
        <View
          style={{
            ...styles.inputRow,
            ...{
              borderBottomColor: error.phoneNumber ? 'red' : 'gray',
            },
          }}>
          <MaterialCommunityIcons name="phone-outline" size={20} color="gray" />
          <TextInput
            placeholder="Phone number"
            placeholderTextColor="gray"
            style={styles.textInput}
            keyboardType="decimal-pad"
            onChangeText={text => phoneNumberHandler(text)}
          />
        </View>
        <View
          style={{
            ...styles.inputRow,
            ...{
              borderBottomColor: error.password ? 'red' : 'gray',
            },
          }}>
          <MaterialIcons name="lock-outline" size={20} color="gray" />
          <TextInput
            placeholder="Password"
            placeholderTextColor="gray"
            secureTextEntry={!showPassword}
            style={styles.textInput}
            onChangeText={text => passwordHandler(text)}
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <MaterialCommunityIcons
                name="eye-outline"
                size={20}
                color="gray"
              />
            ) : (
              <MaterialCommunityIcons
                name="eye-off-outline"
                size={20}
                color="gray"
              />
            )}
          </TouchableOpacity>
        </View>
        {/* <View style={styles.savePwdRow}>
          <Text style={styles.savePwdText}>Save Password</Text>
          <Switch
            trackColor={{false: appTheme.INACTIVE_COLOR, true: appTheme.COLOR2}}
            thumbColor="#fff"
            value={true}
          />
        </View> */}
        <TouchableOpacity
          style={styles.signUpBtnWrapper}
          onPress={signUpHandler}>
          <Text style={styles.signUpBtnText}>SIGN UP</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtnWrapper}
          onPress={() => handleNavigation('Login')}>
          <Text style={styles.loginBtnText}>
            Already have an account? LOGIN
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
