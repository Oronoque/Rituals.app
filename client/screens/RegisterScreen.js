import React, { useState, useContext, useEffect } from 'react';
import { Input } from 'react-native-elements';
import { View } from 'react-native';

import axios from 'axios';

import { useTheme } from 'styled-components/native';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

import TextComponent from '../components/TextComponent';
import Button from '../components/Button';
import { AppContext } from '../contexts/appContext';

import { register } from '../hooks/queries/user';

import { ScreenContainer } from '../layout';

function RegisterScreen() {
  const { colors } = useTheme();
  const { mutate: registerMutation, isSuccess, isError, error } = register();
  const { appData, updateAppData } = useContext(AppContext);

  const [errorState, setErrorState] = useState();
  // add second password "passwordConfirm"
  const [data, setData] = useState({
    email: null,
    isEmailValid: null,
    password: null,
    passwordConfirm: null,
    isPasswordValid: null,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister2 = async () => {
    registerMutation({
      email: data.email,
      password: data.password,
    });
  };

  useEffect(() => {
    if (error?.dot?.dot === 'toto') {
      // setErrorState ('email_already exists');
    }
    if (error?.dot?.dot === 'toto') {
      // setErrorState ('username_already exists');
    }
  }, [error]);

  console.log('error', error);
  console.log('hey');

  return (
    <ScreenContainer>
      <TextComponent>Register Screen</TextComponent>

      <Input
        keyboardType="email-address"
        placeholder="Type your email"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        value={data.email}
        label="Email"
        inputStyle={{
          color: colors.text,
          fontSize: 18,
        }}
        errorMessage={errorState ? errorState : null}
        onChangeText={(value) => {
          return setData({
            ...data,
            email: value,
            isEmailValid: emailRegex.test(value),
          });
        }}
        leftIcon={<Ionicons name="mail" size={16} color={colors.text} style={{ marginRight: 8 }} />}
        rightIcon={
          data.isEmailValid === null ? null : data.isEmailValid ? (
            <Ionicons
              name="ios-checkmark-sharp"
              size={26}
              color={colors.green}
              style={{ fontWeight: 'bold' }}
            />
          ) : (
            <Ionicons
              name="close-sharp"
              size={26}
              color={colors.red}
              style={{ fontWeight: 'bold' }}
            />
          )
        }
      />
      <Input
        secureTextEntry={true}
        placeholder="Password"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        value={data.password}
        label="Password"
        inputStyle={{
          color: colors.text,
          fontSize: 18,
        }}
        onChangeText={(value) => {
          return setData({
            ...data,
            password: value,
            isPasswordValid: value?.length > 3,
          });
        }}
        leftIcon={
          <Ionicons
            name="lock-closed-outline"
            size={16}
            color={colors.text}
            style={{ marginRight: 8 }}
          />
        }
      />

      <Input
        secureTextEntry={true}
        placeholder="confirm password"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="none"
        // errorMessage={data.isPasswordValid === false ? 'The password is invalid' : null}
        value={data.passwordConfirm}
        label="Password Confirm"
        inputStyle={{
          color: colors.text,
          fontSize: 18,
        }}
        onChangeText={(value) => {
          return setData({
            ...data,
            passwordConfirm: value,
            isPasswordValid: data.password === value,
          });
        }}
        leftIcon={
          <Ionicons
            name="lock-closed-outline"
            size={16}
            color={colors.text}
            style={{ marginRight: 8 }}
          />
        }
      />

      {/* disable button until passwords match */}
      <Button
        onPress={handleRegister2}
        isDisabled={
          !data.isEmailValid || !data.isPasswordValid || data.password !== data.passwordConfirm
        }
        isNaked
        title="Register"
      />
      <View style={{ marginTop: 12 }}>
        <TextComponent isBold>Create Account</TextComponent>
      </View>
    </ScreenContainer>
  );
}

export default RegisterScreen;
