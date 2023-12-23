import React, { useState, useCallback } from 'react';
import { View, TouchableOpacity } from 'react-native';
import SettingRow from '../SettingRow';
import TextComponent from '../TextComponent';
import moment from 'moment';
import { useTheme } from 'styled-components/native';

const Scheduler = ({ data, setData }) => {
  const { colors } = useTheme();
  const [showScheduler, setShowScheduler] = useState(false);
  const [ritualScheduled, setRitualScheduled] = useState(null);
  const formatDateTimeDisplay = useCallback(() => {
    return moment(startDate).format('D MMM YYYY, HH:mm');
  }, [startDate]);

  let startDate = data.startDate;
  if (!(startDate instanceof Date && !isNaN(startDate))) {
    startDate = new Date();
    startDate.setHours(0, 0, 0, 0);
  }

  return (
    <View style={{ borderWidth: 0, marginRight: 12 }}>
      <SettingRow
        text={ritualScheduled ? 'scheduled for' : 'not scheduled'}
        type="date"
        value={startDate}
        placeholder="select a date"
        onPressText={() => {
          setRitualScheduled(!ritualScheduled);
          setShowScheduler(!showScheduler);
        }}
        showRightContent={showScheduler}
        onChange={(event) => {
          const {
            nativeEvent: { timestamp },
          } = event;
          setData({ ...data, startDate: new Date(timestamp) });
        }}
      />
    </View>
  );
};

export default Scheduler;
