import React, {useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Switch,
  Alert,
  Image,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './loginStyle';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {getScreenParent} from '../../utils/NavigationHelper';
import appTheme from '../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {emailValidator, passwordValidator} from '../../utils/FormValidator';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export function Login({navigation}) {
  const [showPassword, setShowPassword] = useState(false);
  const handleBackButton = () => {
    navigation?.goBack();
  };
  GoogleSignin.configure({
    webClientId:
      '172708422792-c7jn6oortg2qt2lv8le9uvp3plbs86rg.apps.googleusercontent.com',
  });
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState({
    email: false,
    password: false,
  });

  const emailHandler = email => {
    if (emailValidator(email)) {
      setFormData(prev => ({...prev, email}));
      setError(prev => ({...prev, email: false}));
    } else {
      setError(prev => ({...prev, email: true}));
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

  const onGoogleButtonPress = async () => {
    // Get the user's ID token
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  const loginHanlder = () => {
    if (formData.email !== '' && formData.password !== '') {
      auth()
        .signInWithEmailAndPassword(formData.email, formData.password)
        .then(user => {
          console.log(user);
          console.log('signed in succesfully');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            Alert.alert(
              'Warning',
              'You do not have a account.please regiseter with your details.',
            );
            console.log('User not found');
          } else if (error.code === 'auth/wrong-password') {
            Alert.alert('Warning', 'Invalid UserName or Password');
          }
          console.log(error);
        });
    }
  };

  const handleNavigation = (screen, params) => {
    navigateToNestedRoute(getScreenParent(screen), screen, params);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => handleBackButton()}>
          <MaterialIcons name="keyboard-arrow-left" size={25} color="gray" />
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bodyContent}>
        <Text style={styles.largeText}>Welcome Back!</Text>
        <Text style={styles.smallText}>
          Log into your account &amp; manage {'\n'}your tasks
        </Text>
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
        <TouchableOpacity style={styles.loginBtnWrapper} onPress={loginHanlder}>
          <Text style={styles.loginBtnText}>LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.signUpBtnWrapper}
          onPress={() => handleNavigation('SignUp')}>
          <Text style={styles.signUpBtnText}>
            Don't have an account? SIGN UP
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={async () => {
            onGoogleButtonPress()
              .then(user => console.log(user))
              .catch(e => console.log(e));
          }}
          style={{width: '100%'}}>
          <Image
            source={require('../../assets/google_signin_button.png')}
            style={{
              width: '100%',
              height: 45,
              marginBottom: 15,
              resizeMode: 'contain',
            }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
// 172708422792 - d7bjsip859krl6vqpb5g67mn9436bb3o.apps.googleusercontent.com;
