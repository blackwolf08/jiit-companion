import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { useTheme, useUser } from "../../../contexts";
import {
  BannerAdComponent,
  PublisherAdComponent,
  InterstitialAdComponent,
  RewardAdComponent,
} from "../../../components";

const Rewards = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();

  const [loading, setLoading] = useState(false);

  const { user, setUser } = useUser();

  return (
    <View>
      {/* <BannerAdComponent />
      <PublisherAdComponent />
      <InterstitialAdComponent />
      <RewardAdComponent /> */}
    </View>
  );
};

export default Rewards;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
