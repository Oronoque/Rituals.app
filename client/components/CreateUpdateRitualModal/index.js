import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableWithoutFeedback, Keyboard, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';

import { showToast } from '../../utils/toast';

import Modal from '../Modal';
import CreateRitual from '../CreateRitual';
import CreateTask from '../CreateTask';
import { createRitualSkeleton, createSkeletonTasks } from '../../hooks/queries/ritualSkeleton';

const CreateUpdateRitualModal = ({ onClose, isOpen, initialCategoryId }) => {
  const {
    mutate: createRitualMutation,
    isSuccess: isSuccessCreateRitual,
    isError: isErrorCreateRitual,
    data: createdRitual,
  } = createRitualSkeleton();
  const { mutate: createSkeletonTasksMutation, isSuccess: isSuccessCreateSkeletonTasks } =
    createSkeletonTasks();
  console.log('createdRitual:', createdRitual);

  const [index, setIndex] = useState(0);
  const layout = useWindowDimensions();

  const [routes] = React.useState([
    { key: 'ritual', title: 'Add a ritual' },
    { key: 'task', title: 'Add tasks to the ritual' },
  ]);

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
      onClose();
    }
  }, [isSuccessCreateSkeletonTasks]);

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
    <Modal height="80%" onClose={onClose} isOpen={isOpen} withCloseButton={true}>
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
    </Modal>
  );
};

export default CreateUpdateRitualModal;
