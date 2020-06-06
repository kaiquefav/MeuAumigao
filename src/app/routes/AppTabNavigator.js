import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons, MaterialIcons, FontAwesome } from '@expo/vector-icons';

import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import PreferencesScreen from '../screens/PreferencesScreen/PreferencesScreen';

const Tab = createBottomTabNavigator();

export default function AppTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeBackgroundColor: 'white',
                inactiveBackgroundColor: 'white',
                activeTintColor: 'rgb(0, 104, 191)',
                inactiveTintColor: '#ababab',
                showLabel: false,
            }}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="user" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="pets" color={color} size={24} />
                    ),
                }}
            />
            <Tab.Screen
                name="Schedule"
                component={PreferencesScreen}
                options={{
                    tabBarLabel: 'Schedule',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="schedule" color={color} size={24} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}