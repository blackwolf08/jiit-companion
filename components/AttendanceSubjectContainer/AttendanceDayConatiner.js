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
      colors: {
        background,
        card,
        text,
        primary,
        black,
        backgroundLight,
        border,
      },
    },
  } = useTheme();

  let { user } = useUser();
  let attendancePercentage = parseInt(classDetails[0]?.Total); // get percentage from attendance list
  let classType;

  const cleanAttendanceText = (text) => `${text.split('.')[0]} %`;

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
          backgroundColor: card,
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
            width={Mixins.scaleSize(5)}
            fill={attendancePercentage}
            tintColor={primary}
            delay={500 * index}
            backgroundColor='#3d5875'
            lineCap='round'
            backgroundColor={black}
            rotation={0}
            duration={200}
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
        <View style={[styles.total, { backgroundColor: backgroundLight }]}>
          <Text style={[styles.typeAttendance, { color: text }]}>
            {cleanAttendanceText(classDetails[0]?.Total)}
          </Text>
          <View
            style={[
              styles.classType,
              { backgroundColor: backgroundLight, borderColor: border },
            ]}
          >
            <Text style={[styles.classTypeText, { color: text }]}>T</Text>
          </View>
        </View>
        {classType && (
          <View style={[styles.total, { backgroundColor: backgroundLight }]}>
            <Text style={[styles.typeAttendance, { color: text }]}>
              {cleanAttendanceText(classDetails[1]?.Class)}
            </Text>
            <View
              style={[
                styles.classType,
                { backgroundColor: backgroundLight, borderColor: border },
              ]}
            >
              <Text style={[styles.classTypeText, { color: text }]}>L</Text>
            </View>
          </View>
        )}
        {classType && (
          <View style={[styles.total, { backgroundColor: backgroundLight }]}>
            <Text style={[styles.typeAttendance, { color: text }]}>
              {cleanAttendanceText(classDetails[2]?.Tutorial)}
            </Text>
            <View
              style={[
                styles.classType,
                { backgroundColor: backgroundLight, borderColor: border },
              ]}
            >
              <Text style={[styles.classTypeText, { color: text }]}>T</Text>
            </View>
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
    justifyContent: 'space-around',
    width: '100%',
  },
  total: {
    ...Mixins.margin(0, 0, 0, 0),
    ...Mixins.padding(5, 10, 5, 10),
    width: Mixins.scaleSize(60),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: Mixins.scaleSize(30),
    backgroundColor: '#fff',
    position: 'relative',
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
  classType: {
    position: 'absolute',
    top: Mixins.scaleSize(-10),
    left: Mixins.scaleSize(-10),
    height: 20,
    width: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderWidth: 1,
  },
  classTypeText: {
    fontFamily: Typography.FONT_FAMILY_BOLD,
    fontSize: Typography.FONT_SIZE_12,
  },
});
