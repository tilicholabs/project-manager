import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useLayoutEffect,
} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import shortid from 'shortid';
import styles from './projectsStyle';
import {AppContext} from '../../context';
import {
  TabScreenHeader,
  ProjectCard,
  EmptyListComponent,
  CreateProject,
} from '../../components';
import {combineData} from '../../utils/DataHelper';
import ActionButton from 'react-native-action-button';
import appTheme from '../../constants/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {Models} from '../../api/firebaseModel';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {getScreenParent} from '../../utils/NavigationHelper';
import {useFocusEffect} from '@react-navigation/core';
import {Loader} from '../../components/Loader';
import {dataFormatter} from '../../utils/DataFormatter';
import {useIsFocused} from '@react-navigation/native';
import {projectModel} from '../../api/projectModel';
import {fonts} from '../../constants/fonts';

export function Projects({navigation}) {
  const tabs = ['All', 'In Progress', 'Completed'];

  const {state, dispatch, user} = useContext(AppContext);
  const {projects, bottomModel} = state;
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({activeTab: 'All'});

  const [projectData, setProjectData] = useState([]);

  const allProjectData = useRef([]);

  const isFocused = useIsFocused();

  const toggleTab = tab => {
    if (tab === 'Completed') {
      const result = allProjectData?.current.filter(item => {
        return item?.status === 'Completed';
      });
      setProjectData(result);
    } else if (tab === 'In Progress') {
      const result = allProjectData?.current.filter(item => {
        return item?.status === 'In Progress';
      });

      setProjectData(result);
    } else {
      setProjectData(allProjectData?.current);
    }
    setData(combineData(data, {activeTab: tab}));
  };

  const isActiveTab = tab => {
    const value = data?.activeTab === tab;
    return value;
  };

  const renderProjectInfo = ({item}) => {
    return (
      <ProjectCard
        project={item}
        key={shortid.generate()}
        navigation={navigation}
      />
    );
  };

  const getTasks = async id => {
    const data = (await Models.tasks.getProjectTasks(id)).docs;
    return data;
  };

  const getCompletedTasks = async id => {
    const data = (await Models.tasks.getCompletedTasks(id)).docs;
    return data;
  };

  const api = async () => {
    const data = (await Models.projects.getMembers()).docs;
    dispatch({
      type: 'setMembers',
      payload: data,
    });
  };

  const getProjects = async () => {
    setLoading(true);
    // const res = await Models?.projects?.getUserProjects(user?.id);
    const res = await projectModel?.getUserProjects(user?.id);
    allProjectData.current = [...res] || [];

    toggleTab(data?.activeTab);
    await api();
    setLoading(false);
  };

  useEffect(() => {
    if (isFocused) {
      getProjects();
    }
  }, [isFocused]);

  const leftComponent = () => (
    <Text
      style={{
        fontSize: 20,
        fontWeight: 'bold',
        fontFamily: fonts.regular,
      }}>
      Projects
    </Text>
  );

  return (
    <SafeAreaView style={styles.container}>
      <TabScreenHeader {...{leftComponent, isBackButtonPresent: true}} />
      <ActionButton
        buttonColor={appTheme?.PRIMARY_COLOR}
        style={{zIndex: 1}}
        offsetX={20}
        buttonTextStyle={{fontSize: 30}}
        onPress={() => {
          navigateToNestedRoute(
            getScreenParent('CreateProject'),
            'CreateProject',
            {},
          );
        }}
      />
      {loading ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Loader />
        </View>
      ) : (
        <View style={styles.projectsBody}>
          <View style={styles.projectsTabs}>
            {tabs?.map((tab, index) => (
              <TouchableOpacity
                style={[
                  styles.projectTab,
                  isActiveTab(tab) ? styles.activeProjectTab : null,
                ]}
                onPress={() => toggleTab(tab)}
                key={shortid.generate(index)}>
                <Text
                  style={[
                    styles.projectTabText,
                    isActiveTab(tab)
                      ? styles.activeProjectTabText
                      : styles.inActiveProjectTabText,
                  ]}>
                  {tab}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {projects?.length > 0 ? (
            <FlatList
              data={projectData}
              keyExtractor={(item, index) => shortid.generate(index)}
              renderItem={renderProjectInfo}
              horizontal={false}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <EmptyListComponent />
          )}
        </View>
      )}
    </SafeAreaView>
  );
}
