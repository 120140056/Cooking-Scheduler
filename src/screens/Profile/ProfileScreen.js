import React, { useState, useLayoutEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { updateEmail, updatePassword, reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth';
import { auth } from '../Login/LoginScreen';
import styles from './style';

const ProfileScreen = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        top: 0,
      },
    });
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigation = useNavigation();

  const handleUpdate = () => {
    const user = auth.currentUser;

    if (user) {
      const credential = EmailAuthProvider.credential(user.email, oldPassword);

      updateEmail(user, email)
            .then(() => {
              console.log('Email updated successfully.');
            })
            .catch((error) => {
              console.log('Error updating email:', error);
            });
            
      reauthenticateWithCredential(user, credential)
        .then(() => {
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
    setOldPassword('');
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
        <Text>Old Password:</Text>
        <TextInput
          style={styles.input}
          value={oldPassword}
          onChangeText={setOldPassword}
          secureTextEntry={!showPassword}
        />
        <Text>New Password:</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            value={password}
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
          onPress={() => Alert.alert('Coming Soon!', 'This feature will be available in a future update.')}
        >
          <Text style={styles.listTitle}>Favorite Ingredients:</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => Alert.alert('Coming Soon!', 'This feature will be available in a future update.')}
        >
          <Text style={styles.listTitle}>Avoided Ingredients:</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => {
          handleUpdate();
          navigation.goBack();
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