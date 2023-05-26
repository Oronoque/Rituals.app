import React, { useContext, useEffect, useState } from 'react';
import { View } from 'react-native';

import Text from '../components/Text';
import Button from '../components/Button';
import Header from '../components/Header';
import Loader from '../components/Loader';
import Modal from '../components/Modal';
import CreateUpdateRitual from '../components/CreateUpdateRitual';

import { ScreenContainer } from '../layout';
import { getAllUsers } from '../hooks/queries/user';
import { removeStorageItem, getStorageItem } from '../services/storage';

import { AppContext } from '../contexts/appContext';

function HomeScreen() {
  const [isRitualModalOpen, setIsRitualModalOpen] = useState(false);

  const { appData, updateAppData } = useContext(AppContext);

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
      <Header title="Home" />

      {isLoading ? (
        <Loader />
      ) : usersData?.length === 0 ? (
        <View style={{ borderWidth: 1 }}>
          <Text>No users found</Text>
        </View>
      ) : (
        usersData?.map((user) => {
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

      <Button
        title="Create ritual"
        onPress={() => {
          setIsRitualModalOpen(true);
        }}
      />

      <Button title="Refresh" onPress={refetch} />

      <Button title="Logout" onPress={handleLogout} customStyle={{ backgroundColor: 'red' }} />

      <Modal
        height="80%"
        onClose={() => {
          setIsRitualModalOpen(false);
        }}
        isOpen={isRitualModalOpen}
        withCloseButton={true}
      >
        {<CreateUpdateRitual />}
      </Modal>
    </ScreenContainer>
  );
}

export default HomeScreen;
