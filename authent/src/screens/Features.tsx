import React, { useState } from 'react';
import {  StyleSheet, Text, View,  Image,  ScrollView } from 'react-native';
import { AppStackParamList } from '../routes/AppStack';
import { StackScreenProps } from '@react-navigation/stack';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AppwriteContext } from '../appwrite/appwriteContext';

type FeaturesItem = {
  img_str : string,
  enhanced_str : string,
  edges_str: string,
  edges_normal_str: string,
}

export type FeaturesProps = StackScreenProps<AppStackParamList, 'Features'>;

const Features: React.FC<FeaturesProps> = ({route}) => {

  const {img_str, enhanced_str, edges_str, edges_normal_str} = route.params;
  const base64 = "data:image/png;base64,";
  const img = base64 + img_str;
  const enhanced = base64 + enhanced_str;
  const edges = base64 + edges_str;
  const edges_normal = base64 + edges_normal_str;
    return (
        <ScrollView style={styles.container}>
          <View style={styles.content}>
            <Text style={styles.title}>Leaf Features</Text>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: edges  }} />
              <Text style={styles.description}>Veins Detection</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: edges_normal }} />
              <Text style={styles.description}>Edge Detection</Text>
            </View>
            <View style={styles.imageContainer}>
              <Image style={styles.image} source={{ uri: enhanced }} />
              <Text style={styles.description}>Enhanced Image</Text>
            </View>
          </View>
        </ScrollView>
      );
    };
    
    export default Features;
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#0B0D32',
        padding: 20,
      },
      content: {
        alignItems: 'center',
      },
      title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#ffffff', // white color for text
      },
      imageContainer: {
        marginBottom: 50,
        alignItems: 'center',
      },
      image: {
        width: 300,
        height: 300,
      },
      description: {
        color: '#ffffff',
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
      },
    });
    