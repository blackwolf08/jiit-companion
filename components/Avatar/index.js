import LottieView from "lottie-react-native";
import React from "react";
import { StyleSheet, View } from "react-native";
import avatar5 from "../../assets/lottieFiles/avatars/ninja.json";
import { useTheme } from "../../contexts";
import { Mixins } from "../../styles";

export const Avatar = ({ item, navigation }) => {
  const {
    theme: {
      colors: { background, black, text, primary, card },
    },
  } = useTheme();

  return (
    <View style={styles.container}>
      <LottieView
        hardwareAccelerationAndroid
        source={avatar5}
        autoPlay
        loop
        style={styles.lottieStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottieStyles: {
    height: Mixins.scaleSize(40),
    width: Mixins.scaleSize(40),
  },
  container: {
    overflow: "hidden",
    height: Mixins.scaleSize(40),
    width: Mixins.scaleSize(40),
    borderRadius: Mixins.scaleSize(20),
  },
});
