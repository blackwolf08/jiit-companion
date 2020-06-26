import { useNavigation } from "@react-navigation/native";
import { Notifications } from "expo";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import { Vibration, AsyncStorage } from "react-native";
import { useUser } from "../../contexts";
import { setNotificationToken } from "../../firebase";

export const NotificationsComponent = () => {
  const { user } = useUser();
  const [token, setToken] = useState(null);
  const [notification, setNotification] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    registerForPushNotificationsAsync();
    Notifications.addListener(_handleNotification);
  }, []);

  const registerForPushNotificationsAsync = async () => {
    let existingStatus = await AsyncStorage.getItem("expoPushToken");
    let finalStatus = "";
    if (existingStatus !== "granted") {
      console.log("Asking permission");
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      return;
    }
    await AsyncStorage.setItem("expoPushToken", finalStatus);
    let expoPushToken = await Notifications.getExpoPushTokenAsync();
    setToken(expoPushToken);
    setNotificationToken(expoPushToken, user?.enrollmentNumber);
  };

  if (Platform.OS === "android") {
    Notifications.createChannelAndroidAsync("default", {
      name: "default",
      sound: true,
      priority: "max",
      vibrate: [0, 100, 100, 100],
    });
  }

  const _handleNotification = (_notification) => {
    if (_notification?.origin !== "selected") return;
    Vibration.vibrate();
    let { drawer, screen, postId } = _notification.data.navigation;
    if (postId) navigation.navigate(drawer, { screen, params: { postId } });
    else navigation.navigate(drawer, { screen });
    setNotification(_notification);
  };

  return <></>;
};
