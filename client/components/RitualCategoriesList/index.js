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
        marginTop: 12,
        alignItems: 'center',
      }}
    >
      {isCategoryListVisible ? (
        <View
          style={{
            position: 'relative',
            padding: 10,
          }}
        >
          <FlatList
            data={ritualCategories}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => {
                  handleCategorySelect(item);
                  setIsCategoryListVisible(false);
                }}
              >
                <TextComponent marginBottom={12}>{item.name}</TextComponent>
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
