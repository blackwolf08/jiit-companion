import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import avatar from "../../assets/avatar.png";
import { useTheme } from "../../contexts";
import { Mixins } from "../../styles";

export const Avatar = ({ image }) => {
  const {
    theme: {
      colors: { background, black, text, primary, card },
    },
  } = useTheme();

  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : avatar}
        style={styles.lottieStyles}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  lottieStyles: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: "contain",
  },
  container: {
    overflow: "hidden",
    height: Mixins.scaleSize(40),
    width: Mixins.scaleSize(40),
    borderRadius: Mixins.scaleSize(20),
  },
});
