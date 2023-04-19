import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import SettingsScreen from '../screens/SettingsScreen';
import RitualsScreen from '../screens/RitualsScreen';
import RitualScreen from '../screens/RitualScreen';
import CreateRitualScreen from '../screens/CreateRitualScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ConnectedStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="TabNavigator"
        options={{
          headerShown: false,
        }}
      >
        {(props) => (
          <Tab.Navigator
            {...props}
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
              name="RitualsScreen"
              component={RitualsScreen}
              options={{
                tabBarLabel: 'Rituals',
                tabBarIcon: ({ color, size, focused }) => (
                  <>
                    <Ionicons
                      name={`list${focused ? '' : '-outline'}`}
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
        )}
      </Stack.Screen>

      <Stack.Screen name="CreateRitual" component={CreateRitualScreen} />
    </Stack.Navigator>
  );
};
export default ConnectedStack;
