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
import {Modals} from '../../api/firebaseModal';
import {navigateToNestedRoute} from '../../navigators/RootNavigation';
import {getScreenParent} from '../../utils/NavigationHelper';
import {useFocusEffect} from '@react-navigation/core';
import {Loader} from '../../components/Loader';

export function Projects({navigation}) {
  const tabs = ['All', 'Ongoing', 'Completed'];

  const {state, dispatch} = useContext(AppContext);
  const {projects, bottomModal} = state;
  const [loading, setLoading] = useState(true);

  const [data, setData] = useState({activeTab: 'All'});

  const [projectData, setProjectData] = useState([]);

  const allProjectData = useRef(null);

  const toggleTab = tab => {
    if (tab === 'Completed') {
      const result = allProjectData?.current.filter(item => {
        return item?.status === 'completed';
      });
      setProjectData(result);
    } else if (tab === 'Ongoing') {
      const result = allProjectData?.current.filter(item => {
        return item?.status === 'ongoing';
      });
      setProjectData(result);
    } else {
      setProjectDataFun(allProjectData?.current);
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
    const data = (await Modals.tasks.getProjectTasks(id)).docs;
    return data;
  };

  const getCompletedTasks = async id => {
    const data = (await Modals.tasks.getCompletedTasks(id)).docs;
    return data;
  };

  const percent = async id => {
    const tasks = await (await getTasks(id)).length;
    const completedTasks = await (await getCompletedTasks(id)).length;
    if (tasks) {
      return Number((completedTasks / tasks) * 100);
    } else {
      return 0;
    }
  };

  const api = async () => {
    const data = (await Modals.projects.getMembers()).docs;
    dispatch({
      type: 'setMembers',
      payload: data,
    });
  };

  const getProjects = async () => {
    const data = await Modals.projects.get();
    const result = await addPercentParameter(data);
    setLoading(false);
    return result;
  };

  const addPercentParameter = async arr => {
    const result = await Promise.all(
      arr.map(async item => {
        const percentage = await percent(item?.id);
        return {...item, percent: percentage};
      }),
    );

    return result;
  };

  useEffect(() => {
    api();
  }, []);

  const setProjectDataFun = data => {
    setProjectData(data);
  };

  const getProjectsData = async () => {
    const result = await getProjects();

    allProjectData.current = result;
    setProjectDataFun(result);
  };

  const leftComponent = () => (
    <Text style={{fontSize: 20, fontWeight: 'bold'}}>Projects</Text>
  );

  useEffect(() => {
    if (bottomModal === null) {
      getProjectsData();
    }
  }, [bottomModal]);

  useFocusEffect(() => {
    getProjectsData();
  });

  return loading ? (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Loader />
    </View>
  ) : (
    <SafeAreaView style={styles.container}>
      {/* <ActionButton buttonColor={appTheme?.PRIMARY_COLOR} style={{zIndex: 1}}>
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="New Task"
          useNativeDriver={false}
          onPress={() => handleCreateTask()}>
          <MaterialCommunityIcons name={'clock-outline'} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="New Project"
          useNativeDriver={false}
          onPress={() => handleCreateProject()}>
          <MaterialCommunityIcons name={'file-check-outline'} />
        </ActionButton.Item>
      </ActionButton> */}
      <TabScreenHeader {...{leftComponent, isBackButtonPresent: true}} />
      <ActionButton
        buttonColor={appTheme?.PRIMARY_COLOR}
        style={{zIndex: 1}}
        onPress={() => {
          navigateToNestedRoute(
            getScreenParent('CreateProject'),
            'CreateProject',
            {},
          );
        }}
      />

      {/* <TabScreenHeader
        leftComponent={() => <Text style={styles.headerTitle}>Projects</Text>}
        isSearchBtnVisible={true}
        isMoreBtnVisible={true}
      /> */}
      <View style={styles.projectsBody}>
        <View style={styles.projectsTabs}>
          {tabs?.map(tab => (
            <TouchableOpacity
              style={[
                styles.projectTab,
                isActiveTab(tab) ? styles.activeProjectTab : null,
              ]}
              onPress={() => toggleTab(tab)}
              key={shortid.generate()}>
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
            keyExtractor={(item, index) => shortid.generate()}
            renderItem={renderProjectInfo}
            horizontal={false}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyListComponent />
        )}
      </View>
    </SafeAreaView>
  );
}
