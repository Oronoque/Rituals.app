import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { TouchableOpacity, View } from 'react-native';

import TextComponent from '../components/TextComponent';
import Button from '../components/Button';
import Loader from '../components/Loader';
import CardRitual from '../components/CardRitual';

import { ScreenContainer } from '../layout';
import { AppContext } from '../contexts/appContext';
import { getRitual } from '../hooks/queries/ritual';

function RitualScreen({ route, navigation }) {
  const ritualIdParam = route?.params?.ritualIdParam;

  const { appData, updateAppData } = useContext(AppContext);
  const { data: ritualData, isLoading } = getRitual({ ritualId: ritualIdParam });

  if (isLoading || !ritualData) {
    return <Loader />;
  }

  return (
    <ScreenContainer>
      <TextComponent>Ritual</TextComponent>

      <CardRitual ritual={ritualData} />

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
