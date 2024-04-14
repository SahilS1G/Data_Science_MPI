import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { AppStackParamListResult } from '../routes/AppStack';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ResponseData = {
  class: string;
  confidence: number;
  details: string;
  ismedicinal: boolean;
};

type RootStackParamList = {
  ImageResponse: { imageUrl: string, response: ResponseData };
};

export type ResponseScreenProps = StackScreenProps<AppStackParamListResult, 'Response'>; // Define the type for ResponseScreenProps

const Response: React.FC<ResponseScreenProps> = ({ route, navigation }) => { 
  const { imageUrl, response } = route.params;
  const goToFeedbackPage = () => {
    navigation.navigate('Feedback'); // Navigate to Feedback screen
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          source={{ uri: imageUrl }}
          style={styles.image}
          resizeMode="contain"
        />
        <Text style={styles.responseText}>
          Class: {response.class}
        </Text>
        <Text style={styles.responseText}>
          Confidence: {response.confidence}
        </Text>
        <Text style={styles.responseText}>
          Is Medicinal: {response.ismedicinal ? 'Yes' : 'No'}
        </Text>
        <Text style={styles.responseText}>
          Details: {response.details}
        </Text>
        <TouchableOpacity onPress={goToFeedbackPage} style={styles.button}>
          <Text style={styles.buttonText}>Give Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: '#0B0D32',
    padding: 20,
    alignItems: 'center',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
  },
  responseText: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Response;
