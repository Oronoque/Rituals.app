import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

function TableOfContentCard({ tableOfContent, bgColor = 'transparent', navigation }) {
  return (
    <TouchableOpacity onPress={() => navigation.navigate(tableOfContent.title)}>
      <View
        style={{
          borderWidth: 0.5,
          backgroundColor: bgColor,
          borderRadius: 16,
          padding: 12,
        }}
      >
        <View style={{ fontSize: 18, color: 'darkblue', textAlign: 'left' }}>
          <Text>{tableOfContent.title ? tableOfContent.title : 'blank'}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TableOfContentCard;
