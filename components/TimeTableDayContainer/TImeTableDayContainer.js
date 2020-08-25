import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme, useUser } from '../../contexts';
import { Mixins, Typography } from '../../styles';
import { TimeTableClass } from '../TimeTableClass';

const TimeTableDayContainer = ({ item: dayWiseTimeTableArray }) => {
  const {
    theme: {
      colors: { text, background },
    },
  } = useTheme();
  const { updateTimeTable } = useUser();
  let dayName = Object.keys(dayWiseTimeTableArray)[0];
  console.log(dayWiseTimeTableArray);
  useEffect(() => {
    if (
      Object.keys(dayWiseTimeTableArray).length == 0 ||
      dayWiseTimeTableArray.length == 0
    ) {
      console.log('REQ new timetable');
      updateTimeTable();
    }
  }, []);

  return (
    <View style={[styles.conatiner, { backgroundColor: background }]}>
      <Text style={[styles.title, { color: text }]}>
        {dayName?.toUpperCase()}
      </Text>
      <View>
        {dayWiseTimeTableArray[dayName]?.map((item, key) => (
          <TimeTableClass
            dayName={dayName}
            classArray={item}
            key={`draggable-item-${key}`}
          />
        ))}
      </View>
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
    minHeight: Mixins.WINDOW_HEIGHT + Mixins.scaleSize(120),
  },
});
