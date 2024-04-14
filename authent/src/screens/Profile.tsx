import React, { useContext, useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { FAB } from '@rneui/themed';
import Snackbar from 'react-native-snackbar';
import { AppwriteContext } from '../appwrite/appwriteContext';
// import { UserObj } from '../types';

type UserObj = {
  name: string;
  email: string;
};

const Profile = () => {
  const { appwrite, setIsLoggedIn } = useContext(AppwriteContext);
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

  const handleLogout = () => {
    appwrite.logout().then(() => {
      setIsLoggedIn(false);
      Snackbar.show({
        text: 'Logout successful',
        duration: Snackbar.LENGTH_SHORT,
      });
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.text}>{userData?.name}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.text}>{userData?.email}</Text>
      </View>
      <FAB
        placement="right"
        color="#f02e65"
        size="large"
        title="Logout"
        icon={{ name: 'logout', color: '#FFFFFF' }}
        onPress={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFFFFF',
  },
  profileInfo: {
    marginBottom: 15,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#FFFFFF',
  },
  text: {
    fontSize: 16,
    color: '#FFFFFF',
  },
});

export default Profile;
