import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
  ActivityIndicator,
} from "react-native";
import * as Analytics from "expo-firebase-analytics";

import { useTheme } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";
import Axios from "axios";
import { JIIT_SOCIAL_BASE_API } from "../../../api/constants";

const Login = ({ navigation }) => {
  const {
    theme: { colors, dark },
  } = useTheme();

  //define states
  const [enrollmentNumber, setenrollmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setdisabled] = useState(true);
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (
      password?.length > 0 &&
      enrollmentNumber?.length > 0 &&
      userName?.length > 0
    )
      setdisabled(false);
    else setdisabled(true);
  }, [password, enrollmentNumber, userName]);

  useEffect(() => {
    Analytics.logEvent("login_page_view");
  }, []);

  return (
    <>
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={colors.black}
        animated
      />
      <View style={[styles.container, { backgroundColor: colors.black }]}>
        <View style={styles.titleConatiner}>
          <Text style={[styles.title, { color: colors.text }]}>
            JIIT Companion
          </Text>
        </View>
        <View style={styles.contentConatiner}>
          <TextInput
            keyboardAppearance={"dark"}
            placeholderTextColor={colors.text}
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                borderColor: colors.card,
                color: colors.text,
              },
            ]}
            placeholder="Your Enrollment number"
            onChangeText={(enrollmentNumber) =>
              setenrollmentNumber(enrollmentNumber)
            }
            value={enrollmentNumber}
          />

          <TextInput
            keyboardAppearance={"dark"}
            placeholderTextColor={colors.text}
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                borderColor: colors.card,
                color: colors.text,
              },
            ]}
            placeholder="Username for JIIT Social"
            onChangeText={(userName) => setUserName(userName)}
            value={userName}
          />
          <TextInput
            keyboardAppearance={"dark"}
            placeholderTextColor={colors.text}
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                borderColor: colors.card,
                color: colors.text,
              },
            ]}
            placeholder="Password (webkiosk)"
            onChangeText={(password) => setPassword(password)}
            secureTextEntry
            value={password}
          />
          <Text style={[styles.muted, { fontSize: Typography.FONT_SIZE_14 }]}>
            Webkiosk password
          </Text>
          {error && (
            <Text
              style={[
                styles.muted,
                { fontSize: Typography.FONT_SIZE_14, color: "red" },
              ]}
            >
              Username already taken
            </Text>
          )}
          <TouchableOpacity>
            <Text
              style={[styles.forgotPasswordText, { color: colors.primary }]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled}
            onPress={async () => {
              Keyboard.dismiss();
              setLoading(true);
              let formData = new FormData();
              formData.append("enrollment_number", enrollmentNumber);
              formData.append("username", userName);
              let res = await new Axios({
                method: "post",
                url: `${JIIT_SOCIAL_BASE_API}/registerUser`,
                data: formData,
                config: { headers: { "Content-Type": "multipart/form-data" } },
              });
              setLoading(false);
              let message = res.data.message;
              console.log(message);
              if (message == "Error Registering User") {
                setError(true);
                return;
              }
              navigation.navigate("moredetails", {
                enrollmentNumber,
                password,
                userName,
              });
            }}
            style={[
              styles.logInButton,
              {
                backgroundColor: colors.primary,
                opacity: disabled ? 0.5 : 1,
                ...Mixins.boxShadow(colors.primary),
              },
            ]}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[styles.logInText, { color: colors.text }]}>
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export const styles = StyleSheet.create({
  title: {
    fontFamily: Typography.HEADER_FONT_FAMILY_REGULAR,
    fontSize: Mixins.scaleSize(42),
  },
  container: {
    flex: 1,
  },
  titleConatiner: {
    flex: 3,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  contentConatiner: {
    flex: 6,
    ...Mixins.padding(40, 40, 0, 40),
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
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
  logInButton: {
    height: Mixins.scaleSize(50),
    borderRadius: Mixins.scaleSize(5),
    marginTop: Mixins.scaleSize(15),
    justifyContent: "center",
    alignItems: "center",
    maxHeight: 50,
  },
  logInText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: "center",
  },
  forgotPasswordText: {
    textAlign: "right",
    marginTop: Mixins.scaleSize(15),
  },
  muted: {
    color: "gray",
    ...Mixins.padding(10, 0, 0, 0),
  },
});

export default Login;
