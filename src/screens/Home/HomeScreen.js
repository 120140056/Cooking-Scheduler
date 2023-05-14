import React, { useEffect, useLayoutEffect, useState } from "react";
import { FlatList, Text, View, TouchableHighlight, Image, ScrollView } from "react-native";
import styles from "./styles";
import { recipes } from "../../data/dataArrays";
import MenuImage from "../../components/MenuImage/MenuImage";
import { getCategoryName } from "../../data/MockDataAPI";
import { db } from "../Login/LoginScreen";
import { collection, getDocs } from "firebase/firestore";

export default function HomeScreen(props) {
  const { navigation } = props;
  const [preference, setPreference] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitleStyle: {
        top: 0,
      },
      headerLeft: () => (
        <MenuImage
          onPress={() => {
            navigation.openDrawer();
          }}
        />
      ),
      headerRight: () => <View />,
    });
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "AvoidedIngredients"));
      const preferenceData = querySnapshot.docs.map((doc) => doc.data().AvoidedIngredients);
      setPreference(preferenceData);
    };

    fetchData();
  }, []);

  const onPressRecipe = (item) => {
    navigation.navigate("Recipe", { item });
  };

  const getRandomRecipes = (count) => {
    const filteredRecipes = recipes.filter((recipe) => {
      for (let i = 0; i < preference.length; i++) {
        if (recipe.ingredients.includes(preference[i][0])) {
          return false;
        }
      }
      return true;
    });

    const shuffledRecipes = filteredRecipes.sort(() => 0.5 - Math.random());

    return shuffledRecipes.slice(0, count);
  };

  const renderRecipes = ({ item }) => (
    <TouchableHighlight underlayColor="rgba(73,182,77,0.9)" onPress={() => onPressRecipe(item)}>
      <View style={styles.container}>
        <Image style={styles.photo} source={{ uri: item.photo_url }} />
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.category}>{getCategoryName(item.categoryId)}</Text>
      </View>
    </TouchableHighlight>
  );

  const randomRecipes = getRandomRecipes(4);

  return (
    <ScrollView>
      <Text style={styles.recommendationTitle}>Recommend Meal</Text>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={randomRecipes}
        renderItem={renderRecipes}
        keyExtractor={(item) => item.recipeId.toString()}
      />
    </ScrollView>
  );
}