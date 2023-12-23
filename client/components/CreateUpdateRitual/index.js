import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableWithoutFeedback, Keyboard, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

import { showToast } from '../../utils/toast';
import CreateRitual from '../CreateRitual';
import CreateTask from '../CreateTask';
import { createRitualSkeleton, createSkeletonTasks } from '../../hooks/queries/ritualSkeleton';

const CreateUpdateRitual = ({ initialCategoryId }) => {
  const {
    mutate: createRitualMutation,
    isSuccess: isSuccessCreateRitual,
    isError: isErrorCreateRitual,
    data: createdRitual,
  } = createRitualSkeleton();
  const { mutate: createSkeletonTasksMutation, isSuccess: isSuccessCreateSkeletonTasks } =
    createSkeletonTasks();

  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const [routes] = useState([
    { key: 'ritual', title: 'Add a ritual' },
    { key: 'task', title: 'Add tasks to the ritual' },
  ]);

  const navigation = useNavigation();

  const handleAddRitual = (data) => {
    createRitualMutation({
      name: data.name,
      categoryId: data.categoryId,
      note: data.note,
      frequency: data.frequency,
    });
  };

  const handleAddTasks = ({ tasks, createdRitualId }) => {
    createSkeletonTasksMutation({
      tasks,
      ritualId: createdRitualId,
    });
  };

  useEffect(() => {
    if (isSuccessCreateRitual) {
      setIndex(1);
    }
  }, [isSuccessCreateRitual]);

  useEffect(() => {
    if (isSuccessCreateSkeletonTasks) {
      showToast({ title: 'Ritual successfully created !' });
      navigation.goBack(); // Replace onClose with navigation action
    }
  }, [isSuccessCreateSkeletonTasks, navigation]);
  const renderScenes = useCallback(
    ({ route }) => {
      if (route.key === 'ritual') {
        return (
          <CreateRitual
            isErrorCreateRitual={isErrorCreateRitual}
            onSubmit={handleAddRitual}
            initialCategoryId={initialCategoryId}
          />
        );
      }
      if (route.key === 'task') {
        return (
          <CreateTask
            onSubmit={handleAddTasks}
            createdRitualId={createdRitual?.data?.id}
            initialCategoryId={initialCategoryId}
          />
        );
      }
    },
    [createdRitual, initialCategoryId],
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
        <TabView
          swipeEnabled={false}
          navigationState={{ index, routes }}
          renderScene={renderScenes}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          renderTabBar={() => null}
        />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

export default CreateUpdateRitual;
