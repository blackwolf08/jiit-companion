import React from 'react';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { styles } from './styles';
import { useTheme } from '../../../contexts';

const Login = () => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <>
      <StatusBar
        barStyle='light-content'
        backgroundColor={colors.background}
        animated
      />
      <View style={[styles?.container, { backgroundColor: colors.background }]}>
        <Text style={[styles?.title, { color: colors.text }]}>
          JIIT Companion
        </Text>
      </View>
    </>
  );
};

export default Login;
