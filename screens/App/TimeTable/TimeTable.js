import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useTheme } from '../../../contexts';
import { Mixins, Typography } from '../../../styles';
const TimeTable = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();
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
