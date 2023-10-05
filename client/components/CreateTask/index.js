import React, { useEffect, useState } from 'react';
import { Input } from 'react-native-elements';
import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

import Text from '../Text';
import Button from '../Button';

const TaskItem = ({ colors, task, index, onChange, onDelete }) => {
  return (
    <View
      style={{
        borderWidth: 1,
        marginBottom: 12,
        borderRadius: 8,
        padding: 12,
        borderColor: colors.borderColor,
      }}
    >
      <View
        style={{
          alignItems: 'center',
          flexDirection: 'row',
        }}
      >
        <View
          style={{
            width: '80%',
            alignItems: 'center',
          }}
        >
          <Input
            placeholder="Task name"
            placeholderTextColor={colors.placeholder}
            autoCorrect={false}
            autoCapitalize="words"
            value={task.name}
            labelStyle={{
              paddingHorizontal: 12,
            }}
            inputStyle={{
              color: colors.Text,
              fontSize: 18,
              paddingHorizontal: 12,
            }}
            onChangeText={(value) => {
              onChange(index, 'name', value);
            }}
          />
        </View>
        <View
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            flex: 1,
          }}
        >
          <Button
            primary
            icon={
              <Ionicons name="remove" size={16} color={colors.white} style={{ marginRight: 0 }} />
            }
            borderRadius={8}
            width={40}
            height={34}
            onPress={() => {
              onDelete(index);
            }}
          />
        </View>
      </View>
    </View>
  );
};

const CreateTask = ({ onSubmit, createdRitualId }) => {
  const { colors } = useTheme();

  const [tasks, setTasks] = useState([
    {
      name: '',
    },
    {
      name: '',
    },
  ]);

  return (
    <View style={{ height: '100%' }}>
      <Text textAlign="center" size="big" isBold marginTop={12} marginBottom={4}>
        Attach tasks to it
      </Text>
      <Text
        textAlign="center"
        fontSize={10}
        isBold
        textColor={colors.textSecondary}
        marginBottom={12}
      >
        (Tasks can be anything like cleaning or workng....)
      </Text>

      <View style={{ marginTop: 24, flex: 1, borderWidth: 0 }}>
        {tasks.map((task, index) => {
          return (
            <>
              <TaskItem
                index={index}
                colors={colors}
                task={task}
                onChange={(index, attribute, value) => {
                  const newTasks = [...tasks];
                  newTasks[index][attribute] = value;
                  setTasks(newTasks);
                }}
                onDelete={(index) => {
                  const newTasks = [...tasks];
                  newTasks.splice(index, 1);
                  setTasks(newTasks);
                }}
              />
            </>
          );
        })}

        <View style={{ alignSelf: 'center' }}>
          <Button
            icon={<AntDesign name="plus" size={24} color={colors.primary} />}
            secondary
            tiertiary
            width={180}
            height={34}
            style={{ marginBottom: 12 }}
            onPress={() => {
              setTasks((oldTalks) => [
                ...oldTalks,
                {
                  name: '',
                  note: '',
                },
              ]);
            }}
            title="Add a step"
          />
        </View>

        <Button
          style={{ alignSelf: 'center', marginTop: 40 }}
          width={280}
          onPress={() => {
            onSubmit({ tasks, createdRitualId });
          }}
          title="Finish"
          // isDisabled={!data.ritualCategory || !data.name}
        />
      </View>
    </View>
  );
};

export default CreateTask;
