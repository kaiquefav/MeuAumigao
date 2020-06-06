import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';

import SplashScreen from '../screens/SplashScreen/SplashScreen';
import TutorialScreens from '../screens/TutorialScreens/TutorialScreens';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import PreferencesScreen from '../screens/PreferencesScreen/PreferencesScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import PreferencesProfileScreen from '../screens/PreferencesProfileScreen/PreferencesProfileScreen';

import AppTabNavigator from './AppTabNavigator';

const Stack = createStackNavigator();

function appNavigator() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Splash"
        component={SplashScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />

      <Stack.Screen
        name="Tutorial"
        component={TutorialScreens}
        options={{ gestureEnabled: false, headerShown: false }}
      />

      <Stack.Screen
        name="BottomTab"
        component={AppTabNavigator}
        options={{ gestureEnabled: false, headerShown: false }}
      />

      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />

      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ gestureEnabled: false, headerShown: true }}
      />

      <Stack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ gestureEnabled: false, headerShown: true }}
      />

      <Stack.Screen
        name="PreferencesProfile"
        component={PreferencesProfileScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />

      <Stack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />

      <Stack.Screen
        name="Preferences"
        component={PreferencesScreen}
        options={{ gestureEnabled: false, headerShown: false }}
      />

    </Stack.Navigator>
  );
}

export default appNavigator;