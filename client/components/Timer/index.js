import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import TextComponent from '../TextComponent';

const Timer = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let intervalId;
    if (isRunning && time > 0) {
      intervalId = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    } else if (!isRunning) {
      clearInterval(intervalId);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const handleStartStop = () => setIsRunning(!isRunning);
  const handleReset = () => setTime(0);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <TextInput
        keyboardType="numeric"
        onChangeText={(text) => setTime(parseInt(text, 10))}
        placeholder="Enter time in seconds"
      />
      <TextComponent>{formatTime(time)}</TextComponent>
      <TouchableOpacity onPress={handleStartStop}>
        <TextComponent>{isRunning ? 'Stop' : 'Start'}</TextComponent>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset}>
        <TextComponent>Reset</TextComponent>
      </TouchableOpacity>
    </View>
  );
};

export default Timer;
