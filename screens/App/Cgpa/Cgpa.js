import * as Analytics from "expo-firebase-analytics";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { getCGPA, getExamMarks } from "../../../api/requests";
import { Chart, InterstitialAdComponent } from "../../../components";
import { useTheme, useUser } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";
import { toTitleCase } from "../../../utils";

const Cgpa = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();

  let { user, setUser } = useUser();

  const [loading, setLoading] = useState(true);
  const [examMarks, setExamMarks] = useState(null);
  const [cgpa, setCgpa] = useState(null);

  useEffect(() => {
    Analytics.logEvent("cgpa_page_view");
    getUserCGPAExamMarks();
  }, []);

  const getUserCGPAExamMarks = async () => {
    setLoading(true);
    let cachedCgpa = user?.cgpa;
    let cachedExamMarks = user?.examMarks;
    if (cachedCgpa) {
      setCgpa(cachedCgpa);
      setExamMarks(cachedExamMarks);
    }
    let newCgpa = await getCGPA(user);
    let newExamMarks = await getExamMarks(user);
    user.cgpa = newCgpa;
    setCgpa(newCgpa);
    setExamMarks(newExamMarks);
    user.examMarks = newExamMarks;
    await AsyncStorage.setItem("user", JSON.stringify(user));
    setUser(user);
    setLoading(false);
  };

  const getStatus = (cgpa) => {
    if (cgpa <= 10) return cgpa;
    return "Not possible";
  };

  return (
    <ScrollView style={styles.scrollView}>
      {loading && (
        <View style={[styles.loadingContainer]}>
          <ActivityIndicator size="small" color="gray" />
          <Text style={[styles.loadingText, { color: text }]}>
            {"  "}Refreshing
          </Text>
        </View>
      )}
      <Text style={[styles.title, { color: text }]}>CGPA Trends</Text>
      {/* {examMarks && cgpa && ( */}
      {cgpa && (
        <>
          <Text
            style={[
              styles.title,
              { color: text, fontSize: Typography.FONT_SIZE_18 },
            ]}
          >
            Current CGPA {cgpa.curr_cgpa}
          </Text>
          <Chart data={cgpa} />
          <View
            style={[
              styles.card,
              { backgroundColor: card, ...Mixins.boxShadow(card) },
            ]}
          >
            <View style={[styles.row]}>
              <Text
                style={[
                  styles.rowHeader,
                  { color: text, fontFamily: Typography.FONT_FAMILY_BOLD },
                ]}
              >
                Sem
              </Text>
              <Text
                style={[
                  styles.rowHeader,
                  { color: text, fontFamily: Typography.FONT_FAMILY_BOLD },
                ]}
              >
                SGPA
              </Text>
              <Text
                style={[
                  styles.rowHeader,
                  { color: text, fontFamily: Typography.FONT_FAMILY_BOLD },
                ]}
              >
                CGPA
              </Text>
            </View>
            {cgpa?.data?.map(({ total }, index) => (
              <View key={`sem-${index}`} style={[styles.row]}>
                <Text style={[styles.rowHeader, { color: text }]}>
                  {index + 1}
                </Text>
                <Text style={[styles.rowHeader, { color: text }]}>
                  {total[0]}
                </Text>
                <Text style={[styles.rowHeader, { color: text }]}>
                  {total[1]}
                </Text>
              </View>
            ))}
          </View>
          <Text
            style={[
              styles.title,
              { color: text, fontSize: Typography.FONT_SIZE_18 },
            ]}
          >
            Minimum required SGPA each Semester from now for (till 8th sem)
          </Text>
          <View style={styles.row}>
            <Text style={[styles.rowHeader, { color: text }]}>6.5 CGPA</Text>
            <Text style={[styles.rowHeader, { color: text }]}>
              {getStatus(cgpa?.for_6_5_cgpa)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowHeader, { color: text }]}>7 CGPA</Text>
            <Text style={[styles.rowHeader, { color: text }]}>
              {getStatus(cgpa?.for_7_cgpa)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowHeader, { color: text }]}>8 CGPA</Text>
            <Text style={[styles.rowHeader, { color: text }]}>
              {getStatus(cgpa?.for_8_cgpa)}
            </Text>
          </View>
          <View style={styles.row}>
            <Text style={[styles.rowHeader, { color: text }]}>9 CGPA</Text>
            <Text style={[styles.rowHeader, { color: text }]}>
              {getStatus(cgpa?.for_9_cgpa)}
            </Text>
          </View>
          <View>
            <Text
              style={[
                styles.title,
                { color: text, fontSize: Typography.FONT_SIZE_18 },
              ]}
            >
              Exam Marks
            </Text>
            {examMarks?.data.map((exam_marks, index) => {
              let __exam_marks = exam_marks?.filter((text) => text !== "  ");
              let name = __exam_marks[1];
              let t1 = __exam_marks[2];
              let t2 = __exam_marks[3];
              let t3 = __exam_marks[4];

              return (
                <View
                  style={[
                    styles.marksCard,
                    { backgroundColor: card, ...Mixins.boxShadow(card) },
                  ]}
                  key={`marks-${index}`}
                >
                  <Text
                    style={[
                      styles.rowHeader,
                      {
                        color: text,
                        textAlign: "center",
                        marginBottom: Mixins.scaleSize(10),
                      },
                    ]}
                  >
                    {toTitleCase(name)}
                  </Text>
                  <View style={styles.row}>
                    {t1 && (
                      <Text
                        style={[
                          styles.rowHeader,
                          { color: text, textAlign: "center" },
                        ]}
                      >
                        <Text style={{ ...Typography.FONT_BOLD }}>
                          T1 {"  "}
                        </Text>
                        {t1}
                      </Text>
                    )}
                    {t2 && (
                      <Text
                        style={[
                          styles.rowHeader,
                          { color: text, textAlign: "center" },
                        ]}
                      >
                        <Text style={{ ...Typography.FONT_BOLD }}>
                          T2 {"  "}
                        </Text>
                        {t2}
                      </Text>
                    )}
                    {t3 && (
                      <Text
                        style={[
                          styles.rowHeader,
                          { color: text, textAlign: "center" },
                        ]}
                      >
                        <Text style={{ ...Typography.FONT_BOLD }}>
                          T3 {"  "}
                        </Text>
                        {t3}
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </>
      )}
      <InterstitialAdComponent show />
    </ScrollView>
  );
};

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
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingTop: Mixins.scaleSize(7),
    paddingBottom: Mixins.scaleSize(7),
  },
  rowHeader: {
    ...Typography.FONT_REGULAR,
    fontSize: Typography.FONT_SIZE_18,
    flex: 1,
    textAlign: "center",
  },
  card: {
    borderRadius: Mixins.scaleSize(20),
    overflow: "hidden",
  },
  marksCard: {
    borderRadius: Mixins.scaleSize(20),
    padding: Mixins.scaleSize(10),
    overflow: "hidden",
    ...Mixins.margin(10, 0, 10, 0),
  },
});
export default Cgpa;
