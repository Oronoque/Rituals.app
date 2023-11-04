import React, { useState, useContext, useEffect } from 'react';
import Constants from 'expo-constants';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from 'styled-components/native';
import axios from 'axios';
import Toast from 'react-native-toast-message';
import { QueryClientProvider, QueryClient } from 'react-query';
import {
  useFonts,
  Montserrat_400Regular,
  Montserrat_600SemiBold,
  Montserrat_300Light,
  Montserrat_400Regular_Italic,
} from '@expo-google-fonts/montserrat';

import { AppProvider, AppContext } from './contexts/appContext';
import ActivityIndicatorScreen from './components/ActivityIndicator';

import { lightTheme, darkTheme } from './theme';

import VisitorStack from './stacks/VisitorStack';
import ConnectedStack from './stacks/ConnectedStack';

import { getStorageItem } from './services/storage';
import { registerForPushNotificationsAsync } from './utils/notification';
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

  let [fontsLoaded] = useFonts({
    Montserrat_400Regular,
    Montserrat_600SemiBold,
    Montserrat_300Light,
    Montserrat_400Regular_Italic,
  });
  console.log('error', Constants.expoConfig.extra.eas.projectId);

  useEffect(() => {
    const saveUserToken = () => {
      registerForPushNotificationsAsync().then((token) => {
        const finalExpoToken = token || 'tokenEmulator';
        console.log('token', finalExpoToken);

        updateAppData({
          expoToken: finalExpoToken,
        });
      });
    };

    if (!appData.expoToken) {
      saveUserToken();
    }
  }, [appData]);

  useEffect(() => {
    const checkStorageToken = async () => {
      try {
        const internalToken = await getStorageItem('token');

        if (internalToken) {
          const { data } = await axios.post(`https://3dfa-173-209-170-146.ngrok.io/api/auth/ping`, {
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

  if (!isAppReady || !fontsLoaded) {
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
          <>{appData?.isAuth || true ? <ConnectedStack /> : <VisitorStack />}</>
          <Toast position="top" topOffset={80} />
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
