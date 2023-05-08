import React from "react";
import { TouchableHighlight, Image, Share, Alert } from "react-native";
import PropTypes from "prop-types";
import styles from "./styles";

export default function ShareButton(props) {
    const onShare = async () => {
        const [recipeURL, recipeName] = props.shareData
        console.log(recipeURL, recipeName)
        try {
            const result = await Share.share({
                message: recipeURL + "\n Try this recipe \" " + recipeName + "\"!"
            });
            if (result === Share.sharedAction) {
                if (result.activityType) {
                    // Activity share
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            Alert.alert(error.message)
        }
    };


  return (
    <TouchableHighlight onPress={onShare} style={styles.btnContainer}>
      <Image source={require("../../../assets/icons/shareButton.png")} style={styles.btnIcon} />
    </TouchableHighlight>
  );
}

ShareButton.propTypes = {
  onPress: PropTypes.func,
  source: PropTypes.number,
  title: PropTypes.string,
};
