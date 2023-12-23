import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CardStyleInterpolators } from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import MissionScreen from '../screens/MissionScreen';
import RitualsLibrary from '../screens/RitualsLibrary';
import RitualsScreen from '../screens/RitualsScreen';
import PartnersScreen from '../screens/PartnersScreen';
import SettingsScreen from '../screens/SettingsScreen';
import CreateUpdateRitual from '../components/CreateUpdateRitual';

import CreateRitualScreen from '../screens/CreateRitualScreen';
import RitualScreen from '../screens/RitualScreen';
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const ConnectedStack = () => {
  const { colors } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        gestureEnabled: true,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
      headerMode="none"
    >
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
              name="Mission"
              component={MissionScreen}
              options={{
                tabBarLabel: 'Mission',
                tabBarIcon: ({ color, size, focused }) => (
                  <FontAwesome5 name="scroll" size={focused ? 24 : 22} color={color} />
                ),
              }}
            />

            <Tab.Screen
              name="RitualsLibrary"
              component={RitualsLibrary}
              options={{
                tabBarLabel: 'Library',
                tabBarIcon: ({ color, size, focused }) => (
                  <Ionicons
                    name={`library${focused ? '' : '-outline'}`}
                    size={focused ? 24 : 22}
                    color={color}
                  />
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
              name="PartnersScreen"
              component={PartnersScreen}
              options={{
                tabBarLabel: 'Partners',
                tabBarIcon: ({ color, size, focused }) => (
                  <>
                    <Ionicons
                      name={`person${focused ? '' : '-outline'}`}
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
      <Stack.Screen name="RitualScreen" component={RitualScreen} />
      <Stack.Screen name="CreateUpdateRitual" component={CreateUpdateRitual} />
    </Stack.Navigator>
  );
};
export default ConnectedStack;
