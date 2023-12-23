import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity } from 'react-native';
import TextComponent from '../TextComponent';

const Stopwatch = () => {
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 1);
      }, 1000);
    } else {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning]);

  const handleStartStop = () => setIsRunning(!isRunning);
  const handleReset = () => setStopwatchTime(0);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <TextComponent>{formatTime(stopwatchTime)}</TextComponent>
      <TouchableOpacity onPress={handleStartStop}>
        <TextComponent>{isRunning ? 'Stop' : 'Start'}</TextComponent>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset}>
        <TextComponent>Reset</TextComponent>
      </TouchableOpacity>
    </View>
  );
};

export default Stopwatch;
