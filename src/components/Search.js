import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';
import appTheme from '../constants/colors';
import CustomTextInput from './Global/CustomTextInput';

const Search = props => {
  // console.log(props);
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 16,
        height: 40,
        borderRadius: 5,
        borderColor: appTheme.INACTIVE_COLOR,
        borderWidth: 1,
        alignItems: 'center',
        paddingHorizontal: 7,
        paddingVertical: 5,
        backgroundColor: 'white',
      }}>
      <CustomTextInput
        {...{
          ...props,
          container: {flex: 1, height: 40, paddingVertical: 2},
          style: {
            ...props?.style,

            padding: 0,
            flex: 1,
          },
        }}
      />
      <MaterialCommunityIcons
        name={'search'}
        style={{paddingHorizontal: 4}}
        size={20}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
