import React, {useState, useContext, Fragment} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import shortid from 'shortid';
import styles from './createProjectStyle';
import {combineData} from '../../../utils/DataHelper';
import {AppContext} from '../../../context';
import Search from '../../Search';
import {goBack} from '../../../navigators/RootNavigation';
import {useKeyboardDetails} from '../../../hooks/useKeyboardDetails';
import {TabScreenHeader} from '../../Global';
import {onChange} from 'react-native-reanimated';
import CustomTextInput from '../../Global/CustomTextInput';
import {Modals} from '../../../api/firebaseModal';

export function CreateProject({navigation}) {
  const {state, dispatch, members} = useContext(AppContext);
  const [searchValue, setSearch] = useState('');
  const [updatedMembers, setUpdatedMembers] = useState(members);
  const [searchFocused, setSearchFocused] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    selectedMembers: [],
  });
  const [keyboardDetails] = useKeyboardDetails();

  const addMembersToFirst = (selectedMembers, members) => {
    const newSelectedMembers = [];
    const newMembers = members?.filter(item => {
      const foundIndex = selectedMembers?.findIndex(a => a === item?.id);
      if (foundIndex === -1) {
        return true;
      }
      newSelectedMembers?.push(JSON?.parse(JSON?.stringify(item)));
      return false;
    });

    setUpdatedMembers([...newSelectedMembers, ...newMembers]);
  };

  // const handleSetValue = (field, value) => {
  //   let {newProject} = data;
  //   if (field === 'selectedMembers') {
  //     let {selectedMembers} = newProject;
  //     const foundIndex = selectedMembers?.findIndex(a => a?.id === value?.id);

  //     if (foundIndex === -1) {
  //       selectedMembers.push(value);
  //     } else {
  //       selectedMembers = selectedMembers.filter(a => a?.id !== value?.id);
  //     }
  //     newProject['selectedMembers'] = selectedMembers;
  //     addMembersToFirst(selectedMembers, members);
  //   } else {
  //     newProject[field] = value;
  //   }
  //   addMembersToFirst;
  //   setData(
  //     combineData(data, {
  //       newProject,
  //     }),
  //   );
  // };

  const handleSetValue = (field, value) => {
    // let {newProject} = data;
    if (field === 'selectedMembers') {
      let {selectedMembers} = data;
      const foundIndex = selectedMembers?.findIndex(a => a === value);
      if (foundIndex === -1) {
        selectedMembers.push(value);
      } else {
        selectedMembers = selectedMembers.filter(a => a !== value);
      }

      data['selectedMembers'] = selectedMembers;
      addMembersToFirst(selectedMembers, members);
    } else {
      data[field] = value;
    }

    setData({...data});
  };

  const isSelectedMember = member => {
    let value;
    let {selectedMembers} = data;
    const foundIndex = selectedMembers?.findIndex(a => a == member);
    if (foundIndex > -1) {
      value = true;
    }
    return value;
  };
  const leftComponent = () => {
    return <Text style={{fontSize: 16}}>Create Project</Text>;
  };

  const onChange = text => {
    const result = members?.filter(item =>
      item?.user_name?.toLowerCase()?.includes(text?.toLowerCase()),
    );

    setSearch(text);
  };

  return (
    <Fragment>
      <TabScreenHeader {...{leftComponent}} />
      <View style={styles.container}>
        <View
          style={{
            paddingHorizontal: 16,
            width: '100%',
            display:
              keyboardDetails?.isVisible && searchFocused ? 'none' : 'flex',
          }}>
          <CustomTextInput
            value={data?.title}
            placeholder="Title"
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={text => handleSetValue('title', text)}
          />
          <CustomTextInput
            value={data?.description}
            placeholder="Description"
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={text => handleSetValue('description', text)}
          />
        </View>

        <View style={styles.teamTextWrapper}>
          <Search
            {...{
              placeholder: 'Search',
              value: searchValue,
              onChangeText: onChange,
              backgroundColor: 'white',
              onFocus: () => setSearchFocused(true),
              onBlur: () => setSearchFocused(false),
            }}
          />
        </View>
        <View style={styles.teamSection}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.teamWrapper}>
              {updatedMembers?.map(member => (
                <TouchableOpacity
                  key={shortid.generate()}
                  style={[
                    styles.memberWrapper,
                    isSelectedMember(member?.id)
                      ? styles.activeTeamWrapper
                      : null,
                  ]}
                  onPress={() => handleSetValue('selectedMembers', member?.id)}>
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
        </View>
        <TouchableOpacity
          style={styles.btnWrapper}
          onPress={async () => {
            await Modals.projects.createProject({
              ...data,
              created_at: new Date().getTime(),
            });
            // dispatch({
            //   type: 'toggleBottomModal',
            //   payload: {bottomModal: null},
            // });
            goBack();
          }}>
          <Text style={styles.btnText}>Add Project</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
}
