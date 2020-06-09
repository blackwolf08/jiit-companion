import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Keyboard,
} from 'react-native';

import { Typography, Mixins } from '../../../styles';
import { useTheme, useAuth } from '../../../contexts';

const MoreDetails = ({ route }) => {
  const {
    theme: { colors },
  } = useTheme();
  const { login, isLoading } = useAuth();

  // params from login screen
  const { enrollmentNumber, password } = route.params;

  //define states
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [batch, setBatch] = useState('');
  const [year, setYear] = useState('');
  const [college, setCollege] = useState('');
  const [disabled, setdisabled] = useState(true);

  useEffect(() => {
    if (
      dateOfBirth?.length > 0 &&
      batch?.length > 0 &&
      year?.length > 0 &&
      college?.length > 0
    )
      setdisabled(false);
    else setdisabled(true);
  }, [dateOfBirth, batch, year, college]);
  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor={colors.black}
        animated
      />
      <View style={[styles.container, { backgroundColor: colors.black }]}>
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
            placeholder='Your Date of Birth'
            onChangeText={(dateOfBirth) => setDateOfBirth(dateOfBirth)}
            value={dateOfBirth}
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
            placeholder='Batch'
            onChangeText={(batch) => setBatch(batch)}
            value={batch}
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
            placeholder='Year'
            onChangeText={(year) => setYear(year)}
            value={year}
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
            placeholder='College 62, 128, JUET'
            onChangeText={(college) => setCollege(college)}
            value={college}
          />
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              Keyboard.dismiss();
              login({
                enrollmentNumber,
                password,
                dateOfBirth,
                batch,
                year,
                college,
              });
            }}
            style={[
              styles.logInButton,
              {
                backgroundColor: colors.primary,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color='white' />
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
    fontSize: Typography.FONT_SIZE_28,
  },
  container: {
    flex: 1,
  },
  titleConatiner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  contentConatiner: {
    flex: 9,
    ...Mixins.padding(40, 40, 0, 40),
  },
  text: {},
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  logInText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: 'center',
  },
});

export default MoreDetails;
