import * as Analytics from "expo-firebase-analytics";
import React, { useEffect, useState } from "react";
import {
  AsyncStorage,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import axios from "axios";
import { useAuth, useTheme, useUser } from "../../../contexts";
import { Avatar } from "../../../components";
import { Colors, Mixins, Typography } from "../../../styles";
import Modal from "react-native-modal";
import { JIIT_SOCIAL_BASE_API } from "../../../api/constants";

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

  const [userName, setUserName] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setisAuthenticated } = useAuth();
  const { user, setUser } = useUser();

  return (
    <>
      <ScrollView style={[styles.container, { backgroundColor: black }]}>
        <Modal
          isVisible={isModalVisible}
          style={styles.modal}
          onBackdropPress={() => setIsModalVisible(false)}
        >
          <TextInput
            keyboardAppearance={"dark"}
            placeholderTextColor={text}
            style={[
              styles.input,
              {
                backgroundColor: background,
                borderColor: card,
                color: text,
              },
            ]}
            placeholder="Enter your username"
            onChangeText={(userName) => setUserName(userName)}
            value={userName}
          />
          {error && (
            <Text
              style={[
                styles.muted,
                {
                  fontSize: Typography.FONT_SIZE_14,
                  color: "red",
                  backgroundColor: background,
                },
              ]}
            >
              Username already taken
            </Text>
          )}
          <TouchableOpacity
            onPress={async () => {
              Keyboard.dismiss();
              setLoading(true);
              let formData = new FormData();
              formData.append("enrollment_number", user?.enrollmentNumber);
              formData.append("username", userName);
              let res;
              try {
                res = await new axios({
                  method: "post",
                  url: `${JIIT_SOCIAL_BASE_API}/changeUsername`,
                  data: formData,
                  config: {
                    headers: { "Content-Type": "multipart/form-data" },
                  },
                });
              } catch (err) {
                setError(true);
                setLoading(false);
                return;
              }
              setError(false);
              setLoading(false);
              let message = res.data.message;
              console.log(message);
              if (message == "Error Registering User") {
                setError(true);
                return;
              }
              user.userName = userName;
              await AsyncStorage.setItem("user", JSON.stringify(user));
              setUser(user);
              setIsModalVisible(false);
            }}
            style={[styles.button, { backgroundColor: primary, marginTop: 0 }]}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={[styles.buttonText, { color: "#fff" }]}>Done</Text>
            )}
          </TouchableOpacity>
        </Modal>
        <View style={styles.userDetailsContainer}>
          <Avatar />
          <Text style={[styles.title, { color: text }]}>
            Hello {user?.userName}
          </Text>
        </View>
        <Text style={[styles.title, { color: text }]}>Theme</Text>

        {["dark", "light", "pink"].map((item, index) => (
          <ThemeButtons key={`key-button-${index}`} item={item} index={index} />
        ))}
        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={[styles.button, { backgroundColor: primary }]}
        >
          <Text style={[styles.buttonText, { color: "#fff" }]}>
            Change username
          </Text>
        </TouchableOpacity>
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
  userDetailsContainer: {
    flexDirection: "row",
    marginTop: Mixins.scaleSize(20),
    alignItems: "center",
  },
  avatar: {
    height: Mixins.scaleSize(80),
    width: Mixins.scaleSize(80),
  },
  input: {
    height: Mixins.scaleSize(50),
    marginTop: Mixins.scaleSize(15),
    borderRadius: Mixins.scaleSize(4),
    borderWidth: Mixins.scaleSize(1),
    ...Mixins.padding(5, 0, 5, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
  },
  muted: {
    color: "gray",
    ...Mixins.padding(10, 10, 10, 10),
  },
});
