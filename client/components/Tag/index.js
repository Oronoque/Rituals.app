import React from 'react';
import { Touchable, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import TextComponent from '../TextComponent';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Tag = ({
  textColor,
  bgColor,
  children,
  size = 'small',
  style = {},
  borderWidth = 0,
  borderColor,
  borderRadius = 12,
  onPress,
}) => {
  const { colors } = useTheme();

  const sizes = {
    small: {
      paddingHorizontal: 10,
      paddingVertical: 2,
      fontSize: 16,
      lineHeight: 14,
      borderRadius,
    },
    normal: {
      paddingHorizontal: 8,
      paddingVertical: 2,
      fontSize: 18,
      lineHeight: 20,
      borderRadius,
    },
    big: {
      paddingHorizontal: 16,
      paddingVertical: 4,
      fontSize: 20,
      lineHeight: 20,
      borderRadius: 24,
    },
  };

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor,
        borderWidth,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: bgColor || colors.primary,
        paddingHorizontal: sizes[size].paddingHorizontal,
        paddingVertical: sizes[size].paddingVertical,
        borderRadius: sizes[size].borderRadius,
        ...style,
      }}
    >
      <TextComponent
        isBold
        textColor={textColor || colors.white}
        fontSize={sizes[size].fontSize}
        style={{ lineHeight: sizes[size].lineHeight }}
      >
        {children}
      </TextComponent>
    </TouchableOpacity>
  );
};

export default Tag;
