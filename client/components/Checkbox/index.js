import React, { useState } from 'react';
import { TouchableOpacity, Text } from 'react-native';

const Checkbox = ({ maxCount = 1, color = 'black', size = 'medium' }) => {
  const [count, setCount] = useState(0);

  const sizes = {
    small: 20,
    medium: 30,
    large: 40,
  };

  const handlePress = () => {
    setCount((prev) => {
      if (prev < maxCount) {
        return prev + 1; // Increment count
      } else {
        return maxCount; // Prevent count from exceeding maxCount
      }
    });
  };

  const isChecked = count === maxCount;
  const displayValue = isChecked ? '✓' : count > 0 ? count : '';

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: sizes[size],
        height: sizes[size],
        borderWidth: 1,
        borderColor: color,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text style={{ color }}>{displayValue}</Text>
    </TouchableOpacity>
  );
};

export default Checkbox;
