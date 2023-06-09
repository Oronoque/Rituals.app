import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { View } from 'react-native';
import axios from 'axios';
import { useTheme } from 'styled-components/native';
import { API_URL } from '@env';

import Text from '../components/Text';
import Button from '../components/Button';

import { ScreenContainer } from '../layout';

function CreateRitualStep({ route, navigation }) {
  const { colors } = useTheme();
  const parentRitual = route.params.ritualName;

  const [data, setData] = useState({
    stepName: null,
  });

  const handleAddStep = async () => {
    const request = await axios.post(`${API_URL}/ritualSteps`, {
      name: data.stepName,
      ritualName: parentRitual,
    });

    navigation.goBack();
  };

  return (
    <ScreenContainer>
      <Text>Create a Ritual Step!</Text>

      <Input
        placeholder="Name your step"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="words"
        value={data.stepName}
        label="Step Name"
        inputStyle={{
          color: colors.Text,
          fontSize: 18,
        }}
        onChangeText={(value) => {
          return setData({
            ...data,
            stepName: value,
          });
        }}
      />

      <Button onPress={handleAddStep} title="Add" isDisabled={!data.stepName} />
    </ScreenContainer>
  );
}

export default CreateRitualStep;
