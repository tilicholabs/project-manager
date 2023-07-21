import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React, {useState, useContext, useEffect} from 'react';
import {Dashboard, Members, Profile, Projects} from '../screens';
import {View, StyleSheet, TouchableOpacity, Text, Image} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import firestore from '@react-native-firebase/firestore';
import {dataFormatter} from '../utils/DataFormatter';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {AppContext} from '../context';
import {getFocusedRouteNameFromRoute, useRoute} from '@react-navigation/native';
import appTheme from '../constants/colors';
const BottomTab = createBottomTabNavigator();
const CustomTabBar = props => {
  const {state, dispatch, user} = useContext(AppContext);
  const [data, setData] = useState({activeNavTab: 'Dashboard'});
  const route = useRoute();
  const routeName = getFocusedRouteNameFromRoute(route);

  const handleNavigation = route => {
    props?.navigation.navigate(route);
  };

  const getColor = title => {
    let color;
    if (title === routeName) {
      color = appTheme.PRIMARY_COLOR;
    } else {
      color = appTheme.INACTIVE_COLOR;
    }
    return color;
  };

  //   useEffect(() => {
  //     if (
  //       data?.activeNavTab != route?.state?.routeNames?.[route?.state?.index] &&
  //       !!route?.state?.routeNames?.[route?.state?.index]
  //     ) {
  //       setData(prv => ({
  //         ...prv,
  //         activeNavTab: route?.state?.routeNames?.[route?.state?.index],
  //       }));
  //     }
  //   }, [route]);

  return (
    <View style={styles.menuWrapper}>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => handleNavigation('Dashboard')}>
          <Ionicons
            name="home-outline"
            size={24}
            color={getColor('Dashboard')}
          />
          <Text
            style={{
              color: getColor('Dashboard'),
              fontFamily: 'Montserrat-Regular',
            }}>
            Home
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => handleNavigation('Projects')}>
          <Ionicons
            name="ios-document-text"
            size={25}
            color={getColor('Projects')}
          />
          <Text
            style={{
              color: getColor('Projects'),
              fontFamily: 'Montserrat-Regular',
            }}>
            Projects
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => handleNavigation('Members')}>
          <MaterialIcons name="groups" size={25} color={getColor('Members')} />
          <Text
            style={{
              color: getColor('Members'),
              fontFamily: 'Montserrat-Regular',
            }}>
            Members
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{alignItems: 'center'}}
          onPress={() => handleNavigation('Profile')}>
          {user?.profile_image ? (
            <Image
              source={{uri: user?.profile_image}}
              style={{height: 28, width: 28, borderRadius: 28}}
            />
          ) : (
            <MaterialIcons
              name="account-circle"
              size={25}
              color={getColor('Profile')}
            />
          )}
          <Text
            style={{
              color: getColor('Profile'),
              fontFamily: 'Montserrat-Regular',
            }}>
            Profile
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export const BottomStack = () => {
  return (
    <BottomTab.Navigator tabBar={props => <CustomTabBar {...props} />}>
      <BottomTab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{headerShown: false}}
      />
      <BottomTab.Screen
        name="Projects"
        component={Projects}
        options={{headerShown: false}}
      />
      <BottomTab.Screen
        name="Members"
        component={Members}
        options={{headerShown: false}}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
    </BottomTab.Navigator>
  );
};

const styles = StyleSheet.create({
  menuWrapper: {
    backgroundColor: 'transparent',
  },
  menuContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'row',
    shadowRadius: 2,
    shadowOffset: {
      width: 0,
      height: -3,
    },
    shadowColor: '#000000',
    elevation: 4,
    marginTop: 1,
    paddingHorizontal: 25,
    borderTopStartRadius: 30,
    borderTopEndRadius: 30,
  },
  plusBtnContainer: {
    backgroundColor: appTheme.PRIMARY_COLOR,
    height: 60,
    width: 60,
    borderRadius: 50,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
