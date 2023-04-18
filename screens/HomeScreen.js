import React, { useContext } from 'react';

import Text from '../components/Text';
import Button from '../components/Button';

import { ScreenContainer } from '../layout';

import { AppContext } from '../contexts/appContext';

function HomeScreen() {
  const { appData, updateAppData } = useContext(AppContext);

  console.log('connected stack');

  console.log('updateAppData:', updateAppData);
  console.log('appData:', appData);

  return (
    <ScreenContainer>
      <Text>Home Screen</Text>

      <Button
        title="Test setup context"
        onPress={() => {
          updateAppData({
            isAuth: true,
          });
        }}
      />
    </ScreenContainer>
  );
}

export default HomeScreen;
