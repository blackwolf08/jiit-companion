import * as Analytics from "expo-firebase-analytics";
import moment from "moment";
import React, { useEffect } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Vibration,
} from "react-native";
import Carousel from "react-native-snap-carousel";
import { TimeTableDayContainer } from "../../../components";
import { useDropDown, useTheme, useUser } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";

const dayInNumber = parseInt(moment().format("d"));

const TimeTable = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
      dark,
    },
  } = useTheme();

  let { user, timeTable } = useUser();

  let { ref } = useDropDown();

  useEffect(() => {
    Analytics.logEvent("timetable_page_view");
    Vibration.vibrate(100);
  }, []);

  if (!timeTable?.length) return <ActivityIndicator color="white" />;

  const renderItem = ({ item, index }) => {
    return <TimeTableDayContainer item={item} index={index} />;
  };

  return (
    <>
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={black}
        animated
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ ...Mixins.padding(20, 0, 0, 0), backgroundColor: background }}
      >
        {/* <Text style={[styles.title, { color: text }]}>TimeTable</Text> */}
        <Carousel
          data={timeTable}
          renderItem={renderItem}
          sliderWidth={Mixins.WINDOW_WIDTH}
          itemWidth={Mixins.WINDOW_WIDTH}
          loop
          firstItem={dayInNumber - 1}
          enableSnap
          layout={Platform.OS == "web" ? "default" : "stack"}
        />
      </ScrollView>
    </>
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
