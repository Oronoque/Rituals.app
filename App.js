import React, { useState, useContext } from 'react';
import { View, SafeAreaView, Switch, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { AppProvider, AppContext } from './contexts/appContext';

import { lightTheme, darkTheme } from './theme';

import Text from './components/Text';

import VisitorStack from './stacks/VisitorStack';
import ConnectedStack from './stacks/ConnectedStack';

export const Container = styled(View)`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

export default function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const { appData, updateAppData } = useContext(AppContext);

  const isAppReady = true;

  if (!isAppReady) {
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <AppProvider>
      <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
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

            <View
              style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}
            >
              <Text>Is dark theme:</Text>
              <Switch
                value={isDarkTheme}
                onValueChange={(value) => {
                  setIsDarkTheme(value);
                }}
              />
            </View>
          </SafeAreaView>
          {isConnected ? <ConnectedStack /> : <VisitorStack />}
        </NavigationContainer>
      </ThemeProvider>
    </AppProvider>

);
}
