import React from 'react';
import { View, TextInput } from 'react-native';

import TextComponent from '../TextComponent';

const Note = ({ data, setData, colors }) => {
  return (
    <View style={{ paddingHorizontal: 19, marginTop: 12 }}>
      <TextComponent>note: </TextComponent>
      <TextInput
        placeholder="write yourself a little note"
        style={{
          width: '100%',
          minHeight: 80,
          marginTop: 12,
          marginBottom: 40,
          paddingVertical: 8,
          borderColor: colors.borderColor,
          borderWidth: 0,
          paddingHorizontal: 12,
          borderRadius: 10,
          color: colors.textSecondary,
        }}
        placeholderTextColor={colors.placeholder}
        onChangeText={(value) => setData({ ...data, note: value })}
        value={data.note}
        maxLength={1000}
        multiline
        editable
        numberOfLines={4}
      />
    </View>
  );
};

export default Note;
