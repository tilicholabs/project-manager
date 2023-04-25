import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import shortid from 'shortid';
import {AppContext} from '../../context';
import styles from './selectMembersStyle';

export const SelectedMembers = ({doneButton = false}) => {
  const {state, selectedMembers, setSelectedMembers, dispatch} =
    useContext(AppContext);
  const {members} = state;

  const handleSetValue = value => {
    setSelectedMembers(prev => {
      let previousItems = [...prev];
      const foundIndex = previousItems?.findIndex(a => a?.id === value?.id);
      if (foundIndex === -1) {
        previousItems.push(value);
        return previousItems;
      } else {
        return previousItems.filter(a => a?.id !== value?.id);
      }
    });
  };

  const isSelectedMember = member => {
    let value = false;
    const foundIndex = selectedMembers?.findIndex(
      a => a?.id?.toLowerCase() == member?.id?.toLowerCase(),
    );
    if (foundIndex > -1) {
      value = true;
    }
    return value;
  };

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.teamWrapper}>
          {members?.map(member => (
            <TouchableOpacity
              key={shortid.generate()}
              style={[
                styles.memberWrapper,
                isSelectedMember(member) ? styles.activeTeamWrapper : null,
              ]}
              onPress={() => handleSetValue(member)}>
              <Image style={styles.memberPhoto} source={{uri: member?.photo}} />
              <Text
                style={[
                  styles.memberName,
                  isSelectedMember(member) ? styles.activeMemberName : null,
                ]}
                numberOfLines={2}
                ellipsizeMode="tail">
                {member?.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {doneButton && (
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() =>
            dispatch({
              type: 'toggleBottomModal',
              payload: {bottomModal: null},
            })
          }>
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
