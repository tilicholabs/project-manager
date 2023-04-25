import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './AddIconStyle';

export const AddIcon = ({
  style = {},
  bg = '#F9CB99',
  onPress = () => {},
  size = 22,
  color = '#fff',
}) => {
  return (
    <TouchableOpacity
      style={{
        ...styles.plusBtnContainer,
        backgroundColor: bg,
        ...style,
      }}
      onPress={onPress}>
      <MaterialCommunityIcons name="plus" size={size} color={color} />
    </TouchableOpacity>
  );
};
