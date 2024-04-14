import React from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size="large"
        color="#1d9bf0"
        style={styles.indicator}
      />
      <Text style={styles.text}>Loading...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF', 
  },
  indicator: {
    marginBottom: 20, 
  },
  text: {
    fontSize: 18,
    color: '#333333', 
  },
});

export default Loading;
