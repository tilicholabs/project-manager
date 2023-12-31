import React, {useState, useContext, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  Pressable,
} from 'react-native';
import shortid from 'shortid';
import styles from './createTaskStyle';
import {combineData, getTime} from '../../../utils/DataHelper';
import {AppContext} from '../../../context';
import {SelectedMembers} from '../../SelectMembers';
import {Models} from '../../../api/firebaseModel';
import {ProjectsListing} from '../../ProjectsListing';
import appTheme from '../../../constants/colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {CustomDatePicker} from '../../CustomDatePicker';
import CustomTextInput from '../../Global/CustomTextInput';
import moment from 'moment';
import {TabScreenHeader} from '../../Global';
import {Fragment} from 'react/cjs/react.production.min';
import {goBack} from '../../../navigators/RootNavigation';
import {PrimaryButton} from '../../PrimaryButton';
import {fonts} from '../../../constants/fonts';

export function CreateTask({subTask = false}) {
  const {
    dispatch,
    selectedTask,
    selectedMembers,
    setSelectedMembers,
    selectedProject,
    setSelectedProject,
    isProjectSelected,
  } = useContext(AppContext);
  const [data, setData] = useState({
    title: '',
    description: '',
    due_date: new Date(),
  });
  const [ModelOpen, setModelOpen] = useState(false);
  const [loader, setLoader] = useState(false);

  const taskCreateHandler = async () => {
    setLoader(true);
    if (subTask) {
      await Models.subTasks.set({
        title: data?.title || '',
        parent_task_id: selectedTask?.id || '',
        status: 'Not started',
        team: selectedMembers || [],
        created_at: getTime(),
      });
    } else {
      await Models.tasks.set({
        title: data?.title || '',
        description: data?.description || '',
        project_id: selectedProject?.id,
        project_name: selectedProject?.title,
        team: selectedMembers || [],
        status: 'Not started',
        due_date: JSON?.stringify(data?.due_date),
        created_at: getTime(),
      });
    }
    setSelectedMembers([]);
    setLoader(false);
    if (!subTask) goBack();
    else
      dispatch({
        type: 'toggleBottomModel',
        payload: {bottomModal: ''},
      });
  };
  const dateHandler = date => {
    setData(prv => ({...prv, due_date: date}));
  };

  const buttonEnableCondition = subTask
    ? data?.title !== '' && selectedMembers?.length > 0
    : data?.title !== '' &&
      selectedMembers?.length > 0 &&
      data?.description !== '' &&
      selectedProject;

  const leftComponent = () => {
    return (
      <Text
        style={{
          fontSize: 16,
          fontFamily: fonts.regular,
          fontWeight: 'bold',
        }}>
        {subTask ? 'Create Sub Task' : 'Create Task'}
      </Text>
    );
  };

  return (
    <Fragment>
      <TabScreenHeader {...{leftComponent}} />
      <View style={styles.container}>
        <ScrollView>
          <CustomTextInput
            value={data?.title}
            placeholder="Task"
            placeholderTextColor="gray"
            style={styles.textInput}
            container={{marginTop: 10}}
            onChangeText={text => setData(prev => ({...prev, title: text}))}
          />
          {!subTask && (
            <>
              <CustomTextInput
                multiline={true}
                numberOfLines={3}
                value={data?.description}
                placeholder="Description"
                placeholderTextColor="gray"
                textAlignVertical="top"
                style={{...styles.textInput, height: 'auto'}}
                onChangeText={text =>
                  setData(prev => ({...prev, description: text}))
                }
              />

              <TouchableOpacity
                style={styles.textInput}
                onPress={() => setModelOpen(true)}>
                <Text
                  style={{
                    position: 'absolute',
                    left: 6,
                    top: -9,
                    fontSize: 12,
                    fontWeight: '500',
                    color: 'black',
                    backgroundColor: 'white',
                    paddingHorizontal: 2,
                  }}>
                  Select date
                </Text>
                <Text>{moment(data?.due_date).format('DD MMM YY')}</Text>
              </TouchableOpacity>
            </>
          )}

          {!subTask && !isProjectSelected && (
            <View style={styles.teamTextWrapper}>
              <Text style={styles.teamText}>Select Project</Text>
              <ProjectsListing />
            </View>
          )}
          <View style={styles.teamTextWrapper}>
            <Text style={styles.teamText}>Select Members</Text>
          </View>
          <View style={styles.teamSection}>
            <SelectedMembers isFrom="CreateTask" />
          </View>
        </ScrollView>
        <PrimaryButton
          style={{
            ...styles.btnWrapper,
            ...{
              backgroundColor: buttonEnableCondition
                ? appTheme.PRIMARY_COLOR
                : appTheme.INACTIVE_COLOR,
            },
          }}
          disabled={!buttonEnableCondition}
          onPress={taskCreateHandler}
          titleStyle={styles.btnText}
          title={'Create'}
          {...{loader}}
        />

        <CustomDatePicker
          open={ModelOpen}
          intialDate={data?.due_date || new Date()}
          onClose={() => setModelOpen(false)}
          {...{newDateCallBack: dateHandler}}
        />
      </View>
    </Fragment>
  );
}
