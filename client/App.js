import React, { useState, useContext, useEffect } from 'react';
import { View, SafeAreaView, Switch, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import axios from 'axios';

import { QueryClientProvider, QueryClient } from 'react-query';

import { AppProvider, AppContext } from './contexts/appContext';
import ActivityIndicatorScreen from './components/ActivityIndicator';

import { lightTheme, darkTheme } from './theme';

import Text from './components/Text';

import VisitorStack from './stacks/VisitorStack';
import ConnectedStack from './stacks/ConnectedStack';

import { getStorageItem } from './services/storage';

import { API_URL } from '@env';

export const Container = styled(View)`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
`;

const queryClient = new QueryClient();

function Main() {
  const { appData, updateAppData } = useContext(AppContext);

  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const checkStorageToken = async () => {
      try {
        const internalToken = await getStorageItem('token');

        if (internalToken) {
          const { data } = await axios.post(`${API_URL}/ping`, {
            token: internalToken,
          });

          if (data.success) {
            updateAppData({
              isAuth: true,
            });
          }
        }
      } catch (error) {
        console.log('error:', error);
      } finally {
        setIsAppReady(true);
      }
    };

    checkStorageToken();
  }, []);

  if (!isAppReady) {
    return (
      <>
        <ActivityIndicatorScreen />
      </>
    );
  }

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
