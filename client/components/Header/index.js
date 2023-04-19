import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';

const Header = ({ title, navigation }) => {
  const { colors } = useTheme();

  return (
    <View
      style={{
        height: 50,
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 30,
      }}
    >
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('CreateRitual');
        }}
      >
        <Ionicons name="add-circle" size={30} color="black" />
      </TouchableOpacity>

      <Text style={{}}>{title}</Text>

      <TouchableOpacity
        onPress={() => {
          //   navigation.navigate('Nofi');
        }}
      >
        <Ionicons name="notifications" size={30} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;
