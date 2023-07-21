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
import Search from '../../components/Search';
import FastImage from 'react-native-fast-image';

export function Members() {
  const {state, dispatch, members, setMembers} = useContext(AppContext);
  const [searchValue, setSearch] = useState('');
  const [filteredList, setFilteredList] = useState([]);

  useEffect(() => {
    const filteredValue = (Array?.isArray(members) ? members : [])?.filter(
      user => user?.user_name.toLowerCase().includes(searchValue.toLowerCase()),
    );
    setFilteredList([...filteredValue]);
  }, [searchValue, members]);

  const handleNavigation = (screen, params) => {
    navigateToNestedRoute(getScreenParent(screen), screen, params);
  };

  const handleAddMember = () => {
    dispatch({
      type: 'toggleBottomModal',
      payload: {bottomModal: 'AddMember'},
    });
  };

  const leftComponent = () => (
    <Text
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: 'Montserrat-Regular',
      }}>
      Members
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabScreenHeader {...{leftComponent, isBackButtonPresent: true}} />
      <Search
        {...{
          placeholder: 'Search member',
          value: searchValue,
          onChangeText: setSearch,
          backgroundColor: 'white',
        }}
      />
      {filteredList?.length ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.membersWrapper}>
            {filteredList.map((member, index) => (
              <View
                style={{
                  ...styles.singleMember,
                  marginBottom: index === filteredList.length - 1 ? 50 : 15,
                }}
                key={shortid.generate()}>
                {member?.profile_image ? (
                  <FastImage
                    style={styles.singleMemberPhoto}
                    source={{
                      uri: member?.profile_image,
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
                        fontFamily: 'Montserrat-Regular',
                      }}>
                      {member?.user_name[0]}
                    </Text>
                  </View>
                )}
                <View style={styles.singleMemberInfo}>
                  <Text
                    style={styles.selectedMemberName}
                    numberOfLines={1}
                    ellipsizeMode="tail">
                    {member?.user_name}
                  </Text>
                  <Text style={styles.selectedMemberLastSeen}>
                    {member?.designation}
                  </Text>
                </View>
                <TouchableOpacity
                  style={{marginRight: 5}}
                  onPress={() => {
                    Linking.openURL(
                      `whatsapp://send?phone=${member?.phone_number}`,
                    );
                  }}>
                  <FastImage
                    source={require('../../assets/whatsappIcon.png')}
                    style={{width: 30, height: 30}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  disabled={true}
                  onPress={async () => {
                    await Modals.users.delete(member?.id);
                  }}>
                  <MaterialCommunityIcons
                    name="delete"
                    size={25}
                    color={appTheme.INACTIVE_COLOR}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </ScrollView>
      ) : (
        <EmptyListComponent />
      )}
      {/* <AddIcon
        style={{
          position: 'absolute',
          bottom: 10,
          right: 20,
          zIndex: 100,
          elevation: 2,
          backgroundColor: colors.PRIMARY_COLOR,
        }}
        onPress={handleAddMember}
      /> */}
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
