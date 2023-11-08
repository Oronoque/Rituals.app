import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

import Text from '../Text';
import Tag from '../Tag';
import RadioInput from '../RadioInput';

const TaskItem = ({ name, isCompleted }) => {
  const [isCompletedState, setIsCompletedState] = useState(isCompleted ? true : false);
  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 0,
        marginBottom: 6,
        width: '100%',
      }}
    >
      <View style={{ borderWidth: 0, width: '85%' }}>
        <Text>- {name}</Text>
      </View>
      <View style={{ borderWidth: 0, position: 'absolute', right: 36 }}>
        <RadioInput
          buttonColor="red"
          onPress={() => {
            setIsCompletedState(!isCompletedState);
          }}
          color={colors.info}
          isSelected={isCompletedState}
        />
      </View>
    </View>
  );
};

const RitualCard = ({ ritual, onPress }) => {
  console.log('ritual', ritual);
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
        <View style={{ flexDirection: 'row', marginBottom: 32 }}>
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
                style={{ flexDirection: 'row', borderWidth: 0, width: '98%', marginBottom: 8 }}
              >
                <TaskItem name={task.name} isCompleted={task.isCompleted} />
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default RitualCard;
