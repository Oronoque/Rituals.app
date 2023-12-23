import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Input } from 'react-native-elements';
import uuid from 'react-uuid';
import { FontAwesome5 } from '@expo/vector-icons';

import { updateTask, deleteTask, insertTask } from '../../hooks/queries/ritual';

import TextComponent from '../TextComponent';
import RadioInput from '../RadioInput';
import Button from '../Button';

const TaskItem = ({
  isCreationMode,
  taskId,
  name,
  isCompleted,
  onPressDelete,
  isEditingMode,
  onCreate,
  onPressEdit,
  onPressUpdate,
}) => {
  const [isCompletedState, setIsCompletedState] = useState(isCompleted ? true : false);
  const [nameState, setNameState] = useState(name);

  const { colors } = useTheme();

  return (
    <View
      style={{
        flexDirection: 'row',
        borderWidth: 0,
        marginBottom: 6,
        width: '100%',
        height: 24,
      }}
    >
      <View style={{ borderWidth: 0, width: '80%' }}>
        <View style={{ flexDirection: 'row' }}>
          {isEditingMode ? (
            <Input
              placeholder="Write the task name"
              autoFocus
              style={{ borderWidth: 0, width: '50%', fontFamily: 'Caveat_400Regular' }}
              placeholderTextColor={colors.placeholder}
              autoCorrect={false}
              autoCapitalize="words"
              value={nameState}
              inputStyle={{
                width: '50%',
                color: colors.Text,
                fontSize: 18,
              }}
              containerStyle={{ width: '80%', borderWidth: 0 }}
              onChangeText={(value) => {
                return setNameState(value);
              }}
            />
          ) : (
            <TextComponent>- {name}</TextComponent>
          )}
          <TouchableOpacity
            style={{ borderWidth: 0 }}
            onPress={() => {
              if (isCreationMode) {
                onCreate({ name: nameState });
              } else if (isEditingMode) {
                onPressUpdate({ name: nameState });
              } else {
                onPressEdit({ taskId });
              }
            }}
          >
            <TextComponent
              size="small"
              marginLeft={4}
              marginTop={isEditingMode ? 8 : 0}
              textColor={colors.info}
            >
              {isEditingMode ? 'save' : 'edit'}
            </TextComponent>
          </TouchableOpacity>
        </View>
      </View>

      <View style={{ borderWidth: 0, position: 'absolute', right: 48 }}>
        {isEditingMode ? null : (
          <RadioInput
            buttonColor="red"
            onPress={() => {
              setIsCompletedState(!isCompletedState);
            }}
            color={colors.info}
            isSelected={isCompletedState}
          />
        )}
      </View>

      <View style={{ borderWidth: 0, position: 'absolute', right: -6, top: 2 }}>
        {isEditingMode ? null : (
          <TouchableOpacity
            onLongPress={() => {
              alert('lol');
            }}
            onPress={onPressDelete}
            style={{
              width: 24,
              height: 24,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.primary,
              borderRadius: 8,
            }}
          >
            <FontAwesome5 name="times" size={18} color={colors.white} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const RitualCard = ({ ritual }) => {
  console.log('ritual:', ritual);

  const [createdTasks, setCreatedTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isCreationMode, setIsCreationMode] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const { mutate: updateTaskMutation } = updateTask();
  const { mutate: deleteTaskMutation } = deleteTask();
  const { mutate: insertTaskMutation, isSuccess: insertTaskSuccess } = insertTask();

  const finalTasks = [...ritual.tasks, ...createdTasks];

  useEffect(() => {
    if (insertTaskSuccess && editingTaskId) {
      const newCreatedTasks = createdTasks.filter((item) => item.id !== editingTaskId);
      setCreatedTasks(newCreatedTasks);
      setEditingTaskId(null);
    }
  }, [insertTaskSuccess]);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <View key={ritual.id} style={{ marginTop: 12, paddingHorizontal: 12 }}>
      <TouchableOpacity
        onPress={toggleExpand}
        style={{
          borderWidth: 0,
          borderRadius: 8,
          marginBottom: 20,
          padding: 6,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextComponent marginRight={4} isBold>
            {ritual.ritualSkeleton.name}
          </TextComponent>
          {isExpanded && (
            <TextComponent style={{ marginLeft: 10, backgroundColor: 'transparent' }}>
              {ritual.ritualSkeleton.frequency}
            </TextComponent>
          )}
        </View>

        {isExpanded && (
          <>
            <View style={{ borderWidth: 0 }}>
              {finalTasks.map((task) => (
                <TaskItem
                  key={task.id}
                  isCreationMode={isCreationMode}
                  taskId={task.id}
                  isEditingMode={editingTaskId === task.id}
                  name={task.name}
                  isCompleted={task.isCompleted}
                  onCreate={({ name }) => insertTaskMutation({ ritualId: ritual.id, name })}
                  onPressDelete={() => deleteTaskMutation({ ritualId: ritual.id, taskId: task.id })}
                  onPressEdit={() => setEditingTaskId(task.id)}
                  onPressUpdate={({ name }) => {
                    updateTaskMutation({
                      taskId: task.id,
                      ritualId: ritual.id,
                      isCompleted: !task.isCompleted,
                      ...(name && { name }),
                    });
                  }}
                />
              ))}
            </View>

            {editingTaskId ? null : (
              <View style={{ marginTop: 10 }}>
                <Button
                  onPress={() => {
                    const newTaskId = uuid();
                    setIsCreationMode(true);
                    setEditingTaskId(newTaskId);
                    setCreatedTasks([
                      ...createdTasks,
                      {
                        id: newTaskId,
                        isCompleted: false,
                        name: '',
                        ritualId: ritual.id,
                        startDate: ritual.startDate,
                      },
                    ]);
                  }}
                  size="small"
                  title="Add task"
                  width={140}
                />
              </View>
            )}
          </>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default RitualCard;
