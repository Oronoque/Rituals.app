// import React, { useState } from 'react';
// import { Input } from 'react-native-elements';
// import { View } from 'react-native';

// import { useTheme } from 'styled-components/native';
// import Ionicons from '@expo/vector-icons/Ionicons';

// import Text from '../components/Text';
// import Button from '../components/Button';

// import { ScreenContainer } from '../layout';

// function CreateRitual({ navigation }) {
//   const { colors } = useTheme();

//   const [data, setData ] = useState({
//     ritualName: null,
//     ritualCategory: null,
//   });

// return (
//     <ScreenContainer>
//       <Text>Create a Ritual!</Text>

//       <Input
//         placeholder="Name your ritual"
//         placeholderTextColor={colors.placeholder}
//         autoCorrect={false}
//         autoCapitalize='words'
//         value={data.ritualName}
//         label="Ritual Name"
//         inputStyle={{
//             color: colors.Text,
//             fontSize: 18,
//         }}
//         onChangeText={(value)} => {
//             return setData({
//                 ...data,
//                 ritualName: value,
//             });
//         }}
//         leftIcon={<Ionicons name="mail" size={16} color={colors.text} style={{ marginRight: 8 }} />}
//             </ScreenContainer>