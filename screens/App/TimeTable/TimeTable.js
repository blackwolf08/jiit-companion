import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';
import { useTheme, useUser, useAuth } from '../../../contexts';
import { Mixins, Typography } from '../../../styles';
import { getCurrClass, getAttendance } from '../../../utils';
const TimeTable = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();
  let { user, timeTable } = useUser();

  if (!timeTable) return <ActivityIndicator color='white' />;
  return (
    <ScrollView>
      <Text style={[styles.title, { color: text }]}>TimeTable</Text>
    </ScrollView>
  );
};

export default TimeTable;

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.FONT_SIZE_28,
    ...Mixins.padding(10, 0, 10, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
});
