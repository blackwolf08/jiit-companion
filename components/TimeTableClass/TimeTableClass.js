import { Ionicons } from "@expo/vector-icons";
import moment from "moment";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import * as Animatable from "react-native-animatable";
import { AnimatedCircularProgress } from "react-native-circular-progress";
import { useTheme, useUser } from "../../contexts";
import { Mixins, Typography } from "../../styles";
import {
  getAttendance,
  getCurrClass,
  isClassCompleted,
  toTitleCase,
} from "../../utils";

let today = moment().format("dddd").toLowerCase();

const TimeTableClass = ({ classArray, dayName }) => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
      dark,
    },
  } = useTheme();

  let { user } = useUser();
  let attendancePercentage = getAttendance(classArray[3], user.attendance); // get percentage from attendance list
  let className = getCurrClass(classArray[3], user.attendance); // get class name from class code
  let classTime = classArray[0];
  let classType = classArray[1];
  let classRoom = classArray[4]?.substr(1, classArray[4]?.length); // remove "-" from classname eg -G4 to G4
  let isCompleted =
    isClassCompleted(classTime) && today == dayName
      ? "ios-done-all"
      : "ios-checkmark";
  if (!attendancePercentage) {
    attendancePercentage = 100;
  }
  return (
    <Animatable.View
      useNativeDriver
      animation='fadeInUp'
      duration={200}
      easing='linear'
      style={[
        styles.container,
        {
          backgroundColor: card,
          ...Mixins.boxShadow(
            dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.9)"
          ),
        },
      ]}
    >
      <View style={styles.timeConatiner}>
        <Ionicons name={isCompleted} color='gray' size={Mixins.scaleSize(24)} />
        <Text style={[styles.className, { color: text }]}>{classTime}</Text>
      </View>
      <View style={styles.classNameConatiner}>
        <Text style={[styles.className, { color: text }]}>
          {toTitleCase(className)}
        </Text>
        <Text style={[styles.className, { color: text }]}>{classType}</Text>
      </View>
      <View style={styles.roomContainer}>
        <Text style={[styles.className, { color: text }]}>{classRoom}</Text>
      </View>
      <View style={styles.attendanceCircleConatiner}>
        <AnimatedCircularProgress
          size={Mixins.scaleSize(60)}
          width={5}
          fill={attendancePercentage}
          tintColor={primary}
          backgroundColor='#3d5875'
          lineCap='round'
          backgroundColor={black}
          rotation={0}
          duration={1000}
        >
          {(fill) => (
            <Text style={[styles.attendancePercentage, { color: text }]}>
              {parseInt(fill)} %
            </Text>
          )}
        </AnimatedCircularProgress>
      </View>
    </Animatable.View>
  );
};

export default TimeTableClass;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    ...Mixins.padding(20, 10, 20, 10),
    ...Mixins.margin(10, 10, 10, 10),
    borderRadius: 4,
  },
  timeConatiner: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  classNameConatiner: {
    flex: 3,
    ...Mixins.padding(0, 5, 0, 5),
    justifyContent: "center",
  },
  className: {
    fontFamily: "montserrat-md",
    fontSize: Typography.FONT_SIZE_12,
  },
  roomContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  attendanceCircleConatiner: {
    flex: 2,
    alignItems: "center",
    justifyContent: "center",
  },
});
