import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Tab = createBottomTabNavigator();

const ConnectedStack = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      backBehavior="none"
      screenOptions={{
        headerShown: false,
        tabBarActiveBackgroundColor: colors.background,
        tabBarInactiveBackgroundColor: colors.background,
        tabBarActiveTintColor: colors.textSecondary,

        tabBarIconStyle: {
          marginTop: 2,
        },
        tabBarLabelStyle: {
          marginTop: 2,
          marginBottom: 6,
        },
      }}
      initialRouteName="HomeScreen"
    >
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size, focused }) => (
            <>
              <Ionicons
                name={`home${focused ? '' : '-outline'}`}
                size={focused ? 24 : 22}
                color={color}
              />
            </>
          ),
        }}
      />

      <Tab.Screen
        name="SettingsStack"
        component={SettingsScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color, size, focused }) => (
            <Ionicons
              name={`settings${focused ? '' : '-outline'}`}
              size={focused ? 24 : 22}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};
export default ConnectedStack;
