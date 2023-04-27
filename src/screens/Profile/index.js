import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Modal,
  PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import styles from './profileStyle';
import appTheme from '../../constants/colors';
import {AppContext} from '../../context';
import {TabScreenHeader} from '../../components';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {getScreenParent} from '../../utils/NavigationHelper';
import {TextInput} from 'react-native-paper';
import {FontAwesome} from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';

export function Profile({navigation}) {
  const {state, dispatch} = useContext(AppContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState('');
  const [text1, setTextone] = useState('');
  const [cameraPhoto, setCameraPhoto] = useState();
  const {user} = state;

  const handleBackButton = () => {
    navigation?.goBack();
  };

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
        ImagePicker.showImagePicker(options, response => {
          console.log('Response = ', response);

          if (response.didCancel) {
            console.log('User cancelled image picker');
          } else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          } else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
            alert(response.customButton);
          } else {
            let source = response;
            // You can also display the image using data:
            // let source = {
            //   uri: 'data:image/jpeg;base64,' + response.data
            // };
            setFilePath(source);
          }
        });
      }
    } catch (e) {
      console.log(e);
    }
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
              <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsText}>135</Text>
                <Text style={styles.statisticsTitle}>Completed Tasks</Text>
              </View>
              <Image
                style={styles.profilePhoto}
                source={{
                  uri: user?.photo,
                }}
              />
              <View>
                <TouchableOpacity onPress={() => uploadImage()}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={20}
                    color={'blue'}
                  />
                </TouchableOpacity>
                <Image
                  style={styles.profilePhoto}
                  source={{
                    uri: cameraPhoto,
                  }}
                />
              </View>
              <View style={styles.statisticsContainer}>
                <Text style={styles.statisticsText}>20</Text>
                <Text style={styles.statisticsTitle}>Ongoing Tasks</Text>
              </View>
            </View>
            <View style={styles.profileCenterSection}>
              <Text style={styles.nameText}>{user?.name}</Text>
              <Text style={styles.designationText}>{user?.designation}</Text>
              <TouchableOpacity
                style={styles.editProfileWrapper}
                onPress={() => setIsModalOpen(true)}>
                <Text style={styles.editProfileText}>Edit Profile</Text>
              </TouchableOpacity>
              <Modal
                animationType={'slide'}
                visible={isModalOpen}
                onRequestClose={() => setIsModalOpen(false)}
                style={{backgroundColor: 'red'}}>
                <View style={styles.inputContainer}>
                  <Text style={styles.labels}>Enter Your Name</Text>
                  <TextInput
                    style={styles.inputStyle}
                    onChangeText={newText => setText(newText)}
                    defaultValue={text}
                  />
                  <Text style={styles.labels}>Enter Your Designation</Text>
                  <TextInput
                    style={styles.inputStyle}
                    autoCapitalize="none"
                    autoCorrect={false}
                    onChangeText={newText1 => setText(newText1)}
                    defaultValue={text1}
                  />
                  <TouchableOpacity style={styles.button}>
                    <Text style={styles.text}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </Modal>
            </View>
          </View>
          <View style={styles.exploreSection}>
            <TouchableOpacity
              style={[
                styles.singleExplore,
                {marginRight: 'auto', marginLeft: '2%'},
              ]}
              onPress={handleLogout}>
              <MaterialCommunityIcons
                name="logout"
                size={22}
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
