import React from 'react';
import { Text } from 'react-native';
import { useTheme } from 'styled-components/native';

const TextComponent = ({ children, isBold, size = 'normal', customStyle }) => {
  // const { colors = {} } = useTheme();
  const colors = {};
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
        ...customStyle,
      }}
    >
      {children}
    </Text>
  );
};

export default TextComponent;
