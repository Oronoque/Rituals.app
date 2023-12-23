import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, FlatList, ImageBackground } from 'react-native';

import TextComponent from '../TextComponent';

const RitualCategoriesList = ({
  ritualCategories,
  selectedCategory,
  handleCategorySelect,
  setIsCategoryListVisible,
}) => {
  const isCategoryListVisible = !selectedCategory;
  // Assuming the visibility logic is based on whether a category is selected

  return (
    <View
      style={{
        flexDirection: 'row',
        paddingHorizontal: 19,
        marginTop: 12,
        alignItems: 'center',
      }}
    >
      {isCategoryListVisible ? (
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
  );
};

export default RitualCategoriesList;
