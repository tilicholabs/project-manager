import React, {useEffect, useReducer, useState} from 'react';
import {SafeAreaView, StyleSheet, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {Provider as PaperProvider} from 'react-native-paper';
import {MenuProvider} from 'react-native-popup-menu';
import {BottomModalContainer} from './components';
import AppStack from './navigators/Stack';
import initialState from './store/state';
import reducer from './store/reducer';
import {AppContext} from './context';
import {navigationRef} from './navigators/RootNavigation';
import {Modals} from './api/firebaseModal';
import firestore from '@react-native-firebase/firestore';
import {dataFormatter} from './utils/DataFormatter';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [subTasks, setSubTasks] = useState([]);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [selectedTask, setSelectedTask] = useState();
  const [selectedProject, setSelectedProject] = useState();
  const [members, setMembers] = useState([]);
  const [user, setUser] = useState();
  const [isProjectSelected, setIsProjectSelected] = useState(false);

  const getMembers = async () => {
    const data = await Modals.users.get();
    setMembers(data);
    firestore()
      .collection('users')
      .onSnapshot(snap => {
        const usersData = dataFormatter(snap);
        setMembers(usersData);
      });
  };

  useEffect(() => {
    getMembers();
  }, []);

  return (
    <AppContext.Provider
      value={{
        state,
        dispatch,
        subTasks,
        setSubTasks,
        selectedMembers,
        setSelectedMembers,
        selectedTask,
        setSelectedTask,
        selectedProject,
        setSelectedProject,
        members,
        setMembers,
        user,
        setUser,
        isProjectSelected,
        setIsProjectSelected,
      }}>
      <PaperProvider>
        <MenuProvider>
          <StatusBar barStyle="light-content" />
          <SafeAreaView style={styles.areaContainer}>
            <NavigationContainer ref={navigationRef}>
              <AppStack />
            </NavigationContainer>
            {state?.bottomModal ? <BottomModalContainer /> : null}
          </SafeAreaView>
        </MenuProvider>
      </PaperProvider>
    </AppContext.Provider>
  );
};

const styles = StyleSheet.create({
  areaContainer: {
    flex: 1,
  },
});

export default App;
