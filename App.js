import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import LoginScreen from './src/screens/Login/LoginScreen'; 
import HomeScreen from './src/screens/Home/HomeScreen';
import ProfileScreen from './src/screens/Profile/ProfileScreen';
import IngredientSelectionScreen from './src/screens/Profile/IngredientSelectionScreen';
import RecipeScreen from './src/screens/Recipe/RecipeScreen';
import RecipesListScreen from './src/screens/RecipesList/RecipesListScreen';
import DrawerContainer from './src/screens/DrawerContainer/DrawerContainer';
import IngredientScreen from './src/screens/Ingredient/IngredientScreen';
import SearchScreen from './src/screens/Search/SearchScreen';
import IngredientsDetailsScreen from './src/screens/IngredientsDetails/IngredientsDetailsScreen';

 const Stack = createStackNavigator();

function MainNavigator() {
  return(
    <Stack.Navigator
      screenOptions={{
          headerTitleStyle: {
            fontWeight: 'bold',
            textAlign: 'center',
            alignSelf: 'center',
            flex: 1,
          }
      }}
    >
      <Stack.Screen options={{ headerShown: false }} name="Login" component={LoginScreen} />
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Profile' component={ProfileScreen}/>
      <Stack.Screen name='IngredientSelection' component={IngredientSelectionScreen}/>
      <Stack.Screen name='Recipe' component={RecipeScreen}/>
      <Stack.Screen name='RecipesList' component={RecipesListScreen} />
      <Stack.Screen name='Ingredient' component={IngredientScreen} />
      <Stack.Screen name='Search' component={SearchScreen} />
      <Stack.Screen name='IngredientsDetails' component={IngredientsDetailsScreen} />
    </Stack.Navigator>
  )
} 



 const Drawer = createDrawerNavigator();

function DrawerStack() {
  return(
    <Drawer.Navigator
      drawerPosition='left'
      initialRouteName='Main'
      drawerStyle={{
        width: 250
      }}
      screenOptions={{headerShown: false}}
      drawerContent={({navigation})=> <DrawerContainer navigation={navigation}/>}
    >
      <Drawer.Screen name='Main' component={MainNavigator} />
    </Drawer.Navigator>
  )
} 

 export default function AppContainer() {
  return(
    <NavigationContainer>
      <DrawerStack/>
    </NavigationContainer>
  )
} 
 

console.disableYellowBox = true;