import React from 'react';
import {useState} from 'react';
import {Text, TextInput, View} from 'react-native';
import styles from './TextInputStyle';

export const InputTextField = props => {
  const {
    title,
    keyboardType,
    onChangeText,
    value,
    placeholder,
    maxLength,
    isRequired,
  } = props;
  const [name, setName] = useState('');

  return (
    <View style={{marginLeft: 12}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{marginTop: 12, marginBottom: 5, marginRight: 3}}>
          {title}
        </Text>
        {isRequired && <Text style={{marginTop: 12, color: 'red'}}>*</Text>}
      </View>
      <TextInput
        style={styles.textInput}
        onChangeText={onChangeText}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoComplete="off"
        maxLength={maxLength}
      />
    </View>
  );
};
