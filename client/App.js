import React, { useState, useContext } from 'react';
import { View, SafeAreaView, Switch, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';

import { QueryClientProvider, QueryClient } from 'react-query';

import { AppProvider, AppContext } from './contexts/appContext';
import ActivityIndicatorScreen from './components/ActivityIndicator';

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
const queryClient = new QueryClient();

function Main() {
  const { appData, updateAppData } = useContext(AppContext);

  const isAppReady = true;

  if (!isAppReady) {
    return (
      <>
        <ActivityIndicatorScreen />
      </>
    );
  }

  console.log('appData in APP', appData);

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={appData.isDarkTheme ? darkTheme : lightTheme}>
        <NavigationContainer>
          <>{appData?.isAuth ? <ConnectedStack /> : <VisitorStack />}</>
        </NavigationContainer>
      </ThemeProvider>
    </QueryClientProvider>
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
