import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { Typography, Mixins } from '../../../styles';
import { useTheme } from '../../../contexts';

const Login = ({ navigation }) => {
  const {
    theme: { colors },
  } = useTheme();

  //define states
  const [enrollmentNumber, setenrollmentNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [disabled, setdisabled] = useState(true);

  useEffect(() => {
    if (password?.length > 0 && enrollmentNumber?.length > 0)
      setdisabled(false);
    else setdisabled(true);
  }, [password, enrollmentNumber]);

  return (
    <>
      <StatusBar
        barStyle='light-content'
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
            keyboardAppearance={'dark'}
            placeholderTextColor={colors.border}
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                borderColor: colors.card,
                color: colors.border,
              },
            ]}
            placeholder='Your Enrollment number'
            onChangeText={(enrollmentNumber) =>
              setenrollmentNumber(enrollmentNumber)
            }
            value={enrollmentNumber}
          />

          <TextInput
            keyboardAppearance={'dark'}
            placeholderTextColor={colors.border}
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                borderColor: colors.card,
                color: colors.border,
              },
            ]}
            placeholder='Password'
            onChangeText={(password) => setPassword(password)}
            secureTextEntry
            value={password}
          />
          <TouchableOpacity>
            <Text
              style={[styles.forgotPasswordText, { color: colors.primary }]}
            >
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => navigation.navigate('moredetails')}
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
    fontSize: Typography.FONT_SIZE_28,
  },
  container: {
    flex: 1,
  },
  titleConatiner: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contentConatiner: {
    flex: 6,
    ...Mixins.padding(40, 40, 0, 40),
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  input: {
    height: Mixins.scaleSize(35),
    marginTop: Mixins.scaleSize(15),
    borderRadius: Mixins.scaleSize(4),
    borderWidth: Mixins.scaleSize(1),
    ...Mixins.padding(5, 0, 5, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
  },
  logInButton: {
    ...Mixins.padding(10, 0, 10, 0),
    borderRadius: Mixins.scaleSize(5),
    marginTop: Mixins.scaleSize(15),
  },
  logInText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
  forgotPasswordText: {
    textAlign: 'right',
    marginTop: Mixins.scaleSize(15),
  },
});

export default Login;
