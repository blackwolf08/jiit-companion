import { Notifications } from "expo";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import React, { useEffect, useState } from "react";
import { useUser } from "../../contexts";
import { setNotificationToken } from "../../firebase";
import { Vibration } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(
        Permissions.NOTIFICATIONS
      );
      let finalStatus = existingStatus;
      if (existingStatus !== "granted") {
        const { status } = await Permissions.askAsync(
          Permissions.NOTIFICATIONS
        );
        finalStatus = status;
      }
      if (finalStatus !== "granted") {
        return;
      }
      let expoPushToken = await Notifications.getExpoPushTokenAsync();
      setToken(expoPushToken);
      setNotificationToken(expoPushToken, user?.enrollmentNumber);
    } else {
      alert("Must use physical device for Push Notifications");
    }

    if (Platform.OS === "android") {
      Notifications.createChannelAndroidAsync("default", {
        name: "default",
        sound: true,
        priority: "max",
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  const _handleNotification = (_notification) => {
    Vibration.vibrate();
    console.log(_notification);
    let { drawer, screen } = _notification.data.navigation;
    navigation.navigate(drawer, { screen });
    setNotification(_notification);
  };

  return <></>;
};
