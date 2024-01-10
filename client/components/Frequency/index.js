import React, { useState } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';

import TextComponent from '../TextComponent';
import Tag from '../Tag';

const Frequency = ({ data, setData, frequenciesOptions }) => {
  const [isFrequencyListVisible, setIsFrequencyListVisible] = useState(false);

  const handleFrequencySelection = (frequencyValue) => {
    setData({ ...data, frequency: frequencyValue });
    setIsFrequencyListVisible(false);
  };
  const handleResetFrequency = () => {
    setData({ ...data, frequency: null });
  };

  return (
    <View style={{ paddingHorizontal: 19 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity
          onPress={() => setIsFrequencyListVisible(!isFrequencyListVisible)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <TextComponent>
            {data.frequency ? `repeats: ${data.frequency}` : 'does not repeat'}
          </TextComponent>
        </TouchableOpacity>
        <View style={{ marginLeft: 12, marginTop: 4 }}>
          <Tag onPress={handleResetFrequency}>reset</Tag>
        </View>
      </View>

      {isFrequencyListVisible && (
        <FlatList
          data={frequenciesOptions}
          keyExtractor={(item, index) => item.label + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleFrequencySelection(item.value)}
              style={{ padding: 10 }}
            >
              <TextComponent>{item.label}</TextComponent>
            </TouchableOpacity>
          )}
          style={{ paddingHorizontal: 19, marginTop: 12 }}
        />
      )}
    </View>
  );
};

export default Frequency;
