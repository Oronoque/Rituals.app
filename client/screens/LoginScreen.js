import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { TouchableOpacity, View } from 'react-native';

import { useTheme } from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Text from '../components/Text';
import Button from '../components/Button';

import { ScreenContainer } from '../layout';
import { login } from '../hooks/queries/user';

function LoginScreen({ navigation }) {
  const { colors } = useTheme();
  const { mutate: loginMutation, isSuccess, isError, error } = login();
  console.log('isError:', isError);

  const [data, setData] = useState({
    email: null,
    isEmailValid: null,
    password: null,
    isPasswordValid: null,
  });

  const handleLogin = () => {
    // Perform the login logic here
    // If the login is successful, set the loggedIn state to true
    // setLoggedIn(true);
    loginMutation({ email: data.email, password: data.password });
  };

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return (
    <ScreenContainer>
      <Text>Login Screen</Text>

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
        // errorMessage={data.isPasswordValid === false ? 'The password is invalid' : null}
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

      {isError ? (
        <View style={{ height: 40 }}>
          <Text textColor="red">Login failed</Text>
        </View>
      ) : null}

      {/* <Button
      isDisabled={!data.isEmailValid || !data.isPasswordValid}
      isNaked title="Login"
      style={{
        backgroundColor: !data.isEmailValid || !data.isPasswordValid
        ? "rgba(255, 255, 255, 0.5)" // light color with 50% opacity
        : undefined // default color
      }} /> */}
      <TouchableOpacity
        onPress={handleLogin}
        disabled={!data.isEmailValid || !data.isPasswordValid}
        style={{
          backgroundColor:
            !data.isEmailValid || !data.isPasswordValid
              ? 'rgba(255, 255, 255, 0.5)' // light color with 50% opacity
              : undefined, // default color
          paddingVertical: 10,
          alignItems: 'center',
        }}
      >
        <Text style={{ fontWeight: 'bold' }}>Login</Text>
      </TouchableOpacity>

      {/* <View style={{ marginTop: 12 }}>
        <Text isBold>Already an account ?</Text> */}
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.push('Register');
          }}
          disabled={!data.isEmailValid || !data.isPasswordValid}
          style={{
            backgroundColor:
              !data.isEmailValid || !data.isPasswordValid
                ? 'rgba(255, 255, 255, 0.5)' // light color with 50% opacity
                : undefined, // default color
            paddingVertical: 10,
            alignItems: 'center',
          }}
        >
          <Text style={{ fontWeight: 'bold' }}>Register new account</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
}

export default LoginScreen;
