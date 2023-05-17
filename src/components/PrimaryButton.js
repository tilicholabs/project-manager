import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Loader} from './Loader';

export function PrimaryButton({title, titleStyle = {}, ...props}) {
  return (
    <TouchableOpacity {...{...props}}>
      {!props?.loader && <Text style={titleStyle}>{title}</Text>}
      {props?.loader && (
        <View style={{alignItems: 'center', justifyContent: 'center'}}>
          <Loader color="white" />
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({});
