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
  const {state, dispatch} = useContext(AppContext);
  const [searchValue, setSearch] = useState('');
  const [members, setMembers] = useState(state?.members);
  const [searchFocused, setSearchFocused] = useState(false);
  const [data, setData] = useState({
    title: '',
    description: '',
    team_id: [],
  });
  const [keyboardDetails] = useKeyboardDetails();

  // console.log(members, 'mem');

  const addMembersToFirst = (team_id, members) => {
    const newMembers = members?.filter(item => {
      const foundIndex = team_id?.findIndex(a => a?.id === item?.id);
      if (foundIndex === -1) {
        return true;
      }
      return false;
    });
    setMembers([...team_id, ...newMembers]);
  };

  // const handleSetValue = (field, value) => {
  //   let {newProject} = data;
  //   if (field === 'team_id') {
  //     let {team_id} = newProject;
  //     const foundIndex = team_id?.findIndex(a => a?.id === value?.id);

  //     if (foundIndex === -1) {
  //       team_id.push(value);
  //     } else {
  //       team_id = team_id.filter(a => a?.id !== value?.id);
  //     }
  //     newProject['team_id'] = team_id;
  //     addMembersToFirst(team_id, members);
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
    if (field === 'team_id') {
      let {team_id} = data;
      const foundIndex = team_id?.findIndex(a => a === value);
      if (foundIndex === -1) {
        team_id.push(value);
      } else {
        team_id = team_id.filter(a => a !== value);
      }
      data['team_id'] = team_id;
      // addMembersToFirst(team_id, members);
    } else {
      data[field] = value;
    }

    setData({...data});
  };

  const isSelectedMember = member => {
    let value;
    let {team_id} = data;
    const foundIndex = team_id?.findIndex(a => a == member);
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
    addMembersToFirst(data?.team_id, result);
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
              {members?.map(member => (
                <TouchableOpacity
                  key={shortid.generate()}
                  style={[
                    styles.memberWrapper,
                    isSelectedMember(member?.id)
                      ? styles.activeTeamWrapper
                      : null,
                  ]}
                  onPress={() => handleSetValue('team_id', member?.id)}>
                  {/* <Image
                    style={styles.memberPhoto}
                    source={{uri: member?.photo}}
                  /> */}
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
                      {member?._data?.user_name[0]}
                    </Text>
                  </View>
                  <Text
                    style={[
                      styles.memberName,
                      isSelectedMember(member) ? styles.activeMemberName : null,
                    ]}
                    numberOfLines={2}
                    ellipsizeMode="tail">
                    {member?._data?.user_name}
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
