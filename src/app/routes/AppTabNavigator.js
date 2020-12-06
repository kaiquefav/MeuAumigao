import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons, MaterialIcons, FontAwesome, FontAwesome5 } from '@expo/vector-icons';

import ProfileScreen from '../screens/ProfileScreen/ProfileScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ScheduleScreen from '../screens/ScheduleScreen/ScheduleScreen';
import MapScreen from '../screens/MapScreen/MapScreen';

const Tab = createBottomTabNavigator();

export default function AppTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Home"
            tabBarOptions={{
                activeBackgroundColor: 'rgba(0, 104, 191, 0.9)',
                inactiveBackgroundColor: 'rgba(0, 104, 191, 1)',
                activeTintColor: 'white',
                inactiveTintColor: '#999',
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
                    unmountOnBlur: true,
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
                    unmountOnBlur: true,
                }}
            />
            <Tab.Screen
                name="Schedule"
                component={ScheduleScreen}
                options={{
                    tabBarLabel: 'Schedule',
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="schedule" color={color} size={24} />
                    ),
                    unmountOnBlur: true,
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarLabel: 'Map',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="md-pin" color={color} size={24} />
                    ),
                    unmountOnBlur: true,
                }}
            />
        </Tab.Navigator>
    );
}