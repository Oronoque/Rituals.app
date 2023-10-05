import React, { useContext, useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableWithoutFeedback, Keyboard, useWindowDimensions } from 'react-native';
import { TabView } from 'react-native-tab-view';

import { showToast } from '../../utils/toast';

import Text from '../Text';
import Modal from '../Modal';
import CreateRitual from '../CreateRitual';
import CreateTask from '../CreateTask';
import { createRitualSkeleton, createTasks } from '../../hooks/queries/ritualSkeleton';

const CreateUpdateRitualModal = ({ onClose, isOpen, navigation }) => {
  const {
    mutate: createRitualMutation,
    isSuccess: isSuccessCreateRitual,
    isError: isErrorCreateRitual,
    data: createdRitual,
  } = createRitualSkeleton();
  const { mutate: createTasksMutation, isSuccess: isSuccessCreateTasks } = createTasks();
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
    createTasksMutation({
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
    if (isSuccessCreateTasks) {
      showToast({ title: 'Ritual successfully created !' });
      onClose();
    }
  }, [isSuccessCreateTasks]);

  const renderScenes = useCallback(
    ({ route }) => {
      if (route.key === 'ritual') {
        return (
          <CreateRitual isErrorCreateRitual={isErrorCreateRitual} onSubmit={handleAddRitual} />
        );
      }
      if (route.key === 'task') {
        return <CreateTask onSubmit={handleAddTasks} createdRitualId={createdRitual?.data?.id} />;
      }
    },
    [createdRitual],
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
