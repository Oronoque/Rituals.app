import React, { useState, useRef } from 'react';
import { View, KeyboardAvoidingView, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { Input } from 'react-native-elements';

const InputNetwork = ({
  colors,
  value,
  icon,
  onChange,
  placeholder,
  onFocus,
  rightIcon,
  errorMessage,
  disabled = false,
}) => {
  return (
    <View
      style={{
        height: 48,
        borderRadius: 8,
        borderColor: colors.borderColor,
        backgroundColor: colors.background,
        borderWidth: 1,
      }}
    >
      <Input
        disabled={disabled}
        errorMessage={errorMessage}
        clearButtonMode={'never'}
        onFocus={onFocus}
        placeholder={placeholder}
        placeholderTextColor={colors.placeholderColor}
        autoCorrect={false}
        autoCapitalize="none"
        value={value}
        inputStyle={{
          color: colors.text,
          fontFamily: 'Montserrat_400Regular',
          fontSize: 14,
          paddingLeft: 12,
        }}
        inputContainerStyle={{ borderBottomWidth: 0 }}
        onChangeText={(text) => {
          onChange(text);
        }}
        leftIcon={icon}
        rightIcon={rightIcon}
      />
    </View>
  );
};

export default InputNetwork;
