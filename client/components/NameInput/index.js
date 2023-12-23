import React from 'react';
import { Input } from 'react-native-elements';
import { View } from 'react-native';

const NameInput = ({ value, onChange, colors }) => {
  return (
    <View style={{ width: '100%', borderWidth: 0 }}>
      <Input
        placeholderTextColor={colors.placeholder}
        autoCorrect={false}
        autoCapitalize="words"
        value={value}
        placeholder="Name ritual"
        labelStyle={{ paddingHorizontal: 12 }}
        inputStyle={{
          color: colors.text,
          fontSize: 18,
          paddingHorizontal: 12,
          textAlign: 'center',
        }}
        onChangeText={onChange}
      />
    </View>
  );
};

export default NameInput;
