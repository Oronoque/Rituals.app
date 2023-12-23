import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import { useTheme } from 'styled-components/native';
import TextComponent from '../TextComponent';

const DayItem = ({ index, dayNumber, dayString, isActive, onPress }) => {
  const { colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={() => {
        onPress({ index });
      }}
      style={{
        borderWidth: 0,
        height: 100,
        width: 60,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <TextComponent isBold marginBottom={8} style={{ borderWidth: 0 }}>
        {dayString}
      </TextComponent>
      <View
        style={{
          borderWidth: isActive ? 2 : 0,
          width: 40,
          height: 40,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 40,
          borderColor: colors.info,
        }}
      >
        <TextComponent isBold>{dayNumber}</TextComponent>
      </View>
    </TouchableOpacity>
  );
};

export default DayItem;
