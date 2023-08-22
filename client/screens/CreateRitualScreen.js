import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { TextInput } from 'react-native';
import axios from 'axios';
import { useTheme } from 'styled-components/native';

import Text from '../components/Text';
import Button from '../components/Button';
import SettingRow from '../components/SettingRow';

import { getRitualCategories } from '../hooks/queries/ritualCategory';

import { API_URL } from '@env';

import { ScreenContainer } from '../layout';

function CreateRitual({ navigation }) {
  const { data: ritualCategories } = getRitualCategories({});

  const { colors } = useTheme();

  const [data, setData] = useState({
    ritualName: null,
    ritualCategory: null,
    ritualCategoryId: null,
    isSelected: null,
    description: null,
  });

  const handleAddCategory = async () => {
    const request = await axios.post(`${API_URL}/rituals`, {
      name: data.ritualName,
      category: data.ritualCategory,
    });

    navigation.navigate('CreateRitualStepScreen');
  };

  return (
    <ScreenContainer>
      <Text>Create a Ritual!</Text>

      <>
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

        <SettingRow
          type="select"
          text="Gender"
          value={data.ritualCategoryId}
          options={ritualCategories.map((item) => {
            return {
              label: item.name,
              value: item.id,
            };
          })}
          placeholder="Select category"
          onChange={(value) => {
            console.log('value:', value);
            setData({
              ...data,
              ritualCategoryId: value,
            });
          }}
        />

        <SettingRow
          type="switch"
          text="Placeholder"
          isActive={data.isSelected}
          placeholder="Select category"
          onChange={(value) => {
            setData({
              ...data,
              isSelected: !data.isSelected,
            });
          }}
        />

        <Text>Describe your ritual</Text>

        <TextInput
          // textAlignVertical={'top'}
          placeholder={`In one sentence, describe the Ritual step, such as “Vacuum living room” or “Check air pressure in all tires to ensure 45 psi”`}
          style={{
            width: '100%',
            minHeight: 80,
            marginTop: 12,
            marginBottom: 40,
            paddingVertical: 8,
            borderColor: colors.borderColor,
            borderWidth: 1,
            paddingHorizontal: 12,
            borderRadius: 10,
            color: colors.textSecondary,
            fontFamily: 'Montserrat_400Regular',
          }}
          placeholderTextColor={colors.placeholderColor}
          // onChangeText={(value) => setMessage(value)}
          // value={message}
          maxLength={1000}
          multiline
          editable
          numberOfLines={4}
        />

        <Button
          onPress={handleAddCategory}
          title="Next"
          isDisabled={!data.ritualCategory || !data.ritualName}
        />
      </>
    </ScreenContainer>
  );
}

export default CreateRitual;
