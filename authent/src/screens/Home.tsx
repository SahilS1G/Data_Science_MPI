import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Platform } from 'react-native'

import React, { useContext, useState, useEffect } from 'react'
import { FAB } from '@rneui/themed'
import {launchImageLibrary} from 'react-native-image-picker';
import {launchCamera} from 'react-native-image-picker';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Main from './Main';
//snackbaar
import Snackbar from 'react-native-snackbar'
import { AppStack, AppStackParamListResult, MPIA } from '../routes/AppStack'

//context API
import { AppwriteContext } from '../appwrite/appwriteContext'
import { StackScreenProps } from '@react-navigation/stack';
import Loading from '../components/Loading';
// import { ResponseScreenProps } from '../routes/AppStack';

type UserObj = {
  name: string;
  email: string;
};


type HistoryItem = {
  email:string
  image: string;
  response: { class: string; confidence: number; details: string; ismedicinal: boolean };
};

type HomeScreenProps = StackScreenProps<AppStackParamListResult, 'Home'>


const Home: React.FC<HomeScreenProps> = ({ navigation }) => { 
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [response, setResponse] = useState({class: '', confidence: 0, details: '', ismedicinal: false});
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [userId, setUserID] = useState<string>('')
  const { appwrite } = useContext(AppwriteContext);
  const [userData, setUserData] = useState<UserObj>();

  useEffect(() => {
    appwrite.getCurrnetUser().then(response => {
      if (response) {
        const user: UserObj = {
          name: response.name,
          email: response.email,
        };
        setUserData(user);
      }
    });
  }, [appwrite]);
  const handleImageClick = () => {
    console.log("Navigating to Response screen...");
    navigation.navigate('Response', { imageUrl: selectedImage, response: response });
  };

  const addToHistory = (image: string, response: { class: string; confidence: number; details: string; ismedicinal: boolean }) => {
    // setHistory(prevHistory => [...prevHistory, { userData.email,image, response }]);
    if (!userData || !userData.email) {
      console.error('User data not available.');
      return;
    }
  
    const historyData = {
      email: userData.email,
      image,
      response,
    };
  
    fetch('http://localhost:4000/history/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(historyData),
    })
      .then(response => {
        if (response.ok) {
          console.log('History data added successfully.');
        
          setHistory(prevHistory => [...prevHistory, historyData]);
        } else {
          console.error('Failed to add history data:', response.statusText);
        }
      })
      .catch(error => {
        console.error('Error adding history data:', error);
      });
    console.log('History:', history)
  };

  const handleCameraLaunch = () => {
    launchCamera({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    }, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorCode);
      } else {
        let imageUri = String(response.assets?.[0]?.uri);
        setSelectedImage(imageUri);
        
        // Send the selected image to FastAPI backend
        if (imageUri) {
          const formData = new FormData();
          formData.append('file', {
            uri: imageUri,
            type: 'image/jpeg', 
            name: 'image.jpg',
          });

          fetch('http://localhost:3000/predict/', {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(response => response.json())
            .then(data => {
              console.log('Response from FastAPI:', data);
              setResponse(data)
              addToHistory(imageUri, data);
            })
            .catch(error => {
              console.error('Error sending image to FastAPI:', error);
            });
        }
      }
    });
  }

  const openImagePicker = () => {
    launchImageLibrary({
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 2000,
      maxWidth: 2000,
    }, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('Image picker error: ', response.errorCode);
      } else {
        let imageUri = String(response.assets?.[0]?.uri);
        setSelectedImage(imageUri);
        
        if (imageUri) {
          const formData = new FormData();
          formData.append('file', {
            uri: imageUri,
            type: 'image/jpeg', 
            name: 'image.jpg',
          });

          fetch('http://localhost:3000/predict/', {
            method: 'POST',
            body: formData,
            headers: {
              Accept: 'application/json',
              'Content-Type': 'multipart/form-data',
            },
          })
            .then(response => response.json())
            .then(data => {
              console.log('Response from FastAPI:', data);
              setResponse(data)
              addToHistory(imageUri, data);
            })
            .catch(error => {
              console.error('Error sending image to FastAPI:', error);
            });
        }
      }
    });
  };

  
  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Text style={styles.heading}>Welcome to the Home Screen</Text>
        
        {selectedImage && (
          <Pressable onPress={handleImageClick}>
            <Image
              source={{ uri: selectedImage }}
              style={styles.image}
            />
          </Pressable>
        )}
        
        <View style={styles.buttonContainer}>
          <Pressable
            onPress={handleCameraLaunch}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Camera</Text>
          </Pressable>
          
          <Pressable
            onPress={openImagePicker}
            style={[styles.button, styles.galleryButton]}
          >
            <Text style={styles.buttonText}>Gallery</Text>
          </Pressable>

        </View>
        <FAB
          placement="right"
          color="#f02e65"
          size="large"
          title="History"
          icon={{ name: 'history', color: '#FFFFFF' }}
          onPress={() => navigation.navigate('History',{history})}
        />
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 20,
  },
  image: {
    width: 300,
    height: 200,
    marginBottom: 20,
    borderRadius: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  galleryButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
export default Home