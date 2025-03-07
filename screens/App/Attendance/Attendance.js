import * as Analytics from "expo-firebase-analytics";
import React, { useEffect } from "react";
import {
  RefreshControl,
  ScrollView,
  StatusBar,
  StyleSheet,
  Vibration,
} from "react-native";
import { AttendanceDayConatiner } from "../../../components";
import BottomModal from "../../../components/BottomModal";
import { useTheme, useUser } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";

const Attendance = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
      dark,
    },
  } = useTheme();
  const { user, loading, refreshAttendance } = useUser();
  let classes = Object.keys(user.attendance);

  useEffect(() => {
    Analytics.logEvent("attendance_screen_view");
    Vibration.vibrate(100);
  }, []);

  if (!classes?.length) return <> </>;
  return (
    <>
      <StatusBar
        barStyle={dark ? "light-content" : "dark-content"}
        backgroundColor={card}
        animated
      />
      <ScrollView
        style={{
          ...Mixins.padding(0, 0, 0, 0),
          ...Mixins.margin(0, 0, 0, 0),
          backgroundColor: background,
        }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={loading} onRefresh={refreshAttendance} />
        }
      >
        {classes.map((className, key) => (
          <AttendanceDayConatiner
            classDetails={user.attendance[className]}
            className={className}
            key={key}
            index={key + 1}
          />
        ))}
      </ScrollView>
      <BottomModal />
    </>
  );
};

export default Attendance;

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.FONT_SIZE_28,
    ...Mixins.padding(10, 0, 10, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
});
