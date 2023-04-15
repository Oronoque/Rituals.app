import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeProvider, useTheme } from 'styled-components/native';

import { lightTheme } from './theme';

import Button from './components/Button';
import Text from './components/Text';

export const Container = styled(View)`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

function LoginScreen() {
  return (
    <Container>
      <Text>Login Screen</Text>
    </Container>
  );
}
function WelcomeScreen({ navigation }) {
  console.log('navigation:', navigation);

  const { colors } = useTheme();

  return (
    <Container>
      <Text isBold size="small">
        Welcome to Rituals
      </Text>

      <Text isBold size="medium">
        Welcome to Rituals
      </Text>

      <Text isBold size="big">
        Welcome to Rituals
      </Text>

      {/* <Button
        title="Hello lucas"
        width={150}
        size="medium"
        customStyle={{ height: 74, backgroundColor: colors.orange }}
        onPress={() => {
          alert('hello');
        }}
      />
      <Button
        title="Hello lucas"
        bgColor="red"
        width={150}
        size="medium"
        customStyle={{ height: 74 }}
        onPress={() => {
          alert('hello2');
        }}
      /> */}
    </Container>
  );
}
function RegisterScreen() {
  return (
    <Container>
      <Text>Register Screen</Text>
    </Container>
  );
}

function HomeScreen({ navigation }) {
  return (
    <Container>
      <Text>Home Screen</Text>
    </Container>
  );
}

function SettingsScreen() {
  return (
    <Container>
      <Text>Settings Screen</Text>
    </Container>
  );
}

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const colors = {
  red: '#BF212F',
  green: '#009b54',
  orange: '#F9A73E',
  black: '#0e1111',
  white: 'white',
};

function MyTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />

      <Tab.Screen
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
              // tabBarStyle: {
              //   height: 85,
              // },
            }}
            initialRouteName="HomeStack"
          >
            <Tab.Screen
              name="UsersStack"
              component={HomeScreen}
              options={{
                tabBarLabel: 'Jouer',
                tabBarIcon: ({ color, size, focused }) => (
                  <>
                    <Ionicons
                      name={`tennisball${focused ? '' : '-outline'}`}
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
                tabBarLabel: 'Paramètres',
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
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Login" component={LoginScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
