import React, { useContext } from 'react';
import { View, Switch } from 'react-native';

import Ionicons from '@expo/vector-icons/Ionicons';

import Text from '../Text';

const SettingRow = ({ icon, text, value, type, onPress }) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        borderBottomWidth: 1,
        paddingVertical: 8,
        paddingHorizontal: 12,
      }}
    >
      {/* 70 */}
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name={icon} size={26} color="#E46D2B" />
        <View style={{ marginLeft: 8 }}>
          <Text size='big'>{text}</Text>
        </View>
      </View>

      {/* 30 */}
      <View>
        <Switch onPress={onPress}
        />
      </View>
    </View>
  );
};

export default SettingRow;
