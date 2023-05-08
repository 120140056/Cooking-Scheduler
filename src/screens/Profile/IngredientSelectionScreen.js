import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import styles from './style';

const IngredientSelectionScreen = ({ route, navigation }) => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const { type } = route.params;

  const allIngredients = [
    'Ingredient 1',
    'Ingredient 2',
    'Ingredient 3',
    'Ingredient 4',
    'Ingredient 5',
    'Ingredient 6',
    'Ingredient 7',
    'Ingredient 8',
    'Ingredient 9',
    'Ingredient 10',
  ];

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients((prevSelectedIngredients) =>
      prevSelectedIngredients.includes(ingredient)
        ? prevSelectedIngredients.filter((item) => item !== ingredient)
        : [...prevSelectedIngredients, ingredient]
    );
  };

  const handleSaveIngredients = () => {
    // Handle saving selected ingredients here
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {type === 'favorites' ? 'Favorite Ingredients' : 'Avoided Ingredients'}
      </Text>
      {allIngredients.map((ingredient) => (
        <TouchableOpacity
          key={ingredient}
          style={[
            styles.listItem,
            selectedIngredients.includes(ingredient) && styles.listItemActive,
          ]}
          onPress={() => handleSelectIngredient(ingredient)}
        >
          <Text>{ingredient}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveIngredients}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

export default IngredientSelectionScreen;