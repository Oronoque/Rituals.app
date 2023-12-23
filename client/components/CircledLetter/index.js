// External Imports - libary i don't own
import React from 'react';
import { View } from 'react-native';

// External Internal my library, not my server

// Internal Imports - my library, my server
import TextComponent from '../TextComponent';

const CircledLetter = ({
  text,
  bgColor = '#F6C751',
  height = 100,
  width = 100,
  fontSize = 44,
  fontColor = 'black',
  children = null,
}) => {
  return (
    <View
      style={{
        backgroundColor: bgColor,
        height,
        width,
        borderRadius: 100,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children ? (
        children
      ) : (
        <TextComponent fontSize={fontSize} textColor={fontColor} isBold>
          {text ? text[0].toUpperCase() : ''}
        </TextComponent>
      )}
    </View>
  );
};

export default CircledLetter;
