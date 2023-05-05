import React from 'react';
import { SafeAreaView, ActivityIndicator } from 'react-native';

const ActivityIndicatorScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </SafeAreaView>
  );
};

export default ActivityIndicatorScreen;
