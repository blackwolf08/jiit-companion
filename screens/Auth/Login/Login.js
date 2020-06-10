import React, { useEffect, useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Keyboard,
} from "react-native";
import * as Analytics from "expo-firebase-analytics";

import { useTheme } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";

const Login = ({ navigation }) => {
  const {
    theme: { colors, dark },
  } = useTheme();

  //define states
  const [enrollmentNumber, setenrollmentNumber] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setdisabled] = useState(true);

  useEffect(() => {
    if (password?.length > 0 && enrollmentNumber?.length > 0)
      setdisabled(false);
    else setdisabled(true);
  }, [password, enrollmentNumber]);

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
            placeholder="Password"
            onChangeText={(password) => setPassword(password)}
            secureTextEntry
            value={password}
          />
          <Text style={[styles.muted, { fontSize: Typography.FONT_SIZE_14 }]}>
            Webkiosk password
          </Text>
          <TouchableOpacity>
            <Text
              style={[styles.forgotPasswordText, { color: colors.primary }]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              Keyboard.dismiss();
              navigation.navigate("moredetails", {
                enrollmentNumber,
                password,
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
            <Text style={[styles.logInText, { color: colors.text }]}>
              Continue
            </Text>
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
