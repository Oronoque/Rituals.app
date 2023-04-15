import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

const Button = ({ onPress, title, size = 'medium', customStyle }) => {
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
      onPress={onPress}
      style={{
        height: style.height,
        width: style.width || 100,
        borderWidth: 1,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'grey',
        ...customStyle,
      }}
    >
      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 18 }}>{title}</Text>
    </TouchableOpacity>
  );
};

export default Button;
