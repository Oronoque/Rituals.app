import React from 'react';

import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ size = 'large' }) => {
  return (
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size={size} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default Loader;
