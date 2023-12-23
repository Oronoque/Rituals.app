import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import TextComponent from '../TextComponent';

const Tabata = () => {
  const [workMinutes, setWorkMinutes] = useState(0);
  const [workSeconds, setWorkSeconds] = useState(0);
  const [restMinutes, setRestMinutes] = useState(0);
  const [restSeconds, setRestSeconds] = useState(0);
  const [currentInterval, setCurrentInterval] = useState('work'); // 'work' or 'rest'
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    let intervalId;
    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      toggleInterval();
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeRemaining]);

  useEffect(() => {
    let intervalId;
    if (isRunning && timeRemaining > 0) {
      intervalId = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0 && isRunning) {
      toggleInterval();
    }
    return () => clearInterval(intervalId);
  }, [isRunning, timeRemaining]);

  const startTabata = () => {
    const initialTime =
      currentInterval === 'work' ? workMinutes * 60 + workSeconds : restMinutes * 60 + restSeconds;
    setTimeRemaining(initialTime);
    setIsRunning(true);
  };

  const handleStartStop = () => {
    if (!isRunning) {
      startTabata();
    } else {
      setIsRunning(false);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTimeRemaining(0);
    setCurrentInterval('work');
  };

  const toggleInterval = () => {
    setCurrentInterval((prevInterval) => {
      if (prevInterval === 'work') {
        if (currentInterval === 'rest') {
          setRounds(rounds + 1); // Increment rounds count at the end of each rest interval
        }
        return 'rest';
      } else {
        return 'work';
      }
    });

    const nextTime =
      currentInterval === 'work' ? restMinutes * 60 + restSeconds : workMinutes * 60 + workSeconds;
    setTimeRemaining(nextTime);
  };

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={{ padding: 10, alignItems: 'center' }}>
      <TextComponent style={{ fontSize: 20, marginVertical: 10 }}>Rounds: {rounds}</TextComponent>
      <TextComponent style={{ fontSize: 40, fontWeight: 'bold', marginBottom: 20 }}>
        {formatTime(timeRemaining)}
      </TextComponent>
      <View style={{ flexDirection: 'row', justifyContent: 'center', marginBottom: 20 }}>
        <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
          <TextComponent>Work</TextComponent>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              keyboardType="numeric"
              placeholder="Min"
              value={workMinutes.toString()}
              onChangeText={(text) => setWorkMinutes(parseInt(text, 10) || 0)}
              style={{ margin: 5 }}
            />
            <TextComponent>min</TextComponent>
            <TextInput
              keyboardType="numeric"
              placeholder="Sec"
              value={workSeconds.toString()}
              onChangeText={(text) => setWorkSeconds(parseInt(text, 10) || 0)}
              style={{ margin: 5 }}
            />
            <TextComponent>sec</TextComponent>
          </View>
        </View>

        <View style={{ marginHorizontal: 10, alignItems: 'center' }}>
          <TextComponent>Rest</TextComponent>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TextInput
              keyboardType="numeric"
              placeholder="Min"
              value={restMinutes.toString()}
              onChangeText={(text) => setRestMinutes(parseInt(text, 10) || 0)}
              style={{ margin: 5 }}
            />
            <TextComponent>min</TextComponent>
            <TextInput
              keyboardType="numeric"
              placeholder="Sec"
              value={restSeconds.toString()}
              onChangeText={(text) => setRestSeconds(parseInt(text, 10) || 0)}
              style={{ margin: 5 }}
            />
            <TextComponent>sec</TextComponent>
          </View>
        </View>
      </View>

      <TouchableOpacity onPress={handleStartStop} style={{ marginBottom: 10 }}>
        <TextComponent>{isRunning ? 'Stop' : 'Start'}</TextComponent>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleReset}>
        <TextComponent>Reset</TextComponent>
      </TouchableOpacity>
    </View>
  );
};

export default Tabata;
