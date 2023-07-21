import {createStackNavigator} from '@react-navigation/stack';
import React, {useState, useContext, useEffect} from 'react';
import {
  Calendar,
  Chat,
  Login,
  Onboarding,
  Project,
  Reports,
  SignUp,
  Tasks,
} from '../screens';
import {CreateProject} from '../components';
import {CreateTask, TaskView} from '../components/Task';
const Stack = createStackNavigator();
export const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Onboarding"
        component={Onboarding}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Project"
        component={Project}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Reports"
        component={Reports}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Tasks"
        component={Tasks}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateProject"
        component={CreateProject}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CreateTask"
        component={CreateTask}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="TaskView"
        component={TaskView}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
