import React from 'react';
import { FlatList } from 'react-native';
import { View } from 'react-native';

const HorizontalList = ({ items = [], height = 120 }) => {
  const isComponent = React.isValidElement(items);

  if (isComponent) {
    return <View style={{ maxHeight: height }}>{items}</View>;
  }

  return (
    <FlatList
      horizontal
      data={items}
      style={{ borderWidth: 0, maxHeight: height }}
      keyExtractor={(item) => {
        return item.id.toString();
      }}
      showsHorizontalScrollIndicator={false}
      renderItem={({ item }) => {
        const { component: DynamicComponent } = item;
        return (
          <View style={{ flex: 1, borderWidth: 0 }}>
            <DynamicComponent />
          </View>
        );
      }}
    />
  );
};

export default HorizontalList;
