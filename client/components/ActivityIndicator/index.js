import React from 'react';
import { View, ActivityIndicator } from 'react-native';

const ActivityIndicatorScreen = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default ActivityIndicatorScreen;
