import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { AppStackParamListResult } from '../routes/AppStack';
import { StackScreenProps } from '@react-navigation/stack';

export type FeedbackScreenProps = StackScreenProps<AppStackParamListResult, 'Feedback'>;

const Feedback: React.FC<FeedbackScreenProps> = () => {
  const [feedback, setFeedback] = React.useState('');

  const handleSubmit = () => {
    console.log('Submitted feedback:', feedback);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Give Feedback</Text>
      <TextInput
        style={styles.input}
        multiline
        placeholder="Type your feedback here..."
        value={feedback}
        onChangeText={setFeedback}
      />
      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Submit Feedback</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
    padding: 20,
    alignItems: 'center',
    color: 'black',
  },
  heading: {
    fontSize: 24,
    color: '#FFFFFF',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 150,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color: 'black',
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Feedback;
