import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './style';

const ProfileScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [avoided, setAvoided] = useState([]);
  const navigation = useNavigation();

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
    // Handle updating email, password, favorites, and avoided ingredients here
  };

  const handleCancel = () => {
    // Handle resetting email, password, favorites, and avoided ingredients here
    setEmail('');
    setPassword('');
    setFavorites([]);
    setAvoided([]);
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
        <TextInput
          style={styles.input}
          value={password}
          onChangeText={setPassword}
          secureTextEntry={true}
        />
      </View>
      <View style={styles.separator} />
      <View style={styles.listContainer}>
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => navigation.navigate('IngredientSelection', { favorites, handleAddFavorite, handleRemoveFavorite })}
        >
          <Text style={styles.listTitle}>Favorite Ingredients:</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.listButton}
          onPress={() => navigation.navigate('IngredientSelection', { avoided, handleAddAvoided, handleRemoveAvoided })}
        >
          <Text style={styles.listTitle}>Avoided Ingredients:</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleUpdate}>
          <Text>Update</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleCancel}>
          <Text>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ProfileScreen;