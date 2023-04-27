import {
  Button,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import appTheme from '../constants/colors';

export function CustomDatePicker({
  open,
  onClose,
  newDateCallBack,
  intialDate,
  childrenStyle = {},
  ...props
}) {
  const [date, setDate] = useState(intialDate);

  return (
    <Modal visible={open} transparent style={{}}>
      <TouchableOpacity
        onPress={onClose}
        style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 10,
            borderRadius: 10,
            shadowColor: '#171717',
            shadowOffset: {width: -2, height: 4},
            shadowOpacity: 0.2,
            shadowRadius: 3,
            elevation: 2,
            ...childrenStyle,
          }}>
          <Pressable>
            <DatePicker
              style={{backgroundColor: 'white'}}
              date={date}
              mode={'date'}
              onDateChange={date => setDate(date)}
              {...{...props}}
            />
            <View
              style={{
                width: 100,
                marginVertical: 20,
                alignSelf: 'flex-end',
                marginRight: 20,
              }}>
              <Button
                title="Change"
                onPress={() => {
                  newDateCallBack(date);
                  onClose();
                }}
                color={appTheme?.PRIMARY_COLOR}
              />
            </View>
          </Pressable>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({});
