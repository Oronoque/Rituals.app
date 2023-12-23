import React from 'react';
import { View, TouchableOpacity } from 'react-native';

import TextComponent from '../TextComponent';

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
          <TextComponent>{tableOfContent.title ? tableOfContent.title : 'blank'}</TextComponent>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TableOfContentCard;
