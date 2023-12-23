import React, { useState, useEffect } from 'react';
import { TextInput, View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';
import { useTheme } from 'styled-components/native';
import * as ImagePicker from 'expo-image-picker';
import TextComponent from '../TextComponent';
import Button from '../Button';
import Scheduler from '../Scheduler';
import NameInput from '../NameInput';
import Stopwatch from '../Stopwatch';
import Timer from '../Timer';
import Tabata from '../Tabata';
import ResistanceTraining from '../ResistanceTraining';
import Frequency from '../Frequency';

import { getRitualCategories } from '../../hooks/queries/ritualCategory';
import { frequenciesOptions } from '../../constants';

const CreateRitual = ({ onSubmit, isErrorCreateRitual, initialCategoryId }) => {
  const { data: ritualCategories } = getRitualCategories({});

  const { colors } = useTheme();

  const now = new Date();

  const [data, setData] = useState({
    name: null,
    categoryId: initialCategoryId,
    note: null,
    frequency: null,
    startDate: new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes(),
      0,
    ),
  });

  const [estimatedTime, setEstimatedTime] = useState({ hours: '', minutes: '' });
  const [image, setImage] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isCategoryListVisible, setIsCategoryListVisible] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [ritualScheduled, setRitualScheduled] = useState(null);

  const handleCategorySelect = (categoryId) => {
    setData({ ...data, categoryId: categoryId });
    setSelectedCategory(categoryId);
    setIsCategoryListVisible(false);
  };

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

  useEffect(() => {
    if (initialCategoryId) {
      setSelectedCategory(initialCategoryId);
    }
  }, [initialCategoryId]);

  const containerStyle = {
    marginTop: 0,
    flex: 1,
    borderWidth: 0,
  };

  return (
    <>
      <ImageBackground source={{ uri: image }} style={containerStyle} resizeMode="cover">
        <View
          style={{
            flex: 1,
            borderWidth: 0,
            containerStyle,
            backgroundColor: colors.lightBackground,
          }}
        >
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
                borderWidth: 0,
                alignSelf: 'center',
                marginBottom: 4,
              }}
              onPress={pickImage}
            ></TouchableOpacity>
          </View>

          <NameInput
            value={data.name}
            onChange={(value) => setData({ ...data, name: value })}
            colors={colors}
          />

          {/* <Stopwatch />
          <Timer />
          <Tabata />
          <ResistanceTraining /> */}

          <View
            style={{
              flexDirection: 'row',
              paddingHorizontal: 19,
              marginTop: 12,
              alignItems: 'center',
            }}
          >
            {isCategoryListVisible || !selectedCategory ? (
              <View
                style={{
                  position: 'relative',
                  backgroundColor: 'white',
                  padding: 10,
                  borderWidth: 0,
                  borderColor: 'grey',
                }}
              >
                <FlatList
                  data={ritualCategories}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      onPress={() => {
                        handleCategorySelect(item.id);
                        setIsCategoryListVisible(false);
                      }}
                    >
                      <TextComponent>{item.name}</TextComponent>
                    </TouchableOpacity>
                  )}
                />
              </View>
            ) : (
              <TouchableOpacity onPress={() => setIsCategoryListVisible(true)}>
                <TextComponent>
                  {ritualCategories.find((cat) => cat.id === selectedCategory).name}
                </TextComponent>
              </TouchableOpacity>
            )}
          </View>

          <Scheduler
            data={data || { startDate: new Date(), name: '', categoryId: '', frequency: '' }}
            setData={setData}
          />
          <Frequency data={data} setData={setData} frequenciesOptions={frequenciesOptions} />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 19,
              marginTop: 12,
            }}
          >
            <TextComponent style={{ flex: 1 }}>Estimate time required:</TextComponent>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 8 }}>
              <TextInput
                style={{
                  width: 50,
                  borderColor: colors.borderColor,
                  borderWidth: 0,
                  borderBottomColor: colors.borderColor,
                  borderBottomWidth: 1,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  color: colors.textSecondary,
                }}
                keyboardType="numeric"
                maxLength={2} // Limit to 99 hours
                value={estimatedTime.hours}
                onChangeText={(value) => {
                  setEstimatedTime({ ...estimatedTime, hours: value });
                }}
              />
              <TextComponent style={{ marginLeft: 4 }}>hours</TextComponent>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TextInput
                style={{
                  width: 50,
                  borderColor: colors.borderColor,
                  borderWidth: 0,
                  borderBottomColor: colors.borderColor,
                  borderBottomWidth: 1,
                  paddingHorizontal: 12,
                  borderRadius: 10,
                  color: colors.textSecondary,
                }}
                keyboardType="numeric"
                maxLength={2} // Limit to 59 minutes
                value={estimatedTime.minutes}
                onChangeText={(value) => {
                  setEstimatedTime({ ...estimatedTime, minutes: value });
                }}
              />
              <TextComponent style={{ marginLeft: 4 }}>minutes</TextComponent>
            </View>
          </View>

          <View style={{ paddingHorizontal: 19, marginTop: 12 }}>
            <TextComponent>note: </TextComponent>

            <TextInput
              placeholder={`write yourself a little note`}
              style={{
                width: '100%',
                minHeight: 80,
                marginTop: 12,
                marginBottom: 40,
                paddingVertical: 8,
                borderColor: colors.borderColor,
                borderWidth: 0,
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
            <TextComponent marginTop={8} textColor={colors.red} textAlign="center">
              This ritual name already exists
            </TextComponent>
          ) : null}
        </View>
      </ImageBackground>
    </>
  );
};

export default CreateRitual;
