import {StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import {fonts} from '../../constants/fonts';

export default function CustomTextInput(props) {
  return (
    <View style={{...styles?.container, ...props?.container}}>
      <TextInput {...{...props}} />
      {!!props?.value && (
        <Text style={{...styles?.title, ...props?.placeholderStyle}}>
          {props?.placeholder}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  title: {
    position: 'absolute',
    left: 6,
    top: -9,
    fontSize: 12,
    fontWeight: '500',
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 2,
    fontFamily: fonts.regular,
  },
});
