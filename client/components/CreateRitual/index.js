import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';

import Text from '../Text';
import Button from '../Button';
import SettingRow from '../SettingRow';

import { getRitualCategories } from '../../hooks/queries/ritualCategory';

import { frequenciesOptions } from '../../constants';

const CreateRitual = ({ onSubmit, isErrorCreateRitual }) => {
  const { data: ritualCategories } = getRitualCategories({});

  const { colors } = useTheme();

  const [data, setData] = useState({
    name: null,
    categoryId: null,
    note: null,
    frequency: null,
  });

  const [image, setImage] = useState(null);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  if (!ritualCategories) {
    return null;
  }

  return (
    <>
      <View style={{ marginTop: 24, flex: 1, borderWidth: 0 }}>
        <Text textAlign="center" size="big" isBold customStyle={{ paddingVertical: 24 }}>
          Add a ritual
        </Text>

        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '70%', borderWidth: 0, alignItems: 'center' }}>
            <Input
              placeholderTextColor={colors.placeholder}
              autoCorrect={false}
              autoCapitalize="words"
              value={data.name}
              placeholder="Name your ritual"
              labelStyle={{
                paddingHorizontal: 12,
              }}
              inputStyle={{
                color: colors.Text,
                fontSize: 18,
                paddingHorizontal: 12,
              }}
              onChangeText={(value) => {
                return setData({
                  ...data,
                  name: value,
                });
              }}
            />
          </View>
          <View style={{ borderWidth: 0, flex: 1, height: '100%' }}>
            <TouchableOpacity
              style={{
                width: 60,
                height: 60,
                borderRadius: 60,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: colors.lightBackground,
                borderColor: colors.borderColor,
                borderWidth: 1,
                alignSelf: 'center',
                marginBottom: 4,
              }}
              onPress={pickImage}
            >
              {image ? (
                <Image
                  source={{ uri: image }}
                  style={{ width: 60, height: 60, borderRadius: 60 }}
                />
              ) : (
                <Entypo name="image" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>
        </View>

        <SettingRow
          type="select"
          text="Category"
          value={data.categoryId}
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
              categoryId: value,
            });
          }}
        />

        <SettingRow
          type="select"
          text="Frequency"
          value={data.frequency}
          options={frequenciesOptions}
          placeholder="Select frequency"
          onChange={(value) => {
            setData({
              ...data,
              frequency: value,
            });
          }}
        />

        <View style={{ paddingHorizontal: 19, marginTop: 12 }}>
          <Text>Add a note : </Text>

          <TextInput
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
            }}
            placeholderTextColor={colors.placeholder}
            onChangeText={(value) => {
              console.log('value:', value);
              setData({
                ...data,
                note: value,
              });
            }}
            value={data.note}
            maxLength={1000}
            multiline
            editable
            numberOfLines={4}
          />
        </View>

        <Button
          style={{ alignSelf: 'center' }}
          width={220}
          onPress={() => {
            onSubmit(data);
          }}
          title="Create ritual"
          isDisabled={!data.ritualCategory || !data.name}
        />

        {isErrorCreateRitual ? (
          <Text marginTop={8} textColor={colors.red} textAlign="center">
            This ritual name alraeady exists
          </Text>
        ) : null}
      </View>
    </>
  );
};

export default CreateRitual;
