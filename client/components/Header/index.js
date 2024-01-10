import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import TextComponent from '../TextComponent';
import CreateUpdateRitual from '../CreateUpdateRitual';

const Header = ({ title, subtitle, navigation }) => {
  const { colors } = useTheme();
  const displayTitle = title || 'default';

  const [isCreateRitualOpen, setIsCreateRitualOpen] = useState(false);

  return (
    <>
      <View
        style={{
          height: 100,
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

        <View style={{ alignItems: 'center' }}>
          <TextComponent size="veryBig" isBold>
            {displayTitle}
          </TextComponent>

          {subtitle ? (
            <TextComponent size="small" isBold>
              {subtitle}
            </TextComponent>
          ) : null}
        </View>

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
