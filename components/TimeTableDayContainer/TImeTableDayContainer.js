import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useTheme, useUser } from '../../contexts';
import { Mixins, Typography } from '../../styles';
import { TimeTableClass } from '../TimeTableClass';

const TimeTableDayContainer = ({ item: dayWiseTimeTableArray }) => {
  const {
    theme: {
      colors: { text, black },
    },
  } = useTheme();
  const { updateTimeTable } = useUser();
  let dayName = Object.keys(dayWiseTimeTableArray)[0];

  return (
    <View style={[styles.conatiner, { backgroundColor: black }]}>
      <Text style={[styles.title, { color: text }]}>
        {dayName?.toUpperCase()}
      </Text>
      <View>
        <FlatList
          data={dayWiseTimeTableArray[dayName]}
          renderItem={({ item, index, drag, isActive }) => (
            <TimeTableClass
              dayName={dayName}
              delay={200}
              classArray={item}
              drag={drag}
            />
          )}
          keyExtractor={(item, index) => `draggable-item-${index}`}
          onDragEnd={async ({ data }) => updateTimeTable({ data, dayName })}
        />
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
