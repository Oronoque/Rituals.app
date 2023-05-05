import React, { useState, useContext } from 'react';
import { View, SafeAreaView, Switch, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { AppProvider, AppContext } from './contexts/appContext';
import ActivityIndicatorScreen from './components/ActivityIndicator';
import ThemeSwitch from './components/ThemeSwitch';

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

function Main() {
  const [isConnected, setIsConnected] = useState(false);

  const { appData, updateAppData } = useContext(AppContext);

  const isAppReady = true;

  if (!isAppReady) {
    return (
      <div>
        <ActivityIndicatorScreen />
      </div>
    );
  }

  return (
    <AppProvider>
      <div>
        <ThemeSwitch />
      </div>
    </AppProvider>
  );
}

const App = () => {
  return (
    <AppProvider>
      <Main />
    </AppProvider>
  );
};

export default App;
