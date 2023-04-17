import React, { useState, useContext } from 'react';
import { View, SafeAreaView, Switch, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import Text from '../components/Text';
import Button from '../components/Button';
import SettingRow from '../components/SettingRow';

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

  const [inputValue, setInputValue] = useState('');
  return (
    <Container>
      {/* <Text isBold size="big">
        Welcome to Rituals
      </Text> */}

      <SettingRow icon="notifications-outline" text="Activate notifications" />
      <SettingRow icon="moon-outline" text="Dark theme" />
      <SettingRow text="Dark theme" />

      {/* <Text>{JSON.stringify(appData)}</Text> */}

      {/* <Input
        keyboardType="email-address"
        placeholder="Whatever"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        errorMessage="The username is already taken"
        value={inputValue}
        // disabled
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
      /> */}
    </Container>
  );
};

export default WelcomeScreen;
