import React, { useContext } from 'react';
import { View, Switch, Dimensions } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components/native';

import Ionicons from '@expo/vector-icons/Ionicons';

import Text from '../Text';

const SettingRow = ({
  icon,
  iconColor,
  text,
  value,
  onChange,
  type,
  isActive,
  options,
  placeholder = 'Select',
}) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: colors.borderColor,
        paddingVertical: 4,
        height: 50,
      }}
    >
      <View
        style={{
          width: '50%',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 8,
        }}
      >
        <Ionicons name={icon} size={22} color={iconColor} />
        <View style={{ marginLeft: 12 }}>
          <Text>{text}</Text>
        </View>
      </View>

      <View style={{ width: '50%' }}>
        {type === 'switch' ? (
          <View style={{ alignItems: 'flex-end', marginRight: 30 }}>
            <Switch
              onValueChange={(value) => {
                onChange(value);
              }}
              value={isActive}
            />
          </View>
        ) : null}

        {type === 'text' ? (
          <View style={{ alignItems: 'flex-end', marginRight: 30 }}>
            <Text customStyle={{ fontStyle: 'italic', color: colors.textSecondary }}>{value}</Text>
          </View>
        ) : null}

        {type === 'select' ? (
          <RNPickerSelect
            placeholder={{ label: placeholder, value: null, fontSize: 20 }}
            onValueChange={(value) => {
              onChange(value);
            }}
            items={options}
            value={value}
            style={{
              placeholder: {
                color: colors.textSecondary,
              },
              inputIOS: {
                color: colors.textSecondary,
                textAlign: 'center',
                fontSize: 16,
                height: 50,
              },
              inputAndroid: {
                width: Dimensions.get('window').width - 40,
                height: 50,
              },
            }}
          />
        ) : null}
      </View>
    </View>
  );
};

export default SettingRow;
