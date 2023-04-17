import React, { useState } from 'react';
import { View, SafeAreaView, Switch, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import { ThemeProvider } from 'styled-components/native';
import { Input } from 'react-native-elements';

import { lightTheme, darkTheme } from './theme';

import Button from './components/Button';
import Text from './components/Text';

import RegisterScreen from './screens/RegisterScreen';
import SettingsScreen from './screens/SettingsScreen';
import LoginScreen from './screens/LoginScreen';

export const Container = styled(View)`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

function WelcomeScreen({ navigation }) {
  console.log('navigation:', navigation);

  const [inputValue, setInputValue] = useState('');
  return (
    <Container>
      <Text isBold size="big">
        Welcome to Rituals
      </Text>

      <Input
        keyboardType="email-address"
        placeholder="Whatever"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        errorMessage="The username is already taken"
        value={inputValue}
        disabled
        label="I am a label"
        inputStyle={{
          color: colors.text,
          fontSize: 18,
        }}
        onChangeText={(text) => {
          return setInputValue({
            text,
          });
        }}
        leftIcon={<Ionicons name="mail" size={16} color={colors.text} style={{ marginRight: 8 }} />}
        rightIcon={
          // <Ionicons
          //   name="ios-checkmark-sharp"
          //   size={26}
          //   color={colors.green}
          //   style={{ fontWeight: 'bold' }}
          // />
          <Ionicons
            name="close-sharp"
            size={26}
            color={colors.red}
            style={{ fontWeight: 'bold' }}
          />
        }
        // rightIcon={renderValidIcon(value.isEmailValid)}
      />

      <Button
        title="Login"
        onPress={() => {
          navigation.navigate('Login');
        }}
        customStyle={{ marginBottom: 30, marginTop: 30 }}
      />
      <Button
        title="Register"
        onPress={() => {
          navigation.navigate('Register');
        }}
      />
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

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const colors = {
  red: '#BF212F',
  green: '#009b54',
  orange: '#F9A73E',
  black: '#0e1111',
  white: 'white',
};

function ConnectedStack() {
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
}

const VisitorStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
    </Stack.Navigator>
  );
};

export default function App() {
  const [isConnected, setIsConnected] = useState(false);

  const isAppReady = true;

  if (!isAppReady) {
    return (
      <SafeAreaView style={{ borderWidth: 4, flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <ThemeProvider theme={lightTheme}>
      <NavigationContainer>
        <SafeAreaView>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
          >
            <Text>Toggle authentication:</Text>
            <Switch
              value={isConnected}
              onValueChange={(value) => {
                setIsConnected(value);
                console.log('value:', value);
              }}
            />
          </View>
        </SafeAreaView>
        {isConnected ? <ConnectedStack /> : <VisitorStack />}
      </NavigationContainer>
    </ThemeProvider>
  );
}
