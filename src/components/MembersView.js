import {Text, View} from 'react-native';
import React from 'react';
import shortid from 'shortid';
import styles from '../screens/TaskView/taskViewStyle';
import FastImage from 'react-native-fast-image';
import {teamMembersCount} from '../constants/constants';
import {fonts} from '../constants/fonts';

const NonImageView = ({text}) => (
  <View
    style={{
      ...styles.taskMemberPhoto,
      ...{
        backgroundColor: '#644CBC',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: 'black',
        shadowOffset: {
          height: 0,
          width: 1,
        },
      },
    }}
    key={shortid.generate()}>
    <Text
      style={{
        fontSize: 15,
        fontWeight: 'bold',
        color: '#fff',
        fontFamily: fonts.regular,
      }}>
      {text}
    </Text>
  </View>
);

export const MembersView = ({members = []}) => {
  return members?.map((member, index) => {
    return index < teamMembersCount ? (
      !!member?.profile_image ? (
        <FastImage
          style={{
            height: 40,
            width: 40,
            borderRadius: 50,
            marginLeft: -10,
          }}
          source={{
            uri: member?.profile_image,
          }}
        />
      ) : (
        <NonImageView text={member?.user_name[0].toUpperCase()} />
      )
    ) : (
      index === teamMembersCount + 1 && (
        <NonImageView text={`+${members?.length - teamMembersCount}`} />
      )
    );
  });
};
