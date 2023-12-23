import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity } from 'react-native';

import TextComponent from '../components/TextComponent';
import Header from '../components/Header';
import { ScreenContainer } from '../layout';
import Button from '../components/Button';
import RitualCategoriesList from '../components/RitualCategoriesList';

import { getRitualCategories } from '../hooks/queries/ritualCategory';

function MissionScreen({ navigation }) {
  const [hasResponse, setHasResponse] = useState(false); // New state to track if the current question has a response
  const [responses, setResponses] = useState({});

  const { data: ritualCategories } = getRitualCategories({});

  const [customTitle, setCustomTitle] = useState(null);
  const [customSubtitle, setCustomSubtitle] = useState(null);
  const [selectedResponse, setSelectedResponse] = useState(null);

  const [currentFlowIndex, setCurrentFlowIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);
  const [currentAnswerIndex, setCurrentAnswerIndex] = useState(null);

  const [answers, setAnswers] = useState([
    {
      missionName: '',
      category: null,
      ritualName: '',
      gears: ['guitar', 'ipad'],
      location: '',
      date: '',
      frequency: '',
      duration: '',
    },
    {
      missionName: '',
      category: null,
      ritualName: '',
      gears: [],
      location: '',
      date: '',
      frequency: '',
      duration: '',
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
    },
    {
      id: 3,
      title: 'Life Categories',
      text: 'Choose which of your life categories this ritual will live in. But we got you for the first one: it be growth!',
      component: (
        <View>
          <RitualCategoriesList
            ritualCategories={ritualCategories}
            handleCategorySelect={(ritualCategory) => {
              if (ritualCategory.name) {
                setCustomSubtitle(ritualCategory.name);
                setCurrentFlowIndex(currentFlowIndex + 1);
              }
            }}
            setIsCategoryListVisible={() => {}}
          />
        </View>
      ),
      withPrevious: true,
      withNext: false,
    },
    {
      id: 4,
      title: 'Name ritual',
      text: 'Name the foundational ritual you must repeat to become there person who achieves this mission. You are what you consistently do!',
      withPrevious: true,
      withNext: true,
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
    },
    {
      id: 7,
      title: 'Date & Time',
      text: 'Date & Time: You need to repeat this habit consistently for success - when will you start (how about today?!) and what days of the week will you choose?',
      withPrevious: true,
      withNext: true,
    },
    {
      id: 8,
      title: 'Frequency',
      text: 'You need to repeat this habit consistently for success - when will you start (how about today?!) and what days of the week will you choose?',
      withPrevious: true,
      withNext: true,
    },
    {
      id: 9,
      title: 'Duration',
      text: 'How long will this take each time? We got you here - unless you disagree. Two hours give you enough time to get into deep focus mode, not so much you get wiped out. Two hours it is.',
      withPrevious: true,
      withNext: true,
    },
    {
      id: 10,
      title: 'Create your ritual',
      text: 'Add the step-by-step, by-you-for-you guide to doing this ritual. You can add as many steps as you need. You can add links to steps that need a soundtrack, or a how-to video. If you need a tool that is not offered, let me know. Select the tools you need, then you can add them to the individual steps.',
      withPrevious: true,
      withNext: true,
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
                onPress={() => {
                  console.log('item:', item);

                  if (currentFlowIndex === 1) {
                    setCurrentAnswerIndex(index);
                    setCustomTitle(item);
                  } else {
                    setCustomTitle(null);
                  }

                  return handleResponseSelect(selectedResponse);
                }}
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

  const handleResponseChange = (text, index) => {
    const questionId = flowItems[currentFlowIndex].id;
    let currentResponses = responses[questionId] ? [...responses[questionId]] : [''];

    currentResponses[index] = text;

    if (text && index === currentResponses.length - 1) {
      currentResponses.push(''); // Add an empty string for the new field
    }

    setResponses({ ...responses, [questionId]: currentResponses });
    setHasResponse(text.trim() !== '');
  };

  const handleResponseSelect = (response) => {
    console.log('Response selected:', response);
    setSelectedResponse(response);
    setHasResponse(true);
    setCurrentFlowIndex((prevIndex) => prevIndex + 1);
  };

  const renderResponseInputs = () => {
    // Do not render input fields for question ID 2 (currentFlowIndex === 1)
    if (currentFlowIndex === 1) {
      return null;
    }

    const questionId = flowItems[currentFlowIndex].id;
    const currentResponses = responses[questionId] || [''];

    return currentResponses.map((response, index) => (
      <TextInput
        key={index}
        value={response}
        onChangeText={(text) => {
          handleResponseChange(text, index);
        }}
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

  console.log('answers', answers);
  console.log('currentAnswerIndex', currentAnswerIndex);

  return (
    <ScreenContainer>
      <Header title={getTitle()} subtitle={customSubtitle} navigation={navigation} />

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
              {selectedResponse && currentFlowIndex > 0 ? selectedResponse : currentFlow.title}
            </TextComponent>
          )}

          <TextComponent>{currentFlow.text}</TextComponent>

          {currentFlow.component}

          {renderResponseInputs()}

          {currentFlowIndex === 1 ? renderFirstQuestionResponses() : null}
        </View>
      )}

      <View>
        <View style={{ flex: 1 }} />

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
            disabled={!hasResponse} // Disable the button if there is no response
          />
        )}
      </View>
    </ScreenContainer>
  );
}

export default MissionScreen;
