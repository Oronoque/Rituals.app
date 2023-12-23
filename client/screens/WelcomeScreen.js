import React, { useState, useContext, useEffect } from 'react';
import { View, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useTheme } from 'styled-components/native';

import TextComponent from '../components/TextComponent';

import Button from '../components/Button';

import { getStorageItem } from '../services/storage';

import { AppContext } from '../contexts/appContext';

export const Container = styled(View)`
  flex: 1;
  background-color: white;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const WelcomeScreen = ({ navigation, value }) => {
  const { colors } = useTheme();
  const { appData, updateAppData } = useContext(AppContext);

  console.log('navigation:', navigation);

  useEffect(() => {
    const checkStorage = async () => {
      const internalToken = await getStorageItem('token');
      console.log('internalToken:', internalToken);
    };
    checkStorage();
  }, []);

  return (
    <Container>
      <TextComponent>WELCOME</TextComponent>
      <Button
        title="Create an account"
        onPress={() => {
          navigation.push('Register');
        }}
      />
      <Button
        title="Login"
        onPress={() => {
          navigation.push('Login');
        }}
      />
    </Container>
  );
};

export default WelcomeScreen;
