import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';
import {statusColors, taskStatusOptions} from '../../constants/constants';
import styles from './statusPopUpStyle';

export const StatusPopUp = ({onSelect = () => {}, task}) => {
  return (
    <Menu>
      <MenuTrigger>
        <View style={styles.checkBoxOuterView}>
          <View
            style={{
              ...styles.checkBoxInnerView,
              ...{
                backgroundColor: statusColors[task?.status],
              },
            }}></View>
        </View>
      </MenuTrigger>
      <MenuOptions>
        {taskStatusOptions?.map((status, index1) => (
          <MenuOption
            style={{
              borderBottomWidth:
                index1 !== taskStatusOptions.length - 1 ? 1 : 0,
              borderBottomColor: 'gray',
              flexDirection: 'row',
              alignItems: 'center',
            }}
            key={index1}
            onSelect={() => onSelect(task?.id, status?.title)}>
            <View
              style={{
                ...styles.checkBox,
                ...{backgroundColor: statusColors[status.title]},
              }}></View>
            <Text style={styles.menuOptionsText}>{status.title}</Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};
