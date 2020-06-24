import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  AsyncStorage,
  TouchableOpacity,
} from "react-native";
import { useTheme, useUser, useDropDown } from "../../../contexts";
import { getSubjects } from "../../../api/requests";
import { Mixins, Typography } from "../../../styles";
import { SubjectPicker } from "../../../components";

const Results = ({ naigation, route }) => {
  const { calculatedSGPA, prevCGPA, calculatedCGPA } = route.params;
  console.log(calculatedSGPA);
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();

  let { user, setUser } = useUser();
  let { ref } = useDropDown();

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: text }]}>Calculated SGPA</Text>
      <Text style={[styles.text, { color: text }]}>{calculatedSGPA}</Text>
      <Text style={[styles.title, { color: text }]}>Previous CGPA</Text>
      <Text style={[styles.text, { color: text }]}>{prevCGPA}</Text>
      <Text style={[styles.title, { color: text }]}>Calculated CGPA</Text>
      <Text style={[styles.text, { color: text }]}>{calculatedCGPA}</Text>
    </View>
  );
};

export default Results;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_22,
    textAlign: "center",
  },
  title: {
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_22,
    textAlign: "center",
    marginTop: Mixins.scaleSize(20),
  },
});
