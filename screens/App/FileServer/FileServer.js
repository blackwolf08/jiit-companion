import React, { useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import firebase from 'firebase';

import { useTheme } from '../../../contexts';
import { Mixins, Typography } from '../../../styles';
const FileServer = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();

  useEffect(() => {
    firebase.analytics().logEvent('fileserver_page_view');
  }, []);
  return (
    <ScrollView>
      <Text style={[styles.title, { color: text }]}>FileServer</Text>
    </ScrollView>
  );
};

export default FileServer;

const styles = StyleSheet.create({
  title: {
    fontSize: Typography.FONT_SIZE_28,
    ...Mixins.padding(10, 0, 10, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
});
