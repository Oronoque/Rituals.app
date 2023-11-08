import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

import Text from '../Text';
import CreateUpdateRitualModal from '../CreateUpdateRitualModal';

const Header = ({ title, navigation }) => {
  const { colors } = useTheme();

  const [isCreateRitualOpen, setIsCreateRitualOpen] = useState(false);

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

        <Text>{title}</Text>

        <TouchableOpacity onPress={() => {}}>
          <Ionicons name="notifications" size={30} color="black" />
        </TouchableOpacity>
      </View>

      {isCreateRitualOpen ? (
        <CreateUpdateRitualModal
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
