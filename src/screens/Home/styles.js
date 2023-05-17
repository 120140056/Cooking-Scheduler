import { StyleSheet } from 'react-native';
import { RecipeCard } from '../../AppStyles2';

const styles = StyleSheet.create({
  container: RecipeCard.container,
  title: RecipeCard.title,
  photo: RecipeCard.photo,
  category: RecipeCard.category,
  textButton: RecipeCard.textButton,
  recommendationTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginLeft: 10,
  },
});

export default styles;
