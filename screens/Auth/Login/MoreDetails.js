import * as Analytics from "expo-firebase-analytics";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import Modal from "react-native-modal";
import { useAuth, useTheme } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";

const MoreDetails = ({ route }) => {
  const {
    theme: { colors },
  } = useTheme();
  const { login, isLoading } = useAuth();

  // params from login screen
  const { enrollmentNumber, password } = route.params;

  //define states
  const [dateOfBirth, setDateOfBirth] = useState("Date of birth");
  const [batch, setBatch] = useState("");
  const [year, setYear] = useState("Academic year");
  const [college, setCollege] = useState("College");
  const [disabled, setdisabled] = useState(true);
  const [modalVisible, setmodalVisible] = useState(undefined);

  useEffect(() => {
    if (
      dateOfBirth?.length > 0 &&
      batch?.length > 0 &&
      year?.length > 0 &&
      college?.length > 0
    )
      setdisabled(false);
    else setdisabled(true);
  }, [dateOfBirth, batch, year, college]);

  useEffect(() => {
    Analytics.logEvent("login_more_details_page_view");
  }, []);

  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.black}
        animated
      />
      <View style={[styles.container, { backgroundColor: colors.black }]}>
        <View style={styles.contentConatiner}>
          <TouchableOpacity
            onPress={() => setmodalVisible({ dob: true })}
            style={[
              styles.text,
              {
                backgroundColor: colors.background,
                borderColor: colors.card,
                color: colors.text,
              },
            ]}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
              }}
            >
              {dateOfBirth}
            </Text>
          </TouchableOpacity>
          <Modal
            onBackdropPress={() => setmodalVisible(false)}
            isVisible={Boolean(modalVisible?.dob)}
          >
            <Calendar
              disableMonthChange={false}
              current={"1998-08-01"}
              style={{ borderColor: colors.border }}
              onDayPress={({ dateString }) => {
                setDateOfBirth(dateString.split("-").reverse().join("-"));
                setmodalVisible(false);
              }}
              theme={getCalandarTheme(colors)}
            />
          </Modal>

          <TextInput
            keyboardAppearance={"dark"}
            placeholderTextColor={colors.text}
            style={[
              styles.input,
              {
                backgroundColor: colors.background,
                borderColor: colors.card,
                color: colors.text,
              },
            ]}
            placeholder="Batch"
            onChangeText={(batch) => setBatch(batch)}
            value={batch}
          />

          <TouchableOpacity
            onPress={() => setmodalVisible({ year: true })}
            style={[
              styles.text,
              {
                backgroundColor: colors.background,
                borderColor: colors.card,
              },
            ]}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
              }}
            >
              {year}
            </Text>
          </TouchableOpacity>
          <Modal
            style={styles.modal}
            onBackdropPress={() => setmodalVisible(false)}
            isVisible={Boolean(modalVisible?.year)}
          >
            <View>
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  setmodalVisible(false);
                  setYear("1");
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                  }}
                >
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  setmodalVisible(false);
                  setYear("2");
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                  }}
                >
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  setmodalVisible(false);
                  setYear("3");
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                  }}
                >
                  3
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  setmodalVisible(false);
                  setYear("4");
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                  }}
                >
                  4
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  {
                    backgroundColor: colors.card,
                    borderColor: colors.border,
                  },
                ]}
                onPress={() => {
                  setmodalVisible(false);
                  setYear("5");
                }}
              >
                <Text
                  style={{
                    color: colors.text,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                  }}
                >
                  5
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
          <TouchableOpacity
            onPress={() => setmodalVisible({ college: true })}
            style={[
              styles.text,
              {
                backgroundColor: colors.background,
                borderColor: colors.card,
              },
            ]}
          >
            <Text
              style={{
                color: colors.text,
                fontFamily: Typography.FONT_FAMILY_REGULAR,
              }}
            >
              {college}
            </Text>
          </TouchableOpacity>
          <Modal
            style={styles.modal}
            onBackdropPress={() => setmodalVisible(false)}
            isVisible={Boolean(modalVisible?.college)}
          >
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                setmodalVisible(false);
                setCollege("62");
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                JIIT - Sector 62
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                setmodalVisible(false);
                setCollege("128");
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                JIIT - Sector 128
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: colors.card,
                  borderColor: colors.border,
                },
              ]}
              onPress={() => {
                setmodalVisible(false);
                setCollege("JUET");
              }}
            >
              <Text
                style={{
                  color: colors.text,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                JUET - Guna
              </Text>
            </TouchableOpacity>
          </Modal>
          <TouchableOpacity
            disabled={disabled}
            onPress={() => {
              Keyboard.dismiss();
              login({
                enrollmentNumber,
                password,
                dateOfBirth,
                batch,
                year,
                college,
              });
            }}
            style={[
              styles.logInButton,
              {
                backgroundColor: colors.primary,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={[styles.logInText, { color: colors.text }]}>
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const getCalandarTheme = (colors) => ({
  backgroundColor: colors.background,
  calendarBackground: colors.background,
  textSectionTitleColor: colors.text,
  selectedDayBackgroundColor: colors.card,
  selectedDayTextColor: colors.primary,
  todayTextColor: colors.primary,
  dayTextColor: colors.text,
  textDisabledColor: colors.text,
  dotColor: colors.text,
  selectedDotColor: colors.card,
  arrowColor: colors.primary,
  disabledArrowColor: colors.text,
  monthTextColor: colors.text,
  indicatorColor: colors.text,
  textDayFontFamily: Typography.FONT_FAMILY_REGULAR,
  textMonthFontFamily: Typography.FONT_FAMILY_REGULAR,
  textDayHeaderFontFamily: Typography.FONT_FAMILY_REGULAR,
});

export const styles = StyleSheet.create({
  title: {
    fontFamily: Typography.HEADER_FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_28,
  },
  container: {
    flex: 1,
  },
  titleConatiner: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  contentConatiner: {
    flex: 9,
    ...Mixins.padding(40, 40, 0, 40),
  },
  text: {
    height: Mixins.scaleSize(50),
    marginTop: Mixins.scaleSize(15),
    borderRadius: Mixins.scaleSize(4),
    borderWidth: Mixins.scaleSize(1),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
    justifyContent: "center",
    ...Mixins.padding(5, 0, 5, 10),
  },
  input: {
    height: Mixins.scaleSize(50),
    marginTop: Mixins.scaleSize(15),
    borderRadius: Mixins.scaleSize(4),
    borderWidth: Mixins.scaleSize(1),
    ...Mixins.padding(5, 0, 5, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
  },

  logInButton: {
    height: Mixins.scaleSize(50),
    borderRadius: Mixins.scaleSize(5),
    marginTop: Mixins.scaleSize(15),
    alignItems: "center",
    justifyContent: "center",
  },
  logInText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: "center",
  },
  option: {
    ...Mixins.padding(20, 10, 20, 10),
    borderBottomWidth: 1,
    width: Mixins.WINDOW_WIDTH - Mixins.scaleSize(20),
    margin: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MoreDetails;
