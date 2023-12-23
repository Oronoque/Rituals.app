import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, TouchableOpacity } from 'react-native';

import TextComponent from '../components/TextComponent';
import Header from '../components/Header';
import { ScreenContainer } from '../layout';
import Button from '../components/Button';
import RitualCategoriesList from '../components/RitualCategoriesList';

const flowItems = [
  {
    id: 1,
    title: 'Life Missions',
    text: 'Life Missions: What is everything you want to achieve before you die? Answer in the form "verb-achievement", like "create the most useful app in the world" or "play the Star-Spangled Banner like Jimi Hendrix".',
    responseCount: 10,
  },
  {
    id: 2,
    title: 'Current Mission',
    text: 'Pick ONE thing to focus on until it is done. This will be your mission until it is done!',
  },
  {
    id: 3,
    title: 'Life Categories',
    text: 'Choose which of your life categories this ritual will live in. But we got you for the first one: it be growth!',
    component: (
      <>
        <RitualCategoriesList />
      </>
    ),
  },
  {
    id: 4,
    title: 'Name ritual',
    text: 'Name the foundational ritual you must repeat to become there person who achieves this mission. You are what you consistently do!',
  },
  {
    id: 5,
    title: 'Gear',
    text: 'What do you need to do this habit? Think deeply: "laptop, charger, internet" or "guitar, tuner, ipad, internet" ',
    responseCount: 10,
  },
  {
    id: 6,
    title: 'Location',
    text: 'Where will you do this habit? "anywhere quiet" or "in the closet"',
  },
  {
    id: 7,
    title: 'Date & Time',
    text: 'Date & Time: You need to repeat this habit consistently for success - when will you start (how about today?!) and what days of the week will you choose?',
  },
  {
    id: 8,
    title: 'Frequency',
    text: 'You need to repeat this habit consistently for success - when will you start (how about today?!) and what days of the week will you choose?',
  },
  {
    id: 9,
    title: 'Duration',
    text: 'How long will this take each time? We got you here - unless you disagree. Two hours give you enough time to get into deep focus mode, not so much you get wiped out. Two hours it is.',
  },
  {
    id: 10,
    title: 'Create your ritual',
    text: 'Add the step-by-step, by-you-for-you guide to doing this ritual. You can add as many steps as you need. You can add links to steps that need a soundtrack, or a how-to video. If you need a tool that is not offered, let me know. Select the tools you need, then you can add them to the individual steps.',
  },
];

function MissionScreen({ navigation }) {
  useEffect(() => {
    if (currentQuestionIndex === 1 && selectedResponse) {
      const secondQuestionId = flowItems[1].id;
      setResponses({ ...responses, [secondQuestionId]: selectedResponse });
    }
  }, [selectedResponse, currentQuestionIndex, responses]);
  const [hasResponse, setHasResponse] = useState(false); // New state to track if the current question has a response
  const [responses, setResponses] = useState({});
  const [responseCounts, setResponseCounts] = useState(
    flowItems.reduce((acc, question) => {
      acc[question.id] = question.responseCount || 1; // Default to 1 if not specified
      return acc;
    }, {}),
  );
  const [selectedResponse, setSelectedResponse] = useState(null);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [showSummary, setShowSummary] = useState(false);

  useEffect(() => {
    if (selectedResponse && currentQuestionIndex === 0) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  }, [selectedResponse, currentQuestionIndex]);

  const renderFirstQuestionResponses = () => {
    if (currentQuestionIndex > 0) {
      const firstQuestionResponses = responses[flowItems[0].id] || [];
      return (
        <FlatList
          data={firstQuestionResponses}
          keyExtractor={(item, index) => 'response-' + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => handleResponseSelect(selectedResponse)}
              style={{ alignItems: 'flex-start', marginVertical: 5 }}
            >
              <TextComponent>{item}</TextComponent>
            </TouchableOpacity>
          )}
        />
      );
    }
    return null;
  };

  const handleResponseChange = (text, index) => {
    const questionId = flowItems[currentQuestionIndex].id;
    let currentResponses = responses[questionId] ? [...responses[questionId]] : [''];

    currentResponses[index] = text;

    if (
      text &&
      index === currentResponses.length - 1 &&
      currentResponses.length < responseCounts[questionId]
    ) {
      currentResponses.push(''); // Add an empty string for the new field
    }

    setResponses({ ...responses, [questionId]: currentResponses });
    setHasResponse(text.trim() !== '');
  };

  const handleResponseSelect = (response) => {
    console.log('Response selected:', response);
    setSelectedResponse(response);
    setHasResponse(true);
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const renderResponseInputs = () => {
    // Do not render input fields for question ID 2 (currentQuestionIndex === 1)
    if (currentQuestionIndex === 1) {
      return null;
    }

    const questionId = flowItems[currentQuestionIndex].id;
    const currentResponses = responses[questionId] || [''];

    return currentResponses.map((response, index) => (
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
    const questionId = flowItems[currentQuestionIndex].id;
    const currentResponses = responses[questionId] || [];

    if (index >= currentResponses.length - 1) {
      handleResponseSubmit();
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleResponseSubmit = () => {
    if (currentQuestionIndex < flowItems.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setHasResponse(false);
    } else {
      setShowSummary(true);
    }
  };

  const getTitle = () => {
    if (currentQuestionIndex > 1 && responses[flowItems[1].id]) {
      return responses[flowItems[1].id]; // Response from the second question
    }
    return 'Mission';
  };

  return (
    <ScreenContainer>
      <Header title={getTitle()} navigation={navigation} />
      {!showSummary ? (
        <View style={{ paddingHorizontal: 40 }}>
          {flowItems[currentQuestionIndex].title && (
            <TextComponent
              size="veryBig"
              style={{ fontWeight: 'bold', textAlign: 'center', textDecorationLine: 'underline' }}
            >
              {selectedResponse && currentQuestionIndex > 0
                ? selectedResponse
                : flowItems[currentQuestionIndex].title}
            </TextComponent>
          )}

          <TextComponent>{flowItems[currentQuestionIndex].text}</TextComponent>
          {renderResponseInputs()}

          {currentQuestionIndex === 1 ? renderFirstQuestionResponses() : null}
        </View>
      ) : (
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
                  {currentQuestionIndex === 1 && selectedResponse
                    ? selectedResponse
                    : flowItems[currentQuestionIndex].title}
                </TextComponent>
              )}

              <TextComponent>{question.text}</TextComponent>
              <TextComponent>{responses[question.id]}</TextComponent>
            </View>
          ))}
          <TextComponent>Is this what you want?</TextComponent>
        </View>
      )}
      <View
        style={
          {
            // flexDirection: 'column',
            // justifyContent: 'space-between',
            // marginHorizontal: 20,
            // marginBottom: 10,
          }
        }
      >
        <View style={{ flex: 1 }} />
        {currentQuestionIndex > 0 && (
          <Button
            title={currentQuestionIndex === flowItems.length - 1 ? 'Previous' : 'Previous'}
            onPress={handlePrevious}
          />
        )}
        <Button
          title={currentQuestionIndex === flowItems.length - 1 ? 'Finish' : 'Next'}
          onPress={handleResponseSubmit}
          disabled={!hasResponse} // Disable the button if there is no response
        />
      </View>
    </ScreenContainer>
  );
}

export default MissionScreen;
