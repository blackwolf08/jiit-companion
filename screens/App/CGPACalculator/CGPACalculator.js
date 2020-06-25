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

const CGPACalculator = ({ navigation }) => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();

  let { user, setUser } = useUser();
  let { ref } = useDropDown();

  const [subjects, setSubjects] = useState(null);
  const [loading, setLoading] = useState(true);
  const [totalCredits, setTotalCredits] = useState(0);
  const [currentCredits, setCurrentCredits] = useState({});
  const [numberOfSubjects, setNumberOfSubjects] = useState(0);

  useEffect(() => {
    getSubjectsFromAPI();
  }, []);

  const getSubjectsFromAPI = async () => {
    if (user?.subjects) {
      setSubjects(user?.subjects);
      let _totalCredits = 0;
      user?.subjects?.data?.forEach(
        (sub) => (_totalCredits += parseFloat(sub[1]))
      );
      _totalCredits *= 10;
      setTotalCredits(_totalCredits);
      let _numberOfSubjects = user?.subjects?.data?.length;
      setNumberOfSubjects(_numberOfSubjects);
    }
    let newSubjects = await getSubjects(user);
    user.subjects = newSubjects;
    setSubjects(newSubjects);
    let _totalCredits = 0;
    newSubjects?.data?.forEach((sub) => (_totalCredits += parseFloat(sub[1])));
    _totalCredits *= 10;
    setTotalCredits(_totalCredits);
    let _numberOfSubjects = newSubjects?.data?.length;
    setNumberOfSubjects(_numberOfSubjects);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setLoading(false);
  };

  const onPress = () => {
    let numberOfSujectsUserPicked = Object.keys(currentCredits)?.length;

    if (numberOfSujectsUserPicked !== numberOfSubjects) {
      ref.current.alertWithType(
        "error",
        "Error",
        "Select all subjects to continue."
      );
      return;
    }

    if (!user?.cgpa) {
      ref.current.alertWithType(
        "error",
        "No CGPA found",
        "Please load cgpa by visiting CGPA screen on homepage."
      );
      return;
    }

    let currentCalculatedCredits = 0;
    Object.keys(currentCredits).forEach(
      (sub) => (currentCalculatedCredits += currentCredits[sub])
    );
    let calculatedSGPA =
      (currentCalculatedCredits / totalCredits)?.toFixed(2) * 10;
    let semCount = user?.cgpa?.data[0]?.sem_count;
    let prevCGPA = user?.cgpa?.curr_cgpa;
    let calculatedCGPA = (
      (prevCGPA * semCount + calculatedSGPA) /
      (semCount + 1)
    ).toFixed(2);
    navigation.navigate("results", {
      calculatedSGPA,
      prevCGPA,
      calculatedCGPA,
    });
  };

  return (
    <>
      <ScrollView>
        {loading && (
          <View style={[styles.loadingContainer]}>
            <ActivityIndicator size="small" color="gray" />
            <Text style={[styles.loadingText, { color: text }]}>
              {"  "}Refreshing
            </Text>
          </View>
        )}
        {subjects && (
          <>
            {subjects?.data?.map((sub, index) => (
              <SubjectPicker
                currentCredits={currentCredits}
                setCurrentCredits={setCurrentCredits}
                key={`sub-${index}`}
                subject={sub}
              />
            ))}
          </>
        )}
      </ScrollView>
      <TouchableOpacity
        onPress={onPress}
        style={[styles.button, { backgroundColor: primary }]}
      >
        <Text style={styles.text}>CALCULATE</Text>
      </TouchableOpacity>
    </>
  );
};

export default CGPACalculator;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingHorizontal: Mixins.scaleSize(5),
  },
  title: {
    fontSize: Typography.FONT_SIZE_28,
    ...Mixins.padding(10, 0, 10, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: "center",
  },
  loadingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: Mixins.scaleSize(20),
  },
  loadingText: {
    fontSize: Mixins.scaleSize(16),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  button: {
    ...Mixins.padding(20, 10, 20, 10),
  },
  text: {
    textAlign: "center",
    color: "#fff",
    ...Typography.FONT_REGULAR,
  },
});
