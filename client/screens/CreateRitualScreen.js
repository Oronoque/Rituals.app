import React, { useState } from 'react';
import { Input } from 'react-native-elements';
import { TextInput, View, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useTheme } from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import { Entypo } from '@expo/vector-icons';

import Text from '../components/Text';
import Button from '../components/Button';
import SettingRow from '../components/SettingRow';

import { getRitualCategories } from '../hooks/queries/ritualCategory';

import { API_URL } from '@env';

import { ScreenContainer } from '../layout';

import { frequenciesOptions } from '../constants';

const CreateRitual = ({ navigation }) => {
  const { data: ritualCategories } = getRitualCategories({});

  const { colors } = useTheme();

  const [data, setData] = useState({
    ritualName: null,
    ritualCategoryId: null,
    dataType: null,
    note: null,
  });

  const [image, setImage] = useState(null);

  const handleAddCategory = async () => {
    const request = await axios.post(`https://3dfa-173-209-170-146.ngrok.io/api/rituals`, {
      name: data.ritualName,
      category: data.ritualCategory,
    });

    navigation.navigate('CreateRitualStepScreen');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <ScreenContainer>
      <View style={{ marginTop: 24 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '70%', borderWidth: 0, alignItems: 'center' }}>
            <Input
              placeholder="Name your ritual"
              placeholderTextColor={colors.placeholder}
              autoCorrect={false}
              autoCapitalize="words"
              value={data.ritualName}
              label="Ritual Name"
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
                  ritualName: value,
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
          value={data.ritualCategoryId}
          options={ritualCategories?.map((item) => {
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
          type="select"
          text="Frequency"
          value={data.frequency}
          options={frequenciesOptions}
          placeholder="Select frequency"
          onChange={(value) => {
            console.log('value:', value);
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
            placeholderTextColor={colors.placeholderColor}
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
          onPress={handleAddCategory}
          title="Create ritual"
          isDisabled={!data.ritualCategory || !data.ritualName}
        />
      </View>
    </ScreenContainer>
  );
};

export default CreateRitual;
