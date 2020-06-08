import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../contexts';
import { Typography, Mixins } from '../../styles';
import { TimeTableClass } from '../TimeTableClass';

const TimeTableDayContainer = ({ item: dayWiseTimeTableArray, index }) => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();
  let dayName = Object.keys(dayWiseTimeTableArray)[0];

  return (
    <View style={[styles.conatiner, { backgroundColor: black }]}>
      <Text style={[styles.title, { color: text }]}>
        {dayName?.toUpperCase()}
      </Text>
      {dayWiseTimeTableArray[dayName].map((classArray, key) => (
        <TimeTableClass
          key={`class-${key}`}
          classArray={classArray}
          dayName={dayName}
          delay={200 * (key + 1)}
        />
      ))}
    </View>
  );
};

export default TimeTableDayContainer;

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.FONT_SIZE_24,
    textAlign: 'center',
  },
  conatiner: {
    minHeight: Mixins.WINDOW_HEIGHT - Mixins.scaleSize(120),
  },
});
