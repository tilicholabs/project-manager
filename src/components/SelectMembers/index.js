import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useContext} from 'react';
import shortid from 'shortid';
import {AppContext} from '../../context';
import styles from './selectMembersStyle';

export const SelectedMembers = ({showDone = false}) => {
  const {state, selectedMembers, setSelectedMembers, dispatch, members} =
    useContext(AppContext);

  const handleSetValue = value => {
    setSelectedMembers(prev => {
      let previousItems = [...prev];
      const foundIndex = previousItems?.findIndex(a => a === value?.id);
      if (foundIndex === -1) {
        previousItems.push(value?.id);
        return previousItems;
      } else {
        return previousItems.filter(a => a !== value?.id);
      }
    });
  };

  const isSelectedMember = member => {
    let value = false;
    const foundIndex = selectedMembers?.findIndex(
      a => a?.toLowerCase() == member?.id?.toLowerCase(),
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
              {member?.profile_image ? (
                <Image
                  style={styles.memberPhoto}
                  source={{uri: member?.profile_image}}
                />
              ) : (
                <View
                  style={{
                    ...styles.memberPhoto,
                    ...{
                      justifyContent: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      backgroundColor: '#60C877',
                    },
                  }}>
                  <Text style={{fontSize: 18, fontWeight: 'bold'}}>
                    {member?.user_name?.[0]}
                  </Text>
                </View>
              )}
              <Text
                style={[
                  styles.memberName,
                  isSelectedMember(member) ? styles.activeMemberName : null,
                ]}
                numberOfLines={2}
                ellipsizeMode="tail">
                {member?.user_name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {showDone && (
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={() =>
            dispatch({
              type: 'toggleBottomModal',
              payload: {bottomModal: 'closeSelectMembers'},
            })
          }>
          <Text style={styles.btnText}>Done</Text>
        </TouchableOpacity>
      )}
    </>
  );
};
