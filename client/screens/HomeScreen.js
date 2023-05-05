import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { View } from 'react-native';

import { useQuery } from 'react-query';

import Text from '../components/Text';
import Button from '../components/Button';
import Header from '../components/Header';
import Loader from '../components/Loader';

import { ScreenContainer } from '../layout';
import { getAllUsers } from '../hooks/queries/user';

import { AppContext } from '../contexts/appContext';

function HomeScreen() {
  const { appData, updateAppData } = useContext(AppContext);

  const {
    data: users,
    isLoading,
    refetch,
    isRefetching,
  } = getAllUsers({
    options: {
      refetchInterval: 1000,
      // enabled: false,
    },
  });

  const handleLogout = () => {
    updateAppData({
      isAuth: false,
    });
  };

  return (
    <ScreenContainer>
      <Header title="Homescreen" />

      {isLoading ? (
        <Loader />
      ) : users?.length === 0 ? (
        <View style={{ borderWidth: 1 }}>
          <Text>No users found</Text>
        </View>
      ) : (
        users?.map((user) => {
          return (
            <View
              key={user.id}
              style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%' }}
            >
              <Text>{user.id}</Text>
              <Text>{user.username}</Text>
              <Text>{user.email}</Text>
            </View>
          );
        })
      )}

      <Button title="Refresh" onPress={refetch} />
      <Button title="Logout" onPress={handleLogout} customStyle={{ backgroundColor: 'red' }} />
    </ScreenContainer>
  );
}

export default HomeScreen;
