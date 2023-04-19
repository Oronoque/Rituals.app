import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TouchableOpacity, View } from 'react-native';

import Text from '../components/Text';
import Button from '../components/Button';
import Loader from '../components/Loader';
import Header from '../components/Header';

import { ScreenContainer } from '../layout';

import { AppContext } from '../contexts/appContext';

function RitualsScreen({ navigation }) {
  const { appData, updateAppData } = useContext(AppContext);

  const [rituals, setRituals] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const loadRituals = async () => {
    setIsLoading(true);

    const res = await axios.get('http://localhost:3009/api/rituals');
    const { data } = res;

    setRituals(data);
    setIsLoading(false);
  };

  useEffect(() => {
    loadRituals();
  }, []);

  const handleDeleteRitual = async ({ ritualId }) => {
    await axios.delete(`http://localhost:3009/api/rituals/${ritualId}`);
    loadRituals();
  };

  if (isLoading || !rituals) {
    return <Loader />;
  }

  return (
    <ScreenContainer>
      <Header title="Rituals" navigation={navigation} />

      {rituals.map((ritual) => {
        console.log('ritual', ritual);

        return (
          <View key={ritual.id} style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('RitualScreen', { ritualIdParam: ritual.id });
              }}
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
            </TouchableOpacity>

            <Button
              title="Delete"
              onPress={() => {
                handleDeleteRitual({ ritualId: ritual.id });
              }}
            />
          </View>
        );
      })}

      <Button title="Refresh" onPress={loadRituals} />
    </ScreenContainer>
  );
}

export default RitualsScreen;
