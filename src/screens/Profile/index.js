import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Model,
  PermissionsAndroid,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import styles from './profileStyle';
import appTheme from '../../constants/colors';
import {AppContext} from '../../context';
import {TabScreenHeader} from '../../components';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {getScreenParent} from '../../utils/NavigationHelper';
import {TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import {utils} from '@react-native-firebase/app';
import storage from '@react-native-firebase/storage';
import {Loader} from '../../components/Loader';
import {Models} from '../../api/firebaseModel';
import {fonts} from '../../constants/fonts';

export function Profile({navigation}) {
  const {state, dispatch, user} = useContext(AppContext);
  const [image, setImage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setImage(user?.profile_image);
  }, []);

  const handleLogout = () => {
    auth()
      .signOut()
      .then(() => {
        handleNavigation('Onboarding');
        console.log('User signed out!');
      });
  };

  const handleNavigation = (screen, params) => {
    navigateToNestedRoute(getScreenParent(screen), screen, params);
  };
  let options = {
    saveToPhotos: true,
    mediaType: 'photo',
  };

  const uploadImage = async () => {
    const reference = storage().ref(user.id);
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );
      if (granted == PermissionsAndroid.RESULTS.GRANTED) {
        let options = {
          title: 'Select Image',
          customButtons: [
            {
              name: 'customOptionKey',
              title: 'Choose Photo from Custom Option',
            },
          ],
          storageOptions: {
            skipBackup: true,
            path: 'images',
          },
        };
        launchImageLibrary({}, async response => {
          setIsLoading(true);
          if (response.didCancel) {
            console.log('user cancelled image picker');
          } else if (response.error) {
            console.log('Image picker error', response.error);
          } else if (response.customButton) {
            console.log('user tapped custom button', response.customButton);
          } else {
            const pathToFile = response?.uri;
            await reference.putFile(pathToFile);
            // fetch profileurl from storage
            const url = await storage().ref(user?.id).getDownloadURL();
            setImage(url);

            await Models.users.update(user?.id, {profile_image: url});
          }
          setIsLoading(false);
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const editProfile = () => {
    dispatch({
      type: 'toggleBottomModel',
      payload: {bottomModel: 'EditProfile'},
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <TabScreenHeader
        leftComponent={() => (
          <View style={styles.leftHeaderWrapper}>
            <Text style={styles.headerTitle}>Profile</Text>
          </View>
        )}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View>
          <View style={styles.profileDetailsSection}>
            <View style={styles.profileInfoSection}>
              {/* <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsText}>135</Text>
                <Text style={styles.statisticsTitle}>Completed Tasks</Text>
              </View> */}
              <View style={{alignItems: 'center'}}>
                <View style={{position: 'relative'}}>
                  {isLoading ? (
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 100,
                        width: 100,
                        backgroundColor: appTheme?.INACTIVE_COLOR,
                        marginBottom: 20,
                        borderRadius: 50,
                      }}>
                      <Loader />
                    </View>
                  ) : image?.length > 0 ? (
                    <Image
                      style={styles.profilePhoto}
                      source={{
                        uri: image,
                      }}
                    />
                  ) : (
                    <View
                      style={{
                        justifyContent: 'center',
                        display: 'flex',
                        alignItems: 'center',
                        backgroundColor: '#60C877',
                        height: 80,
                        width: 80,
                        borderRadius: 50,
                        marginBottom: 20,
                      }}>
                      <Text
                        style={{
                          fontSize: 24,
                          fontFamily: fonts.regular,
                          fontWeight: 'bold',
                        }}>
                        {user?.user_name[0].toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <TouchableOpacity
                    onPress={() => uploadImage()}
                    style={{position: 'absolute', bottom: 18, right: 0}}>
                    <MaterialCommunityIcons
                      name="camera"
                      size={25}
                      color={appTheme?.PRIMARY_COLOR}
                      style={{backgroundColor: 'white', borderRadius: 6}}
                    />
                  </TouchableOpacity>
                </View>
                <Text style={styles.nameText}>{user?.user_name}</Text>
                <Text style={styles.designationText}>{user?.designation}</Text>
                <TouchableOpacity
                  style={styles.editProfileWrapper}
                  onPress={editProfile}>
                  <Text style={styles.editProfileText}>Edit Profile</Text>
                </TouchableOpacity>
              </View>
              {/* <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsText}>20</Text>
                <Text style={styles.statisticsTitle}>Ongoing Tasks</Text>
              </View> */}
            </View>
          </View>
          <View style={styles.exploreSection}>
            <TouchableOpacity
              style={[styles.singleExplore]}
              onPress={handleLogout}>
              <MaterialCommunityIcons
                name="logout"
                size={25}
                color={appTheme.COLOR1}
              />
              <Text style={styles.exploreText}>Log out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
