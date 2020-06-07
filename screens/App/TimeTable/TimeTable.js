import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { TimeTableDayContainer } from '../../../components';
import { useTheme, useUser } from '../../../contexts';
import { Mixins, Typography } from '../../../styles';
import moment from 'moment';

const dayInNumber = parseInt(moment().format('d'));

const TimeTable = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();
  let { user, timeTable } = useUser();

  if (!timeTable?.length) return <ActivityIndicator color='white' />;

  renderItem = ({ item, index }) => {
    return <TimeTableDayContainer item={item} index={index} />;
  };

  return (
    <ScrollView
      style={{ ...Mixins.padding(20, 0, 0, 0), backgroundColor: black }}
    >
      {/* <Text style={[styles.title, { color: text }]}>TimeTable</Text> */}
      <Carousel
        data={timeTable}
        renderItem={renderItem}
        sliderWidth={Mixins.WINDOW_WIDTH}
        itemWidth={Mixins.WINDOW_WIDTH}
        layout='stack'
        loop
        enableMomentum
        enableSnap
        firstItem={dayInNumber}
      />
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
