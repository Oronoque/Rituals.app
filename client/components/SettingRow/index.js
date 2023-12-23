import React, { useContext, useState, useCallback } from 'react';
import { Platform, View, Switch, Dimensions, TouchableOpacity, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { useTheme } from 'styled-components/native';
import DateTimePicker from '@react-native-community/datetimepicker';

import Ionicons from '@expo/vector-icons/Ionicons';

import TextComponent from '../TextComponent';

const SettingRow = ({
  height = 50,
  icon,
  iconColor,
  text,
  value,
  onChange,
  type,
  isActive,
  options,
  placeholder = 'Select',
  isDarkTheme = false,
  onPress,
  isOptional = false,
  isDisabled = false,
  minuteInterval = 1,
  onPressText,
  showRightContent = true,
}) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [isTimePickerOpen, setIsTimePickerOpen] = useState(false);

  const { colors } = useTheme();
  const now = new Date();

  const handleChangeDate = useCallback(
    (newValue) => {
      setIsDatePickerOpen(false);
      onChange(newValue);
    },
    [onChange],
  );
  const handleChangeTime = useCallback(
    (newValue) => {
      setIsTimePickerOpen(false);
      onChange(newValue);
    },
    [onChange],
  );

  // const toggleDatePicker = () => {
  //   Platform.OS === 'android'
  //     ? setIsDatePickerOpen(!isDatePickerOpen)
  //     : setIsTimePickerOpen(!isTimePickerOpen);
  // };

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        borderBottomWidth: 0,
        borderBottomColor: colors.borderColor,
        paddingVertical: 4,
        height,
      }}
    >
      <View
        style={{
          width: '40%',
          flexDirection: 'row',
          alignItems: 'center',
          marginLeft: 8,
        }}
      >
        <Ionicons name={icon} size={22} color={iconColor} />
        <TouchableOpacity
          onPress={onPressText}
          style={{ marginLeft: 12, flexDirection: 'row', alignItems: 'center' }}
        >
          <TextComponent>{text}</TextComponent>
          <TextComponent size="verySmall">{isOptional ? '(optional)' : ''}</TextComponent>
        </TouchableOpacity>
      </View>
      {showRightContent ? (
        <View style={{ alignItems: 'flex-end' }}>
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
            <TouchableOpacity
              onPress={onPress}
              style={{ alignItems: 'flex-end', marginRight: 40 }}
              activeOpacity={onPress ? 0 : 1}
            >
              <TextComponent customStyle={{ color: colors.textSecondary }}>{value}</TextComponent>
            </TouchableOpacity>
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
                  fontFamily: 'Caveat_400Regular',
                },
                inputIOS: {
                  color: colors.textSecondary,
                  textAlign: 'right',
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

          {/* Android DateTimePicker - Date */}
          {Platform.OS === 'android' && isDatePickerOpen && (
            <DateTimePicker
              locale="en-EN"
              value={value}
              mode={'date'}
              minimumDate={new Date()}
              is24Hour={true}
              onChange={handleChangeDate}
            />
          )}

          {/* Android DateTimePicker - Time */}
          {Platform.OS === 'android' && isTimePickerOpen && (
            <DateTimePicker
              locale="en-EN"
              minuteInterval={minuteInterval}
              value={value}
              mode={'time'}
              is24Hour={true}
              onChange={handleChangeTime}
            />
          )}

          {/* iOS DateTimePicker */}
          {Platform.OS === 'ios' && type === 'date' && (
            <View style={{ flexDirection: 'row', borderWidth: 0 }}>
              <DateTimePicker
                themeVariant={isDarkTheme ? 'dark' : 'light'}
                value={value}
                mode={'date'}
                is24Hour={true}
                onChange={handleChangeDate}
              />
              <DateTimePicker
                themeVariant={isDarkTheme ? 'dark' : 'light'}
                value={value}
                mode={'time'}
                is24Hour={false}
                onChange={handleChangeTime}
              />
            </View>
          )}
        </View>
      ) : null}
    </View>
  );
};

export default SettingRow;
