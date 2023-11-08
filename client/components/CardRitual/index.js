import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

import Text from '../Text';
import Tag from '../Tag';
import RadioInput from '../RadioInput';

const RitualCard = ({ ritual, onPress }) => {
  console.log('ritual:', ritual);
  const { colors } = useTheme();

  const [isCompleted, setIsCompleted] = useState(false);

  console.log('ritual:', ritual);

  return (
    <View key={ritual.id} style={{ flexDirection: 'row', marginTop: 12, paddingHorizontal: 12 }}>
      <TouchableOpacity
        onPress={onPress}
        activeOpacity={1}
        style={{
          width: '100%',
          borderWidth: 1,
          borderRadius: 8,
          justifyContent: 'center',
          marginBottom: 20,
          padding: 12,
        }}
      >
        <View style={{ flexDirection: 'row' }}>
          <Text marginRight={4} isBold>
            {ritual.ritualSkeleton.name}
          </Text>
          <Tag borderRadius={8}>{ritual.ritualSkeleton.frequency}</Tag>
        </View>

        <View style={{ borderWidth: 0 }}>
          {ritual.tasks.map((task) => {
            return (
              <View
                key={task.id}
                style={{ flexDirection: 'row', borderWidth: 0, width: '75%', marginBottom: 8 }}
              >
                <View style={{ flexDirection: 'row', borderWidth: 0 }}>
                  <Text>- {task.name}</Text>
                </View>

                <View style={{ borderWidth: 0, flex: 1 }}>
                  <RadioInput
                    buttonColor="red"
                    onPress={() => {
                      setIsCompleted(!isCompleted);
                    }}
                    color={colors.info}
                    isSelected={isCompleted}
                  />
                </View>
              </View>
            );
          })}
        </View>
        <View>{}</View>
      </TouchableOpacity>
    </View>
  );
};

export default RitualCard;
