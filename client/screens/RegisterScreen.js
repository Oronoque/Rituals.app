import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { View } from 'react-native';

import axios from 'axios';

import { useTheme } from 'styled-components/native';
// import Ionicons from '@expo/vector-icons/Ionicons';
import { Ionicons } from '@expo/vector-icons';

import Text from '../components/Text';
import Button from '../components/Button';

import { ScreenContainer } from '../layout';

function RegisterScreen() {
  const { colors } = useTheme();

  // add second password "passwordConfirm"
  const [data, setData] = useState({
    email: null,
    isEmailValid: null,
    password: null,
    passwordConfirm: null,
    isPasswordValid: null,
  });

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://localhost:3009/api/register', {
        email: data.email,
        username: data.username,
        password: data.password,
        passwordConfirm: data.passwordConfirm,
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScreenContainer>
      <Text>Register Screen</Text>

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
        isDisabled={
          !data.isEmailValid || !data.isPasswordValid || data.password !== data.passwordConfirm
        }
        isNaked
        title="Register"
      />
      <View style={{ marginTop: 12 }}>
        <Text isBold>Create Account</Text>
      </View>
    </ScreenContainer>
  );
}

export default RegisterScreen;
