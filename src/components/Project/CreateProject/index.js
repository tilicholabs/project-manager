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

export function CreateProject({navigation}) {
  const {state, dispatch} = useContext(AppContext);
  const [searchValue, setSearch] = useState('');
  const [members, setMembers] = useState(state?.members);
  const [searchFocused, setSearchFocused] = useState(false);
  const [data, setData] = useState({
    newProject: {title: '', description: '', selectedMembers: []},
  });
  const [keyboardDetails] = useKeyboardDetails();

  const addMembersToFirst = (selectedMembers, members) => {
    const newMembers = members?.filter(item => {
      const foundIndex = selectedMembers?.findIndex(a => a?.id === item?.id);
      if (foundIndex === -1) {
        return true;
      }
      return false;
    });
    setMembers([...selectedMembers, ...newMembers]);
  };

  const handleSetValue = (field, value) => {
    let {newProject} = data;
    if (field === 'selectedMembers') {
      let {selectedMembers} = newProject;
      const foundIndex = selectedMembers?.findIndex(a => a?.id === value?.id);

      if (foundIndex === -1) {
        selectedMembers.push(value);
      } else {
        selectedMembers = selectedMembers.filter(a => a?.id !== value?.id);
      }
      newProject['selectedMembers'] = selectedMembers;
      addMembersToFirst(selectedMembers, members);
    } else {
      newProject[field] = value;
    }
    addMembersToFirst;
    setData(
      combineData(data, {
        newProject,
      }),
    );
  };

  const isSelectedMember = member => {
    let value;
    let {selectedMembers} = data?.newProject;
    const foundIndex = selectedMembers?.findIndex(
      a => a?.id?.toLowerCase() == member?.id?.toLowerCase(),
    );
    if (foundIndex > -1) {
      value = true;
    }
    return value;
  };
  const leftComponent = () => {
    return <Text style={{fontSize: 16}}>Create Project</Text>;
  };

  const onChange = text => {
    const result = state?.members?.filter(item =>
      item?.name?.toLowerCase()?.includes(text?.toLowerCase()),
    );
    addMembersToFirst(data?.newProject?.selectedMembers, result);
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
            value={data?.newProject?.title}
            placeholder="Title"
            placeholderTextColor="gray"
            style={styles.textInput}
            onChangeText={text => handleSetValue('title', text)}
          />
          <CustomTextInput
            value={data?.newProject?.description}
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
              {members?.map(member => (
                <TouchableOpacity
                  key={shortid.generate()}
                  style={[
                    styles.memberWrapper,
                    isSelectedMember(member) ? styles.activeTeamWrapper : null,
                  ]}
                  onPress={() => handleSetValue('selectedMembers', member)}>
                  <Image
                    style={styles.memberPhoto}
                    source={{uri: member?.photo}}
                  />
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
        </View>
        <TouchableOpacity style={styles.btnWrapper} onPress={goBack}>
          <Text style={styles.btnText}>Create</Text>
        </TouchableOpacity>
      </View>
    </Fragment>
  );
}
