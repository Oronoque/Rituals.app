import React, { useState } from 'react';
import { TouchableOpacity, View } from 'react-native';

import TextComponent from '../TextComponent';

const CardSkeleton = ({ name, ritualCategoryId, frequency, note, onPress }) => {
  const [showFrequency, setShowFrequency] = useState(false);

  const handlePress = () => {
    setShowFrequency(!showFrequency);
  };
  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        flex: 1,
        borderWidth: 0,
        borderRadius: 8,
        justifyContent: 'center',
        marginBottom: 4,
        padding: 6,
        paddingVertical: 4,
      }}
    >
      <View style={{ borderBottomWidth: 0, paddingVertical: 4 }}>
        <TextComponent marginLeft={12} textColor="black">
          {name}
        </TextComponent>
        {showFrequency && (
          <TextComponent marginLeft={20} isBold>
            {frequency}
          </TextComponent>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default CardSkeleton;
