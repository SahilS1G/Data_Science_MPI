import React from 'react';
import 'react-native-gesture-handler';
import {
  
  StyleSheet,
  
} from 'react-native';
import Router  from './routes/Router';
import { AppwriteProvider } from './appwrite/appwriteContext';

function App(): React.JSX.Element {

  return (
    <AppwriteProvider>
        <Router/>
    </AppwriteProvider>
  );
}

const styles = StyleSheet.create({
  
});

export default App;
