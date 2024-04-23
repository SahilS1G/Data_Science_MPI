import React from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import History from '../screens/History';
import Profile from '../screens/Profile';
import Response from '../screens/Response';
import Feedback from '../screens/Feedback';

import Ionicons from 'react-native-vector-icons/Ionicons'; // Import Ionicons from react-native-vector-icons
import Features from '../screens/Features';
type ResponseData = {
  class: string;
  confidence: number;
  details: string;
  ismedicinal: boolean;
};

type HistoryItem = {
  email:string
  image: string;
  response: { class: string; confidence: number; details: string; ismedicinal: boolean };
};

type FeaturesItem = {
  img_str : string,
  enhanced_str : string,
  edges_str: string,
  edges_normal_str: string,
}


interface history_ {
  history: HistoryItem[];
}

export type AppStackParamList = {
  History: history_;
  Profile: undefined;
  MPIA: undefined;
  Features: FeaturesItem;
};
export type AppStackParamListResult = {
  Home: undefined;
  History: history_;
  Response: { imageUrl: string; response: ResponseData };
  Feedback: undefined;
  Features: {
    img_str : string,
    enhanced_str : string,
    edges_str: string,
    edges_normal_str: string,
  };
};

const Tab = createBottomTabNavigator<AppStackParamList>();

const Stack = createNativeStackNavigator<AppStackParamListResult>();

export const MPIA = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#3498db', // Adjust header background color
        },
        headerTintColor: '#FFFFFF', // Custom header text color
        headerTitleStyle: {
          fontWeight: 'bold', // Custom header title style
        },
      }}
    >
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Response" component={Response} options={{ title: 'Response' }} />
      <Stack.Screen name="Feedback" component={Feedback} options={{ title: 'Feedback' }} />
      <Stack.Screen name="Features" component={Features} options={{ title: 'Features' }} />
    </Stack.Navigator>
  );
};
export const AppStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="MPIA"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = ''; // Default value is an empty string

          if (route.name === 'MPIA') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'History') {
            iconName = focused ? 'time' : 'time-outline';
          } else if (route.name === 'Profile') {
            iconName = focused ? 'person' : 'person-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3498db', // Custom active tab color
        tabBarInactiveTintColor: '#FFFFFF', // Custom inactive tab color
        tabBarStyle: {
          backgroundColor: '#0B0D32', // Custom tab bar background color
        },
        tabBarLabelStyle: {
          fontSize: 14, // Custom tab label font size
          fontWeight: 'bold', // Custom tab label font weight
        },
      })}
    >
      <Tab.Screen name="MPIA" component={MPIA} options={{ tabBarLabel: 'Home', headerStyle:{backgroundColor:'black'}, headerTintColor:'white' }} />
      <Tab.Screen name="History" component={History} options={{ tabBarLabel: 'History' }} />
      {/* <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Profile' }} /> */}
      <Tab.Screen name="Profile" component={Profile} options={{ tabBarLabel: 'Profile', headerStyle: { backgroundColor: 'black' }, headerTintColor:'white' }}/>

      

    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({});

export default AppStack;
