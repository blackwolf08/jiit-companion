import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { useTheme, useUser } from '../../../contexts';
import { Mixins, Typography } from '../../../styles';
import { AttendanceDayConatiner } from '../../../components';

const Attendance = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();
  const { user } = useUser();
  let classes = Object.keys(user.attendance);

  if (!classes?.length) return <> </>;
  return (
    <ScrollView
      style={{ ...Mixins.padding(0, 0, 0, 0), backgroundColor: black }}
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
