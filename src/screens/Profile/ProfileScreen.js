import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { onAuthStateChanged, updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';

import { auth } from '../Login/LoginScreen';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [avoided, setAvoided] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setEmail(user.email || '');
        if (user.providerData[0].providerId === 'password') {
          reauthenticateWithCredential(user, EmailAuthProvider.credential(user.email, password))
            .then(() => {
              setPassword(user.providerData[0].uid);
              setLoading(false);
            })
            .catch((error) => {
              console.log('Error reauthenticating user:', error);
              setPassword(''); // Set an empty password in case of error
              setLoading(false);
            });
        } else {
          setPassword(''); // Set an empty password for non-password based authentication
          setLoading(false);
        }
      }
    });

    return unsubscribe;
  }, []);

  const handleAddFavorite = (ingredient) => {
    setFavorites((prevFavorites) => [...prevFavorites, ingredient]);
  };

  const handleRemoveFavorite = (ingredient) => {
    setFavorites((prevFavorites) =>
      prevFavorites.filter((item) => item !== ingredient)
    );
  };

  const handleAddAvoided = (ingredient) => {
    setAvoided((prevAvoided) => [...prevAvoided, ingredient]);
  };

  const handleRemoveAvoided = (ingredient) => {
    setAvoided((prevAvoided) =>
      prevAvoided.filter((item) => item !== ingredient)
    );
  };

  const handleUpdate = () => {
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email, password);

      reauthenticateWithCredential(user, credential)
        .then(() => {
          updateEmail(user, email)
            .then(() => {
              console.log('Email updated successfully.');
            })
            .catch((error) => {
              console.log('Error updating email:', error);
            });
          updatePassword(user, password)
            .then(() => {
              console.log('Password updated successfully.');
            })
            .catch((error) => {
              console.log('Error updating password:', error);
            });
        })
        .catch((error) => {
          console.log('Error reauthenticating user:', error);
        });
    }
  };

  const handleCancel = () => {
    setEmail('');
    setPassword('');
    setFavorites([]);
    setAvoided([]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />
        <Text>Password:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            value={loading ? 'Loading...' : password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <Text style={styles.passwordVisibilityButton}>
              {showPassword ? 'Hide' : 'Show'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.separator} />
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.listButton}
          //onPress={() => navigation.navigate('IngredientSelection', { favorites, handleAddFavorite, handleRemoveFavorite })}
          onPress={() => Alert.alert('Coming Soon!', 'This feature will be available in a future update.')}
        >
          <Text style={styles.listTitle}>Favorite Ingredients:</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listButton}
          //onPress={() => navigation.navigate('IngredientSelection', { avoided, handleAddAvoided, handleRemoveAvoided })}
          onPress={() => Alert.alert('Coming Soon!', 'This feature will be available in a future update.')}
        >
          <Text style={styles.listTitle}>Avoided Ingredients:</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {
            handleUpdate()
            navigation.goBack()
          }}>
          <Text>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.goBack()}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;