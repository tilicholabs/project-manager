import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  Linking,
  StyleSheet,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import shortid from 'shortid';
import styles from './membersStyle';
import appTheme from '../../constants/colors';
import {TabScreenHeader, EmptyListComponent} from '../../components';
import {AppContext} from '../../context';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {getScreenParent} from '../../utils/NavigationHelper';
import {AddIcon} from '../../components/AddIcon';
import colors from '../../constants/colors';
import {Modals} from '../../api/firebaseModal';
import firestore from '@react-native-firebase/firestore';

export const Modal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles1.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles1.centeredView}>
          <View style={styles1.modalView}>
            <Text style={styles1.modalText}>Hello World!</Text>
            <Pressable
              style={[styles1.button, styles1.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles1.textStyle}>Hide Modal</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export function Members() {
  const {state, dispatch} = useContext(AppContext);
  // const {members} = state;
  const [members, setMembers] = useState([]);

  // const getUsers = async () => {
  //   const users = await Modals.users.getMembers();
  //   setMembers();
  //   console.log(users);
  // };

  // useEffect(() => {
  //   getUsers();
  // }, []);

  useEffect(() => {
    firestore()
      .collection('users')
      .onSnapshot(document => {
        setMembers(document.docs);
        // let data = [];
        // document.docs.map(item => {
        //   data.push({[item.id]: item._data});
        // });
      });
  }, []);

  const handleNavigation = (screen, params) => {
    navigateToNestedRoute(getScreenParent(screen), screen, params);
  };

  const handleAddMember = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'AddMember'},
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* <TabScreenHeader
        leftComponent={() => <Text style={styles.headerTitle}>Members</Text>}
        isSearchBtnVisible={false}
        isMoreBtnVisible={true}
      /> */}
      {members?.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.membersWrapper}>
            {members.map((member, index) => (
              <View
                style={{
                  ...styles.singleMember,
                  marginBottom: index === members.length - 1 ? 50 : 15,
                }}
                key={shortid.generate()}>
                {member?._data?.photo ? (
                  <Image
                    style={styles.singleMemberPhoto}
                    source={{
                      uri: member?._data?.photo,
                    }}
                  />
                ) : (
                  <View
                    style={{
                      ...styles.singleMemberText,
                      backgroundColor: `#${Math.floor(
                        Math.random() * 16777215,
                      ).toString(16)}`,
                    }}>
                    <Text
                      style={{
                        fontSize: 30,
                        lineHeight: 32,
                        color: 'white',
                      }}>
                      {member?._data?.name[0]}
                    </Text>
                  </View>
                )}
                <View style={styles.singleMemberInfo}>
                  <Text
                    style={styles.selectedMemberName}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {member?._data?.name}
                  </Text>
                  <Text style={styles.selectedMemberLastSeen}>
                    {member?._data?.designation}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{marginRight: 5}}
                  onPress={() => {
                    Linking.openURL(
                      `whatsapp://send?phone=${member?._data?.phoneNumber}`,
                    );
                  }}>
                  <Image
                    source={require('../../assets/whatsappIcon.png')}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Modals.users.deleteUser(member?._data?.id);
                  }}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={25}
                    color={appTheme.SECONDARY_COLOR}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <EmptyListComponent />
      )}
      <AddIcon
        style={{
          position: 'absolute',
          bottom: 10,
          right: 20,
          zIndex: 100,
          elevation: 2,
          backgroundColor: colors.PRIMARY_COLOR,
        }}
        onPress={handleAddMember}
      />
    </SafeAreaView>
  );
}

const styles1 = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});
