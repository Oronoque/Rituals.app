import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { View } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { ScreenContainer } from '../../layout';

import TextComponent from '../TextComponent';
import Button from '../Button';

const TaskItem = ({ colors, task, index, onChange, onDelete }) => {
  return (
    <View
      style={{
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
    <ScreenContainer>
      <View style={{ height: '100%' }}>
        <TextComponent textAlign="center" size="big" isBold marginTop={12} marginBottom={4}>
          Add tasks to compose your Ritual.
        </TextComponent>
        <TextComponent
          size="small"
          textAlign="center"
          isBold
          textColor={colors.textSecondary}
          marginBottom={12}
        >
          (examples: pack bag for gym, wash dishes, write an essay)
        </TextComponent>

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
    </ScreenContainer>
  );
};

export default CreateTask;
