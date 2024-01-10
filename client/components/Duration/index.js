import React from 'react';
import { View, TextInput } from 'react-native';

import TextComponent from '../TextComponent';

const Duration = ({ estimatedTime, setEstimatedTime, colors }) => {
  // Handler for when hours or minutes change
  const handleTimeChange = (value, type) => {
    // Update the estimatedTime object with the new value
    const newEstimatedTime = { ...estimatedTime, [type]: value };

    // Format the duration as a string
    const durationString = `${newEstimatedTime.hours || 0} hours ${
      newEstimatedTime.minutes || 0
    } minutes`;

    // Call the function passed from the parent component to update the state
    setEstimatedTime(durationString);
  };
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 19,
        marginTop: 12,
      }}
    >
      <TextComponent style={{ flex: 1 }}>Estimate time required:</TextComponent>

      {/* Hours Input */}
      <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
        <TextInput
          style={{
            width: 50,
            borderColor: colors.borderColor,
            borderWidth: 0,
            borderBottomColor: colors.borderColor,
            borderBottomWidth: 1,
            paddingHorizontal: 12,
            borderRadius: 10,
            color: colors.textSecondary,
          }}
          keyboardType="numeric"
          maxLength={2} // Limit to 99 hours
          value={estimatedTime.hours}
          onChangeText={(value) => handleTimeChange(value, 'hours')}
        />
        <TextComponent style={{ marginLeft: 4 }}>hours</TextComponent>
      </View>

      {/* Minutes Input */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{
            width: 50,
            borderColor: colors.borderColor,
            borderWidth: 0,
            borderBottomColor: colors.borderColor,
            borderBottomWidth: 1,
            paddingHorizontal: 12,
            borderRadius: 10,
            color: colors.textSecondary,
          }}
          keyboardType="numeric"
          maxLength={2} // Limit to 59 minutes
          value={estimatedTime.minutes}
          onChangeText={(value) => handleTimeChange(value, 'minutes')}
        />
        <TextComponent style={{ marginLeft: 4 }}>minutes</TextComponent>
      </View>
    </View>
  );
};

export default Duration;
