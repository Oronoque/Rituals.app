import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native-elements';

import TextComponent from '../TextComponent';
import Scheduler from '../Scheduler';

const Schedule = ({ data, setData, frequenciesOptions }) => {
  const [showScheduler, setShowScheduler] = useState(false);

  const handleToggleScheduler = () => {
    setShowScheduler(!showScheduler);
  };

  return (
    <>
      <TouchableOpacity
        onPress={handleToggleScheduler}
        style={{ paddingHorizontal: 19, marginTop: 12 }}
      >
        <TextComponent>{showScheduler ? 'scheduled for' : 'not scheduled'}</TextComponent>
      </TouchableOpacity>

      {/* Frequency selection will always be visible */}
      <Scheduler
        data={data}
        setData={setData}
        frequenciesOptions={frequenciesOptions}
        showFrequencyOnly={true}
      />

      {/* Show date/time scheduling only when showScheduler is true */}
      {showScheduler && (
        <Scheduler
          data={data}
          setData={setData}
          frequenciesOptions={frequenciesOptions}
          showDateSelection={true}
        />
      )}
    </>
  );
};

export default Schedule;
