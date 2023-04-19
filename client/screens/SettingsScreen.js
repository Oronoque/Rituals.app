import React, { useState, useContext } from 'react';
import { ScrollView } from 'react-native';

import Header from '../components/Header';
import SettingRow from '../components/SettingRow';

import { AppContext } from '../contexts/appContext';

import { ScreenContainer } from '../layout';

function SettingsScreen({ navigation }) {
  const { appData, updateAppData } = useContext(AppContext);

  const [gender, setGender] = useState(null);

  return (
    <ScreenContainer>
      <Header title="Settings" navigation={navigation} />

      <ScrollView>
        <SettingRow
          type="switch"
          icon="notifications-outline"
          text="Activate notifications"
          onChange={(value) => {
            console.log('value:', value);
          }}
        />

        <SettingRow
          type="switch"
          icon="moon-outline"
          text="Dark theme"
          isActive={appData.isDarkTheme}
          onChange={(value) => {
            updateAppData({
              isDarkTheme: value,
            });
          }}
        />

        <SettingRow
          type="select"
          icon="moon-outline"
          iconColor="red"
          text="Gender"
          value={gender}
          options={[
            { label: 'Masculin', value: 'masculin' },
            { label: 'Feminin', value: 'feminin' },
          ]}
          placeholder="Select gender"
          onChange={(value) => {
            setGender(value);
          }}
        />
        <SettingRow icon="moon-outline" type="text" text="Username" value={'lucas@gmail.com'} />
      </ScrollView>
    </ScreenContainer>
  );
}

export default SettingsScreen;
