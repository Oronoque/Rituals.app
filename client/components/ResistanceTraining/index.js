import React, { useState } from 'react';
import { View, TextInput, SectionList, TouchableOpacity, StyleSheet } from 'react-native';
import TextComponent from '../TextComponent';

import Checkbox from '../Checkbox';

const exercises = [
  {
    title: 'Chest',
    data: ['Bench Press', 'Push-ups', 'Chest Fly (Machine, Dumbbell)', 'Cable Crossovers'],
  },
  {
    title: 'Back',
    data: [
      'Pull-ups',
      'Lat Pulldowns',
      'Deadlift',
      'Bent-over Rows',
      'Seated Cable Rows',
      'T-Bar Rows',
    ],
  },
];

const ResistanceTraining = () => {
  const [selectedExercise, setSelectedExercise] = useState('');
  const [sets, setSets] = useState('');
  const [totalSets, setTotalSets] = useState(0);
  const [completedSets, setCompletedSets] = useState([]);
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [showExercises, setShowExercises] = useState(true);
  const [workoutSets, setWorkoutSets] = useState([{ reps: '', weight: '', completedSets: [] }]);

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    setShowExercises(false); // Hide the exercise list once an exercise is selected
  };

  const handleReset = () => {
    setSelectedExercise('');
    setShowExercises(true); // Show the exercise list again when resetting
    setSets('');
    setReps('');
    setWeight('');
  };

  const handleAddSet = () => {
    setWorkoutSets([...workoutSets, { reps: '', weight: '', completedSets: [] }]);
  };

  const updateSetDetail = (index, field, value) => {
    const newSets = [...workoutSets];
    newSets[index][field] = value;
    setWorkoutSets(newSets);
  };

  const handleSetCheckbox = () => {
    if (completedSets.length < totalSets) {
      setCompletedSets([...completedSets, completedSets.length]);
    }
  };

  const renderSetInputs = () => {
    return workoutSets.map((set, index) => (
      <View key={index} style={styles.row}>
        <Checkbox
          totalSets={totalSets}
          currentSet={set.completedSets.length}
          onCheck={() => handleSetCheckbox(index)}
          isChecked={set.completedSets.length === totalSets}
        />
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Reps"
            keyboardType="numeric"
            value={set.reps}
            onChangeText={(text) => updateSetDetail(index, 'reps', text)}
            style={styles.input}
          />
        </View>
        <View style={styles.inputWrapper}>
          <TextInput
            placeholder="Weight"
            keyboardType="numeric"
            value={set.weight}
            onChangeText={(text) => updateSetDetail(index, 'weight', text)}
            style={styles.input}
          />
        </View>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      {showExercises && (
        <SectionList
          sections={exercises}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleSelectExercise(item)}
              style={[styles.item, item === selectedExercise && styles.selectedItem]}
            >
              <TextComponent>{item}</TextComponent>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <TextComponent style={styles.sectionHeader}>{title}</TextComponent>
          )}
        />
      )}

      {!showExercises && (
        <View style={styles.inputContainer}>
          <TextComponent>{selectedExercise}</TextComponent>
          {!showExercises && (
            <View style={styles.inputContainer}>
              {renderSetInputs()}
              <View style={styles.row}>
                <TouchableOpacity onPress={handleReset} style={styles.button}>
                  <TextComponent>Reset</TextComponent>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleAddSet} style={styles.button}>
                  <TextComponent>Add Set</TextComponent>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  inputWrapper: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    marginBottom: 5,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  resetButton: {
    padding: 10,
    marginTop: 20,
    backgroundColor: '#ddd',
    alignSelf: 'center',
  },
  item: {
    padding: 10,
  },
  selectedItem: {
    backgroundColor: '#ddd',
  },
  sectionHeader: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  inputContainer: {
    marginTop: 20,
  },
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    padding: 10,
    backgroundColor: '#ddd',
    alignSelf: 'center',
    marginHorizontal: 5,
  },
});

export default ResistanceTraining;
