import React from 'react';
import { View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from 'styled-components/native';

import Text from '../Text';

const Tag = ({
  textColor,
  bgColor,
  children,
  size = 'small',
  style = {},
  borderWidth = 0,
  borderColor,
  borderRadius = 12,
}) => {
  const { colors } = useTheme();

  const sizes = {
    small: {
      paddingHorizontal: 6,
      paddingVertical: 0,
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
    <View
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
      <Text
        isBold
        textColor={textColor || colors.white}
        fontSize={sizes[size].fontSize}
        style={{ lineHeight: sizes[size].lineHeight }}
      >
        {children}
      </Text>
    </View>
  );
};

export default Tag;
