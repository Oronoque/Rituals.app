import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'styled-components/native';

const TextComponent = ({ children, isBold, size = 'normal' }) => {
  const { colors } = useTheme();

  const getTextSize = () => {
    if (size === 'small') {
      return 14;
    }
    if (size === 'medium') {
      return 18;
    }
    if (size === 'big') {
      return 20;
    }
  };

  return (
    <Text
      style={{
        color: colors.black,
        fontWeight: isBold ? 'bold' : 'normal',
        fontSize: getTextSize(),
      }}
    >
      {children}
    </Text>
  );
};

export default TextComponent;
