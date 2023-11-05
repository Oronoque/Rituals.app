import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import Text from '../Text';

const RitualCard = ({ ritual, onPress }) => {
  return (
    <View key={ritual.id} style={{ flexDirection: 'row', marginTop: 12 }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={onPress ? 0 : 1}
        style={{
          // height: 60,
          width: 120,
          borderWidth: 1,
          borderRadius: 8,
          marginHorizontal: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Text isBold>{ritual.ritualSkeleton.name}</Text>
        <Text>{ritual.id}</Text>
        <Text>{ritual.ritualSkeleton.frequency}</Text>
        <Text>{ritual?.ritualCategory?.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RitualCard;
