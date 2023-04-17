import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'styled-components/native';

const TextComponent = ({ children, isBold, size = 'normal' }) => {
  const { colors } = useTheme();

  const getTextSize = () => {
    if (size === 'small') {
      return 14;
    }
    if (size === 'normal') {
      return 16;
    }
    if (size === 'big') {
      return 20;
    }
  };

  return (
    <Text
      style={{
        color: colors.text,
        fontWeight: isBold ? 'bold' : 'normal',
        fontSize: getTextSize(),
      }}
    >
      {children}
    </Text>
  );
};

export default TextComponent;
