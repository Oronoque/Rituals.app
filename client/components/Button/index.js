import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

const Button = ({ onPress, title, size = 'medium', customStyle, isDisabled = false }) => {
  const { colors } = useTheme();

  const getStyling = () => {
    if (size === 'small') {
      return {
        height: 40,
        width: 100,
      };
    }
    if (size === 'medium') {
      return {
        height: 50,
        width: 200,
      };
    }
  };

  const style = getStyling();

  return (
    <TouchableOpacity
      activeOpacity={isDisabled ? 1 : 0}
      onPress={onPress}
      style={{
        height: style.height,
        width: style.width || 100,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 12,
        backgroundColor: isDisabled ? colors.disabled : colors.primary,
        ...customStyle,
      }}
    >
      <Text style={{ color: colors.white, fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
