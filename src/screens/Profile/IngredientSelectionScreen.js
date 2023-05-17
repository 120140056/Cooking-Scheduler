import React, { useState, useLayoutEffect, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import styles from './style';
import { ingredients } from '../../data/dataArrays';
import { auth, db } from '../Login/LoginScreen';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const IngredientSelectionScreen = ({ route, navigation }) => {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        top: 0,
      },
    });
  }, []);

  const [selectedIngredients, setSelectedIngredients] = useState([]);

  useEffect(() => {
    const fetchSelectedIngredients = async () => {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        const docRef = doc(db, 'users', uid);
        const docSnap = await getDoc(docRef);
        const data = docSnap.data();
        if (data && data.selectedIngredients) {
          const selectedIngredientsIds = data.selectedIngredients.map((ingredient) => ingredient.ingredientId);
          setSelectedIngredients(selectedIngredientsIds);
        }
      }
    };

    fetchSelectedIngredients();
  }, []);

  const handleSelectIngredient = (ingredient) => {
    const ingredientId = ingredient.ingredientId;

    setSelectedIngredients((prevSelectedIngredients) =>
      prevSelectedIngredients.includes(ingredientId)
        ? prevSelectedIngredients.filter((id) => id !== ingredientId)
        : [ingredientId, ...prevSelectedIngredients]
    );
  };

  const handleSaveIngredients = async () => {
    const selectedIngredientsDetails = selectedIngredients.map((ingredientId) => {
      const { name } = ingredients.find(
        (ingredient) => ingredient.ingredientId === ingredientId
      );
      return { ingredientId, name };
    });
  
    try {
      const user = auth.currentUser;
      if (user) {
        const uid = user.uid;
        await setDoc(doc(db, 'users', uid), {
          selectedIngredients: selectedIngredientsDetails,
        });
        console.log('Selected ingredients uploaded successfully!');
      } else {
        console.log('User not logged in');
      }
    } catch (error) {
      console.log('Error uploading selected ingredients:', error);
    }
  
    navigation.goBack();
  };
    

  const displayedIngredients = ingredients
    .map(({ ingredientId, name }) => ({
      ingredientId,
      name,
      selected: selectedIngredients.includes(ingredientId),
    }))
    .sort((a, b) => {
      if (a.selected && !b.selected) {
        return -1;
      }
      if (!a.selected && b.selected) {
        return 1;
      }
      return 0;
    });

  return (
    <ScrollView style={styles.container}>
      <View style={{ alignItems: 'center', paddingBottom: 10 }}>
        <TouchableOpacity style={styles.button} onPress={handleSaveIngredients}>
          <Text>Save</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator} />
      {displayedIngredients.map((ingredient) => (
        <TouchableOpacity
          key={ingredient.ingredientId}
          style={[
            styles.listItem,
            ingredient.selected && styles.listItemActive,
          ]}
          onPress={() => handleSelectIngredient(ingredient)}
        >
          <Text>{ingredient.name}</Text>
        </TouchableOpacity>
      ))}
      <View style={styles.separator} />
    </ScrollView>
  );
};

export default IngredientSelectionScreen;