import * as Analytics from "expo-firebase-analytics";
import React, { useEffect } from "react";
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAuth, useTheme, useUser } from "../../../contexts";
import { Colors, Mixins, Typography } from "../../../styles";

const ThemeButtons = ({ item }) => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
    setTheme,
  } = useTheme();

  useEffect(() => {
    Analytics.logEvent("settings_page_view");
  }, []);

  const { setUser } = useUser();
  return (
    <TouchableOpacity
      onPress={async () => {
        let user = await AsyncStorage.getItem("user");
        user = JSON.parse(user);
        user.theme = item;
        await AsyncStorage.setItem("user", JSON.stringify(user));
        setUser(user);
        // setTheme(Colors[item])
      }}
      style={[styles.button, { backgroundColor: Colors[item].colors.card }]}
    >
      <Text style={[styles.buttonText, { color: Colors[item].colors.text }]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

const Settings = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();
  const { setisAuthenticated } = useAuth();

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: black }]}>
        <Text style={[styles.title, { color: text }]}>Theme</Text>

        {["dark", "light", "pink"].map((item, index) => (
          <ThemeButtons key={`key-button-${index}`} item={item} index={index} />
        ))}
      </ScrollView>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
          setisAuthenticated(false);
          // setTheme(Colors[item])
        }}
        style={[styles.logoutButton]}
      >
        <Text style={[styles.buttonText, { color: "#fff" }]}>Logout</Text>
      </TouchableOpacity>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: Typography.FONT_SIZE_28,
    ...Mixins.padding(10, 0, 10, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  buttonText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  button: {
    ...Mixins.padding(20, 20, 20, 20),
    justifyContent: "center",
    alignItems: "center",
    marginTop: Mixins.scaleSize(10),
    borderRadius: 2,
  },
  flatList: {
    height: Mixins.scaleSize(60),
  },
  logoutButton: {
    backgroundColor: "#eb4d4b",
    ...Mixins.padding(30, 0, 30, 0),
    alignItems: "center",
    marginTop: Mixins.scaleSize(30),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
