import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const AppLogo = () => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <Image
        source={require('../assets/app_logo.png')}
        style={{width: 25, height: 25, marginRight: 7}}
      />
      <Image
        source={require('../assets/app_name.png')}
        style={{width: 60, height: 50}}
      />
    </View>
  );
};

export default AppLogo;

const styles = StyleSheet.create({});
