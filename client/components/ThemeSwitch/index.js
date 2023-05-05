import React, { useContext } from 'react';
import { Switch, View } from 'react-native';
import { ThemeProvider } from 'styled-components/native';

import { AppContext } from '../../contexts/appContext';

import { lightTheme, darkTheme } from '../theme';

import Text from './Text';

const ThemeSwitch = () => {
  const { appData, updateAppData } = useContext(AppContext);

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
      <Text>Is dark theme:</Text>
      <Switch
        value={appData.isDarkTheme}
        onValueChange={(value) => {
          updateAppData({
            isDarkTheme: value,
          });
        }}
      />
    </View>
  );
};

export default ThemeSwitch;
