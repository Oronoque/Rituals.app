import React from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import { useTheme } from 'styled-components/native';

import TextComponent from '../TextComponent';

const RitualCategoryItem = ({ isActive, categoryId, name, onPress }) => {
  const { colors } = useTheme();
  return (
    <TouchableOpacity
      onPress={() => {
        onPress({ categoryId });
      }}
      style={{
        paddingHorizontal: 4,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: isActive ? colors.borderColor : null,
      }}
    >
      <TextComponent
        textColor={isActive ? colors.blue : colors.text}
        size={isActive ? 'veryBig' : 'small'}
      >
        {name}
      </TextComponent>
    </TouchableOpacity>
  );
};

export default RitualCategoryItem;
