import {
  AdMobBanner,
  AdMobInterstitial,
  AdMobRewarded,
  PublisherBanner,
  setTestDeviceIDAsync,
} from "expo-ads-admob";
import React, { useEffect } from "react";
import { Alert } from "react-native";

const ADMOB_BANNER_ID = "ca-app-pub-1528058450389133/2083085086";
const ADMOB_INTERSTITIAL_ID = "ca-app-pub-1528058450389133/2903899085";
const REWARD_ID = "ca-app-pub-1528058450389133/2162817344";

export const BannerAdComponent = () => {
  return (
    <AdMobBanner
      bannerSize="leaderboard"
      adUnitID={
        __DEV__ ? "ca-app-pub-3940256099942544/6300978111" : ADMOB_BANNER_ID
      }
      servePersonalizedAds
      onDidFailToReceiveAdWithError={(error) => console.log(error)}
    />
  );
};
export const PublisherAdComponent = () => {
  useEffect(() => {
    (async () => {
      await setTestDeviceIDAsync("EMULATOR");
    })();
  }, []);

  return (
    <PublisherBanner
      bannerSize="smartBannerPortrait"
      adUnitID={
        __DEV__ ? "ca-app-pub-3940256099942544/6300978111" : ADMOB_BANNER_ID
      }
      servePersonalizedAds
      onDidFailToReceiveAdWithError={(error) => console.log(error)}
      onAdMobDispatchAppEvent={(event) => console.log(event)}
    />
  );
};
export const InterstitialAdComponent = ({ show }) => {
  useEffect(() => {
    if (show) showAd();
  }, [show]);

  const showAd = async () => {
    try {
      console.log("req add");
      await AdMobInterstitial.setAdUnitID(
        __DEV__
          ? "ca-app-pub-3940256099942544/1033173712"
          : ADMOB_INTERSTITIAL_ID
      );
      await AdMobInterstitial.requestAdAsync({ servePersonalizedAds: true });
      await AdMobInterstitial.showAdAsync();
    } catch (err) {
      console.log(err);
    }
  };
  return null;
};
export const RewardAdComponent = ({ next, show }) => {
  useEffect(() => {
    (async () => {
      try {
        AdMobRewarded.addEventListener("rewardedVideoDidRewardUser", (reward) =>
          next(reward)
        );
        AdMobRewarded.addEventListener("rewardedVideoDidFailToLoad", (error) =>
          next()
        );
        AdMobRewarded.addEventListener("rewardedVideoDidClose", () => {
          Alert.alert(
            "AD Closed",
            "Watch full AD to proceed!",
            [
              {
                text: "Not Now",
                onPress: () => {},
                style: "cancel",
              },
              {
                text: "Bring it ON!",
                onPress: () => showAd,
              },
            ],
            { cancelable: false }
          );
        });
      } catch (error) {
        console.log(error);
      }
    })();
    return () => {
      AdMobRewarded.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    if (show) showAd();
  }, [show]);

  const showAd = async () => {
    try {
      await AdMobRewarded.setAdUnitID(REWARD_ID);
      await AdMobRewarded.requestAdAsync({ servePersonalizedAds: true });
      await AdMobRewarded.showAdAsync();
    } catch (err) {
      console.log(err);
    }
  };
  return null;
};
