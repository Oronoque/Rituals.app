import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TouchableOpacity, View } from 'react-native';

import Text from '../components/Text';
import Button from '../components/Button';
import Loader from '../components/Loader';

import { ScreenContainer } from '../layout';

import { AppContext } from '../contexts/appContext';

function RitualScreen({ route, navigation }) {
  const ritualIdParam = route?.params?.ritualIdParam;

  const { appData, updateAppData } = useContext(AppContext);

  const [ritual, setRitual] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadRitual = async () => {
      setIsLoading(true);

      const res = await axios.get(`http://localhost:3009/api/rituals/${ritualIdParam}`);
      const { data } = res;

      setRitual(data);
      setIsLoading(false);
    };

    console.log('HELLO');

    loadRitual();
  }, [ritualIdParam]);

  if (isLoading || !ritual) {
    return <Loader />;
  }

  return (
    <ScreenContainer>
      <Text>Ritual</Text>

      <View
        style={{
          height: 60,
          width: 120,
          borderWidth: 1,
          borderRadius: 8,
          marginHorizontal: 12,
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: 20,
        }}
      >
        <Text isBold>{ritual.name}</Text>
        <Text>{ritual.category}</Text>
      </View>

      <Button
        title="Back"
        onPress={() => {
          navigation.navigate('RitualsScreen');
        }}
      />
    </ScreenContainer>
  );
}

export default RitualScreen;
