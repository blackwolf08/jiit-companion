import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Animated } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Ionicons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';

import { useTheme, useUser } from '../../contexts';
import moment from 'moment';
import {
  getAttendance,
  getCurrClass,
  isClassCompleted,
  toTitleCase,
} from '../../utils';
import { Mixins, Typography } from '../../styles';

let today = moment().format('dddd').toLowerCase();

const TimeTableClass = ({ classDetails, className, index }) => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();

  let { user } = useUser();
  let attendancePercentage = parseInt(classDetails[0]?.Total); // get percentage from attendance list
  let classType;

  switch (classDetails?.length) {
    case 1:
      classType = false; // Show only lab
      break;

    default:
      classType = true; // show 3 for Lab, Lec and Tute
      break;
  }

  return (
    <Animatable.View
      useNativeDriver
      animation='fadeInUp'
      duration={200}
      easing='linear'
      delay={500}
      style={[
        styles.container,
        {
          backgroundColor: background,
        },
      ]}
    >
      <View style={styles.content}>
        <View style={styles.classNameConatiner}>
          <Text style={[styles.className, { color: text }]}>
            {toTitleCase(className)}
          </Text>
        </View>
        <View style={styles.attendanceCircleConatiner}>
          <AnimatedCircularProgress
            size={Mixins.scaleSize(60)}
            width={5}
            fill={attendancePercentage}
            tintColor={primary}
            delay={1500 + 500 * index}
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
      </View>
      <View style={styles.attendanceBoxes}>
        <View style={[styles.total, { backgroundColor: card }]}>
          <Text style={[styles.typeAttendance, { color: text }]}>
            {classDetails[0]?.Total}
          </Text>
        </View>
        {classType && (
          <View style={[styles.total, { backgroundColor: card }]}>
            <Text style={[styles.typeAttendance, { color: text }]}>
              {classDetails[1]?.Class}
            </Text>
          </View>
        )}
        {classType && (
          <View style={[styles.total, { backgroundColor: card }]}>
            <Text style={[styles.typeAttendance, { color: text }]}>
              {classDetails[2]?.Tutorial}
            </Text>
          </View>
        )}
      </View>
    </Animatable.View>
  );
};

export default TimeTableClass;

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    alignItems: 'center',
    ...Mixins.padding(10, 10, 10, 10),
    ...Mixins.margin(10, 10, 0, 10),
    borderRadius: 4,
  },
  content: {
    flexDirection: 'row',
  },
  classNameConatiner: {
    flex: 8,
    justifyContent: 'center',
  },
  attendanceCircleConatiner: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  attendanceBoxes: {
    flexDirection: 'row',
    ...Mixins.padding(10, 10, 10, 10),
    alignItems: 'center',
  },
  total: {
    ...Mixins.margin(0, 0, 0, 10),
    ...Mixins.padding(5, 10, 5, 10),
    width: Mixins.scaleSize(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Mixins.scaleSize(30),
    backgroundColor: '#fff',
  },
  typeAttendance: {},
  attendancePercentage: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
  className: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
});
