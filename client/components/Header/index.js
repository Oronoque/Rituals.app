import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import TextComponent from '../TextComponent';
import CreateUpdateRitual from '../CreateUpdateRitual';

const Header = ({ title, navigation }) => {
  const { colors } = useTheme();
  const displayTitle = title || 'default';

  const [isCreateRitualOpen, setIsCreateRitualOpen] = useState(false);
  // const displayTitle = customTitle || title;

  console.log('Title:', title);
  // console.log('Custom Title:', customTitle);
  // console.log('Display Title:', displayTitle);

  return (
    <>
      <View
        style={{
          height: 50,
          width: '100%',
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          marginBottom: 30,
          paddingHorizontal: 12,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            setIsCreateRitualOpen(true);
          }}
        >
          <Ionicons name="add-circle" size={30} color="black" />
        </TouchableOpacity>

        <TextComponent size="veryBig" isBold>
          {displayTitle}
        </TextComponent>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="notifications" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {isCreateRitualOpen ? (
        <CreateUpdateRitual
          navigation={navigation}
          isOpen={isCreateRitualOpen}
          onClose={() => {
            setIsCreateRitualOpen(false);
          }}
        />
      ) : null}
    </>
  );
};

export default Header;
