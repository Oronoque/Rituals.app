import React from 'react';
import { FlatList } from 'react-native';
import { TouchableOpacity, View, Image } from 'react-native';

const HorizontalList = ({ items = [], height = 120 }) => {
  return (
    <FlatList
      horizontal
      data={items}
      style={{ borderWidth: 0, maxHeight: height }}
      keyExtractor={(item) => {
        return item.id;
      }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const { component: DynamicComponent } = item;
        return (
          <View style={{ flex: 1 }}>
            <DynamicComponent image={item.image} />
          </View>
        );
      }}
    />
  );
};

export default HorizontalList;
