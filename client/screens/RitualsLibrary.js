import React, { useState, useEffect } from 'react';
import { View, FlatList, RefreshControl, Dimensions, TouchableOpacity } from 'react-native';

import { ScreenContainer } from '../layout';
import Header from '../components/Header';

import CardSkeleton from '../components/CardSkeleton';
import Button from '../components/Button';
import { getRitualCategories } from '../hooks/queries/ritualCategory';
import { getRitualSkeletons } from '../hooks/queries/ritualSkeleton';
import { useTheme } from 'styled-components/native';
import TextComponent from '../components/TextComponent';

function RitualsLibrary({ navigation }) {
  const { data: ritualCategories } = getRitualCategories({});
  const [activeCategoryId, setActiveCategoryId] = useState(null);
  const { colors } = useTheme();

  const {
    data: ritualSkeletonsData,
    isLoading: ritualSkeletonsIsLoading,
    refetch: refetchRitualSkeletons,
  } = getRitualSkeletons({});

  const handleCreateRitualPress = () => {
    navigation.navigate('CreateUpdateRitual', { initialCategoryId: activeCategoryId });
  };

  const filteredRitualSkeletons = ritualSkeletonsData?.filter((item) => {
    if (!activeCategoryId) {
      return true;
    } else {
      return activeCategoryId === item.ritualCategoryId;
    }
  });

  function getCategoryNameById(categories, categoryId) {
    const category = categories?.find((cat) => cat.id === categoryId);
    return category ? category.name : '';
  }

  // This function is used to render each category item in the FlatList
  const renderCategoryItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => setActiveCategoryId(item.id)}
      style={{
        marginBottom: 10,
        // alignItems: 'flex-start',
        paddingLeft: 10,
        height: 35,
        backgroundColor: activeCategoryId === item.id ? colors.selectedBackground : 'transparent',
      }}
    >
      <TextComponent>{item.name}</TextComponent>
    </TouchableOpacity>
  );

  const screenWidth = Dimensions.get('window').width;

  return (
    <ScreenContainer>
      <Header title="Library" navigation={navigation} />

      {/* Horizontal FlatList for Categories */}
      <View style={{ height: 50 }}>
        <FlatList
          horizontal
          data={ritualCategories}
          renderItem={renderCategoryItem}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={{ paddingRight: 10 }}
          showsHorizontalScrollIndicator={false}
        />
      </View>

      {/* Main Content */}
      <View style={{ width: screenWidth, paddingLeft: 10, flex: 1 }}>
        <Button
          title={`create new ${getCategoryNameById(ritualCategories, activeCategoryId)} ritual`}
          onPress={handleCreateRitualPress}
          style={{ marginTop: 8, alignSelf: 'center' }} // Adjust the position of the button
        />

        {/* Vertical FlatList for Rituals */}
        <FlatList
          style={{ flex: 1 }}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <View style={{ alignItems: 'center' }}>
              <TextComponent>
                Start with one. Do it because you choose to be in love with life.
              </TextComponent>
            </View>
          }
          refreshControl={
            <RefreshControl
              tintColor={colors.text}
              refreshing={ritualSkeletonsIsLoading}
              onRefresh={refetchRitualSkeletons}
            />
          }
          renderItem={({ item }) => (
            <CardSkeleton
              name={item.name}
              note={item.note}
              frequency={item.frequency}
              onPress={() => console.log('CardSkeleton pressed')}
            />
          )}
          data={filteredRitualSkeletons}
        />
      </View>
    </ScreenContainer>
  );
}

export default RitualsLibrary;
