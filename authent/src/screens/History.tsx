import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, FlatList, Image, TouchableWithoutFeedback } from 'react-native';
import { AppStackParamList } from '../routes/AppStack';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppwriteContext } from '../appwrite/appwriteContext';
type UserObj = {
  name: string;
  email: string;
};

type HistoryItem = {
  email: string;
  image: string;
  response: { class: string; confidence: number; details: string; ismedicinal: boolean };
};

export type HistoryProps = StackScreenProps<AppStackParamList, 'History'>;

const History: React.FC<HistoryProps> = ({ route }) => {
  // const {  } = route.params;
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [expandedImageIndex, setExpandedImageIndex] = useState<number | null>(null);
  const { appwrite } = useContext(AppwriteContext);
  const [userData, setUserData] = useState<UserObj>();

  useEffect(() => {
    fetchHistoryData();
  }, [appwrite,history]); 

  const fetchHistoryData = () => {
    if (appwrite) {
      appwrite.getCurrnetUser().then(response => {
        if (response) {
          const userEmail = response.email;
          fetch(`http://localhost:4000/history/${userEmail}`)
            .then(response => response.json())
            .then(data => {
              setHistory(data);
            })
            .catch(error => {
              console.error('Error fetching history data:', error);
            });
        }
      });
    }
  };

  const toggleExpand = (index: number) => {
    if (expandedImageIndex === index) {
      setExpandedImageIndex(null);
    } else {
      setExpandedImageIndex(index);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {history.length === 0 ? (
          <Text style={styles.noHistoryText}>No history yet</Text>
        ) : (
          <TouchableWithoutFeedback>
            <FlatList
              data={history}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.historyItem}>
                  <TouchableWithoutFeedback onPress={() => toggleExpand(index)}>
                    <Image source={{ uri: item.image }} style={styles.historyImage} />
                  </TouchableWithoutFeedback>
                  {expandedImageIndex === index && (
                    <View>
                      <Text style={styles.historyText}>Class: {item.response.class}</Text>
                      <Text style={styles.historyText}>Confidence: {item.response.confidence}</Text>
                      <Text style={styles.historyText}>
                        Is Medicinal: {item.response.ismedicinal ? 'Yes' : 'No'}
                      </Text>
                      <TouchableWithoutFeedback onPress={() => {}}>
                        <Text style={styles.historyText}>Details: {item.response.details}</Text>
                      </TouchableWithoutFeedback>
                    </View>
                  )}
                </View>
              )}
            />
          </TouchableWithoutFeedback>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  noHistoryText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  historyItem: {
    marginBottom: 20,
  },
  historyImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  historyText: {
    color: '#FFFFFF',
    marginBottom: 5,
  },
});

export default History;
