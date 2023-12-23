import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import TextComponent from '../components/TextComponent';

import Header from '../components/Header';
import { ScreenContainer } from '../layout';
import { getAllUsers } from '../hooks/queries/user';
import { removeStorageItem, getStorageItem } from '../services/storage';
import { useTheme } from 'styled-components/native';
import { AppContext } from '../contexts/appContext';

const navigationOptions = [
  { title: 'Mission', screen: 'Mission' },
  { title: 'Library', screen: 'RitualsLibrary' },
  { title: 'Rituals', screen: 'RitualsScreen' },
  { title: 'Partners', screen: 'PartnersScreen' },
  { title: 'Settings', screen: 'SettingsScreen' },
];

function HomeScreen({ navigation }) {
  const { appData, updateAppData } = useContext(AppContext);
  const { colors } = useTheme();

  const {
    data: usersData,
    isLoading,
    isRefetching,
    refetch,
  } = getAllUsers({
    options: {
      // enabled: !appData.isAuth,
    },
  });

  useEffect(() => {
    const checkStorage = async () => {
      const internalToken = await getStorageItem('token');
      console.log('internalToken:', internalToken);
    };
    checkStorage();
  }, []);

  const handleLogout = () => {
    removeStorageItem('token');

    updateAppData({
      isAuth: false,
    });
  };
  return (
    <ScreenContainer>
      <Header title="Home" navigation={navigation} />
      {navigationOptions.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => navigation.navigate(option.screen)}
          style={{
            marginBottom: 10,
            alignItems: 'flex-start',
            paddingLeft: 30,
          }}
        >
          <TextComponent size="big">{option.title}</TextComponent>
        </TouchableOpacity>
      ))}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 'auto',
          padding: 25,
        }}
      >
        <TouchableOpacity onPress={refetch}>
          <TextComponent size="big">Refresh</TextComponent>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleLogout}>
          <TextComponent>Logout</TextComponent>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

export default HomeScreen;
