import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useTheme } from '../../contexts';
import { Typography } from '../../styles';

const HeaderTitle = ({ title }) => {
  const {
    theme: { colors },
  } = useTheme();

  //define states
  const [enrollmentNumber, setenrollmentNumber] = useState(null);
  const [password, setPassword] = useState(null);
  const [disabled, setdisabled] = useState(true);

  useEffect(() => {
    if (password?.length > 0 && enrollmentNumber?.length > 0)
      setdisabled(false);
    else setdisabled(true);
  }, [password, enrollmentNumber]);

  return (
    <>
      <Text style={[styles.title, { color: colors.text }]}>{title}</Text>
    </>
  );
};

export const styles = StyleSheet.create({
  title: {
    fontFamily: Typography.HEADER_FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_24,
  },
});

export default HeaderTitle;
