import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  Dimensions,
  View,
  TextInput,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import TextComponent from '../components/TextComponent';
import Header from '../components/Header';
import { ScreenContainer } from '../layout';
import Button from '../components/Button';
import RitualCategoriesList from '../components/RitualCategoriesList';
import { useTheme } from 'styled-components/native';
import moment from 'moment';

import { getRitualCategories } from '../hooks/queries/ritualCategory';
import { frequenciesOptions } from '../constants';

import Scheduler from '../components/Scheduler';
import Frequency from '../components/Frequency';
import Duration from '../components/Duration';
import CreateTask from '../components/CreateTask';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function MissionScreen({ navigation }) {
  const [hasResponse, setHasResponse] = useState(false); // New state to track if the current question has a response
  const [responses, setResponses] = useState({});
  const [currentRitualId, setCurrentRitualId] = useState(null); // State to store the ID of the newly created ritual

  const { data: ritualCategories } = getRitualCategories({});

  const [customTitle, setCustomTitle] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);

  const [currentFlowIndex, setCurrentFlowIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(0);

  const { colors } = useTheme();

  const [answers, setAnswers] = useState([
    {
      missionName: '',
      category: null,
      ritualName: '',
      gear: [],
      location: '',
      date: '',
      frequency: '',
      duration: '',
      tasks: [],
    },
  ]);

  const flowItems = [
    {
      id: 1,
      title: 'Life Missions',
      text: 'Life Missions: What is everything you want to achieve before you die? Answer in the form "verb-achievement", like "create the most useful app in the world" or "play the Star-Spangled Banner like Jimi Hendrix".',
      responseCount: 10,
      withPrevious: false,
      withNext: true,
    },
    {
      id: 2,
      title: 'Current Mission',
      text: 'Pick ONE thing to focus on until it is done. This will be your mission until it is done!',
      withPrevious: true,
      withNext: false,
      responseCount: 0,
    },
    {
      id: 3,
      title: 'Ritual',
      text: 'Name the foundational ritual you must repeat to become the person who achieves this mission.',
      withPrevious: true,
      withNext: true,
      responseCount: 1,
    },
    {
      id: 4,
      title: 'Life Category',
      text: 'Choose which of your life categories this ritual will live in. But we got you for the first one: it be growth!',
      component: (
        <View>
          <RitualCategoriesList
            ritualCategories={ritualCategories}
            handleCategorySelect={(ritualCategory) => {
              if (ritualCategory.name) {
                const newResponses = { ...responses };
                newResponses['selectedCategory'] = ritualCategory.name;
                setResponses(newResponses);
                setCurrentFlowIndex(currentFlowIndex + 1);
              }
            }}
            setIsCategoryListVisible={() => {}}
          />
        </View>
      ),
      withPrevious: true,
      withNext: false,
      responseCount: 0,
    },

    {
      id: 5,
      title: 'Gear',
      text: 'What do you need to do this habit? Think deeply: "laptop, charger, internet" or "guitar, tuner, ipad, internet" ',
      withPrevious: true,
      withNext: true,
      responseCount: 10,
    },
    {
      id: 6,
      title: 'Location',
      text: 'Where will you do this habit? "anywhere quiet" or "in the closet"',
      withPrevious: true,
      withNext: true,
      responseCount: 1,
    },
    {
      id: 7,
      title: 'Date & Time',
      text: 'Date & Time: You need to repeat this habit consistently for success - when will you start (how about today?!) and what days of the week will you choose?',
      withPrevious: true,
      withNext: true,
      responseCount: 0,
      component: (
        <View>
          {answers[currentAnswerIndex] ? (
            <Scheduler
              data={answers[currentAnswerIndex]}
              setData={(newData) => {
                handleSchedulerData(newData, currentAnswerIndex);
                const formattedDate = moment(newData.startDate).format('D MMM YYYY, HH:mm');
                const newResponses = { ...responses };
                newResponses['selectedDate'] = formattedDate;
                console.log('Updated responses with date:', newResponses);
                setResponses(newResponses);
              }}
            />
          ) : (
            <TextComponent>Loading...</TextComponent>
          )}
        </View>
      ),
    },
    {
      id: 8,
      title: 'Frequency',
      text: 'You need to repeat this habit consistently for success - when will you start (how about today?!) and what days of the week will you choose?',
      withPrevious: true,
      withNext: true,
      responseCount: 0,
      component: (
        <View>
          {answers[currentAnswerIndex] ? (
            <Frequency
              data={answers[currentAnswerIndex]}
              setData={(newData) => {
                handleSchedulerData(newData, currentAnswerIndex);
                const newResponses = { ...responses };
                newResponses['selectedFrequency'] = newData.frequency;
                setResponses(newResponses);
              }}
              frequenciesOptions={frequenciesOptions}
            />
          ) : (
            <TextComponent>Loading...</TextComponent>
          )}
        </View>
      ),
    },
    {
      id: 9,
      title: 'Duration',
      text: 'How long will this take each time? We got you here - unless you disagree. Two hours give you enough time to get into deep focus mode, not so much you get wiped out. Two hours it is.',
      withPrevious: true,
      withNext: true,
      responseCount: 0,
      component: (
        <View>
          {answers[currentAnswerIndex] ? (
            <Duration
              estimatedTime={answers[currentAnswerIndex].duration}
              setEstimatedTime={(newDuration) => {
                const updatedAnswers = [...answers];
                updatedAnswers[currentAnswerIndex] = {
                  ...updatedAnswers[currentAnswerIndex],
                  duration: newDuration,
                };
                setAnswers(updatedAnswers);

                const newResponses = { ...responses };
                newResponses['selectedDuration'] = newDuration;
                setResponses(newResponses);
              }}
              colors={colors}
            />
          ) : (
            <TextComponent>Loading...</TextComponent>
          )}
        </View>
      ),
    },
    {
      id: 10,
      title: 'Create your ritual',
      text: 'Add the step-by-step guide to this ritual. What are the steps you need to take to complete this ritual?',
      withPrevious: true,
      withNext: true,
      responseCount: 0,
      component: (
        <View>
          {answers[currentAnswerIndex] ? (
            <CreateTask
              onTasksChange={(newTasks) => {
                const updatedAnswers = [...answers];
                updatedAnswers[currentAnswerIndex] = {
                  ...updatedAnswers[currentAnswerIndex],
                  tasks: newTasks,
                };
                setAnswers(updatedAnswers);
              }}
              createdRitualId={currentRitualId}
            />
          ) : (
            <TextComponent>Loading...</TextComponent>
          )}
        </View>
      ),
    },
  ];

  useEffect(() => {
    if (selectedResponse && currentFlowIndex === 0) {
      setCurrentFlowIndex(currentFlowIndex + 1);
    }
  }, [selectedResponse, currentFlowIndex]);

  useEffect(() => {
    if (currentFlowIndex === 1 && selectedResponse) {
      const secondQuestionId = flowItems[1].id;
      setResponses({ ...responses, [secondQuestionId]: selectedResponse });
    }
  }, [selectedResponse, currentFlowIndex, responses]);

  useEffect(() => {
    console.log('Current responses:', responses);
  }, [responses]);

  const renderFirstQuestionResponses = () => {
    if (currentFlowIndex > 0) {
      const firstQuestionResponses = responses[flowItems[0].id] || [];
      return (
        <FlatList
          data={firstQuestionResponses}
          keyExtractor={(item, index) => 'response-' + index}
          renderItem={({ item, index }) => {
            console.log('item:', item);

            return (
              <TouchableOpacity
                onPress={() => handleResponseSelect(item)}
                style={{ alignItems: 'flex-start', marginVertical: 5 }}
              >
                <TextComponent>{item}</TextComponent>
              </TouchableOpacity>
            );
          }}
        />
      );
    }
    return null;
  };

  // const handleResponseChange = (text, index) => {
  //   const questionId = flowItems[currentFlowIndex].id;
  //   let currentResponses = responses[questionId] ? [...responses[questionId]] : [];

  //   currentResponses[index] = text;

  //   if (
  //     text &&
  //     index === currentResponses.length - 1 &&
  //     currentResponses.length < flowItems[currentFlowIndex].responseCount
  //   ) {
  //     currentResponses.push('');
  //   }

  //   setResponses({ ...responses, [questionId]: currentResponses });
  //   setHasResponse(text.trim() !== '');
  // };

  const handleResponseChange = (text, index) => {
    const questionId = flowItems[currentFlowIndex].id;
    let currentResponses = responses[questionId] ? [...responses[questionId]] : [];

    currentResponses[index] = text;

    if (
      text &&
      index === currentResponses.length - 1 &&
      currentResponses.length < flowItems[currentFlowIndex].responseCount
    ) {
      currentResponses.push('');
    }

    setResponses({ ...responses, [questionId]: currentResponses });
    setHasResponse(text.trim() !== '');
  };

  const handleResponseSelect = (response) => {
    console.log(`Response selected for currentFlowIndex ${currentFlowIndex}:`, response);
    if (flowItems[currentFlowIndex].id === 2) {
      setResponses((prevResponses) => ({
        ...prevResponses,
        [flowItems[currentFlowIndex].id]: response,
      }));
      setSelectedResponse(response);
    }
    setHasResponse(response != null);
    setCurrentFlowIndex((prevIndex) => prevIndex + 1);
  };

  // const handleSchedulerData = (newData, index) => {
  //   const updatedAnswers = [...answers];
  //   updatedAnswers[index] = { ...updatedAnswers[index], ...newData };
  //   setAnswers(updatedAnswers);
  //   setHasResponse(true);
  // };

  const handleSchedulerData = (newData, index) => {
    const updatedAnswers = [...answers];
    updatedAnswers[index] = { ...updatedAnswers[index], ...newData };
    setAnswers(updatedAnswers);

    // Set the response for the date to "not scheduled" if no date is selected
    const formattedDate = newData.startDate
      ? moment(newData.startDate).format('D MMM YYYY, HH:mm')
      : 'not scheduled';
    const newResponses = { ...responses };
    newResponses['selectedDate'] = formattedDate;
    console.log('Updated responses with date:', newResponses);
    setResponses(newResponses);
    setHasResponse(true);
  };

  const renderResponseInputs = () => {
    if (currentFlowIndex === 1) {
      return null;
    }

    const questionId = flowItems[currentFlowIndex].id;
    const currentResponses = responses[questionId] || [''];

    return currentResponses
      .slice(0, flowItems[currentFlowIndex].responseCount)
      .map((response, index) => (
        <TextInput
          key={index}
          value={response}
          onChangeText={(text) => handleResponseChange(text, index)}
          placeholder={`Response ${index + 1}`}
          returnKeyType={index === currentResponses.length - 1 ? 'done' : 'next'}
          onSubmitEditing={() => handleInputSubmit(index)}
        />
      ));
  };

  const handleInputSubmit = (index) => {
    const questionId = flowItems[currentFlowIndex].id;
    const currentResponses = responses[questionId] || [];

    if (index >= currentResponses.length - 1) {
      handleResponseSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentFlowIndex > 0) {
      if (currentFlowIndex === 2) {
        setCustomTitle(null);
      }
      setCurrentFlowIndex(currentFlowIndex - 1);
    }
  };

  const handleResponseSubmit = () => {
    // Check if we are submitting the gear question
    if (currentFlowIndex === flowItems.findIndex((item) => item.title === 'Gear')) {
      // Assuming gear responses are stored in an array
      const gearResponses = responses[5]; // Replace '5' with the actual ID for the gear question
      if (gearResponses) {
        // Update the gear array in the answers state
        const updatedGear = gearResponses.filter(Boolean).join(', ');
        setAnswers((prevAnswers) => {
          const updatedAnswers = [...prevAnswers];
          updatedAnswers[currentAnswerIndex].gear = updatedGear;
          return updatedAnswers;
        });
      }
    }

    // Proceed to the next question or show summary
    if (currentFlowIndex < flowItems.length - 1) {
      setCurrentFlowIndex(currentFlowIndex + 1);
      setHasResponse(false);
    } else {
      setShowSummary(true);
    }
  };

  const getTitle = () => {
    if (customTitle) {
      return customTitle;
    }
    if (currentFlowIndex > 1 && responses[flowItems[1].id]) {
      return responses[flowItems[1].id]; // Response from the second question
    }
    return 'Mission';
  };

  const currentFlow = flowItems[currentFlowIndex];

  const renderAnsweredQuestions = () => {
    return flowItems.slice(1, currentFlowIndex).map((item) => {
      let response;
      if (item.id in responses) {
        response = responses[item.id];
      } else if (item.id === 4) {
        response = responses['selectedCategory'];
      } else if (item.id === 5) {
        response =
          answers[currentAnswerIndex].gear.length > 0
            ? answers[currentAnswerIndex].gear.join(', ')
            : '';
      } else if (item.id === 7) {
        response = responses['selectedDate'] || 'not scheduled';
      } else if (item.id === 8) {
        response = responses['selectedFrequency'] || 'does not repeat';
      } else if (item.id === 9) {
        response = responses['selectedDuration'];
      }

      return (
        <View key={item.id} style={{ marginBottom: 8 }}>
          <View style={{ flexDirection: 'row' }}>
            <TextComponent style={{ fontWeight: 'bold' }}>{item.title}:</TextComponent>
            <TextComponent>{response}</TextComponent>
          </View>
        </View>
      );
    });
  };

  const renderTasks = () => {
    if (currentAnswerIndex != null && answers[currentAnswerIndex]) {
      const tasks = answers[currentAnswerIndex].tasks || [];

      return tasks.map((task, index) => (
        <View key={index} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TextComponent style={{ fontWeight: 'bold' }}>Task {index + 1}:</TextComponent>
          <TextComponent>{task.name}</TextComponent>{' '}
        </View>
      ));
    }
    return null;
  };

  return (
    <ScreenContainer>
      <Header title={getTitle()} navigation={navigation} />

      <View style={{ paddingHorizontal: 20 }}>
        {renderAnsweredQuestions()}
        {renderTasks()}
      </View>

      {showSummary ? (
        <View>
          {flowItems.map((question) => (
            <View key={question.id}>
              {question.title && (
                <TextComponent
                  size="veryBig"
                  style={{
                    fontWeight: 'bold',
                    textAlign: 'center',
                    textDecorationLine: 'underline',
                  }}
                >
                  {currentFlowIndex === 1 && selectedResponse
                    ? selectedResponse
                    : currentFlow.title}
                </TextComponent>
              )}

              <TextComponent>{question.text}</TextComponent>
              <TextComponent>{responses[question.id]}</TextComponent>
            </View>
          ))}
          <TextComponent>Is this what you want?</TextComponent>
        </View>
      ) : (
        <View style={{ paddingHorizontal: 40 }}>
          {currentFlow.title && (
            <TextComponent
              size="veryBig"
              style={{ fontWeight: 'bold', textAlign: 'center', textDecorationLine: 'underline' }}
            >
              {currentFlow.title}
            </TextComponent>
          )}
          <TextComponent>{currentFlow.text}</TextComponent>
          {currentFlow.component}
          {currentFlowIndex === 1 ? renderFirstQuestionResponses() : null}
          {renderResponseInputs()}
        </View>
      )}
      <View style={{ paddingTop: windowHeight * 0.15 }}>
        {currentFlow.withPrevious && (
          <Button
            title={currentFlowIndex === flowItems.length - 1 ? 'Previous' : 'Previous'}
            onPress={handlePrevious}
          />
        )}
        {currentFlow.withNext && (
          <Button
            title={currentFlowIndex === flowItems.length - 1 ? 'Finish' : 'Next'}
            onPress={handleResponseSubmit}
          />
        )}
      </View>
    </ScreenContainer>
  );
}

export default MissionScreen;
