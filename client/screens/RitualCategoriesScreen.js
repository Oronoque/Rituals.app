import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';

import Header from '../components/Header';
import Text from '../components/Text';
import Button from '../components/Button';

import { getRitualCategories } from '../hooks/queries/ritualCategory';

import { ScreenContainer } from '../layout';

function RitualsCategoriesScreen({ navigation }) {
  const { data: ritualCategories, refetch, isLoading } = getRitualCategories({});

  if (isLoading) {
    return null;
  }

  return (
    <ScreenContainer>
      <Header title="RitualCategories" navigation={navigation} />

      {ritualCategories.map((ritualCategory) => {
        return <Text key={ritualCategory.id}>{ritualCategory.name}</Text>;
      })}

      <Button title="Refetch" onPress={refetch}></Button>
    </ScreenContainer>
  );
}

export default RitualsCategoriesScreen;
