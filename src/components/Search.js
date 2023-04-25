import {StyleSheet, Text, TextInput, View} from 'react-native';
import React from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/Ionicons';

const Search = props => {
  return (
    <View
      style={{
        flexDirection: 'row',
        marginHorizontal: 16,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 4,
        backgroundColor: 'white',
      }}>
      <TextInput
        {...{
          ...props,
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
