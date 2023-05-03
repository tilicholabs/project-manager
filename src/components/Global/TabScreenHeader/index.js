import React from 'react';
import {View, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import {goBack} from '../../../navigators/RootNavigation';

export function TabScreenHeader({
  leftComponent = () => {},
  style = {},
  isBackButtonPresent = true,
}) {
  return (
    <View style={{...styles.headerContainer, ...style}}>
      {isBackButtonPresent && (
        <MaterialCommunityIcons
          name={'arrow-back'}
          size={25}
          style={{marginLeft: 10}}
          onPress={goBack}
        />
      )}
      <View style={{marginLeft: 16}}>{leftComponent()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    height: 50,
    backgroundColor: 'white',
    alignItems: 'center',
    flexDirection: 'row',
    position: 'relative',
    width: '100%',
  },
});
