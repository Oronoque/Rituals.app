import React from 'react';
import { View } from 'react-native';
import RitualCategoryItem from '../RitualCategoryItem';

const CategoryItems = ({ ritualCategories, activeCategoryId, onSelectCategory }) => {
  return ritualCategories?.map((item) => ({
    id: item.id,
    component: () => (
      <RitualCategoryItem
        categoryId={item.id}
        name={item.name}
        isActive={activeCategoryId === item.id}
        onPress={() => onSelectCategory(item.id)}
      />
    ),
  }));
};

export default CategoryItems;
