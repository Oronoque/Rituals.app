import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { View } from 'react-native';
import axios from 'axios';
import { useTheme } from 'styled-components/native';
import Ionicons from '@expo/vector-icons/Ionicons';

import Text from '../components/Text';
import Button from '../components/Button';

import { ScreenContainer } from '../layout';

function CreateRitual({ navigation }) {
  const { colors } = useTheme();

  const [data, setData] = useState({
    ritualName: null,
    ritualCategory: null,
  });

  console.log('data', data);

  const handleAddCategory = async () => {
    const request = await axios.post('http://localhost:3009/api/rituals', {
      name: data.ritualName,
      category: data.ritualCategory,
    });

    navigation.navigate('RitualsScreen');
  };

  return (
    <ScreenContainer>
      <Text>Create a Ritual!</Text>

      <Input
        placeholder="Name your ritual"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="words"
        value={data.ritualName}
        label="Ritual Name"
        inputStyle={{
          color: colors.Text,
          fontSize: 18,
        }}
        onChangeText={(value) => {
          return setData({
            ...data,
            ritualName: value,
          });
        }}
      />

      <Input
        placeholder="Category"
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="words"
        value={data.ritualCategory}
        label="Ritual Category"
        inputStyle={{
          color: colors.Text,
          fontSize: 18,
        }}
        onChangeText={(value) => {
          return setData({
            ...data,
            ritualCategory: value,
          });
        }}
      />

      <Button
        onPress={handleAddCategory}
        title="Add"
        isDisabled={!data.ritualCategory || !data.ritualName}
      />
    </ScreenContainer>
  );
}

export default CreateRitual;
