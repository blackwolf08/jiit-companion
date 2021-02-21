import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import Modal from "react-native-modal";
import { getSubjectAttendance } from "../../api/requests";
import { useBottomModal, useTheme, useUser } from "../../contexts";
import { Mixins, Typography } from "../../styles";
import { toTitleCase } from "../../utils";

const BottomModal = () => {
  const { modalData, setModalData } = useBottomModal();
  const {
    theme: {
      colors: { primary, text, black, card, border, backgroundLight },
    },
  } = useTheme();
  const { user } = useUser();
  let scrollViewRef = useRef();
  const [scrollOffset, setscrollOffset] = useState(null);
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState(null);

  useEffect(() => {
    (async () => {
      if (modalData?.className) {
        let cleanedClassName = modalData?.className?.replace(
          /[^A-Z0-9]+/gi,
          "_"
        );
        let cachedSubjectAttendance = await AsyncStorage.getItem(
          cleanedClassName
        );
        cachedSubjectAttendance = JSON.parse(cachedSubjectAttendance);
        if (cachedSubjectAttendance) setData(cachedSubjectAttendance);
        let res = await getSubjectAttendance(
          user,
          modalData?.className?.split(" - ")[0]
        );
        await AsyncStorage.setItem(cleanedClassName, JSON.stringify(res));
        setLoading(false);
        setData(res);
      } else {
        setData(null);
        setLoading(true);
      }
    })();
  }, [modalData]);

  const handleOnScroll = (event) => {
    setscrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };

  const getPrettyDateFirstHalf = (date) =>
    moment(date, "DD-MM-YYYY hh:mm a").format("Do MMM");
  const getPrettyDateSecondHalf = (date) =>
    moment(date, "DD-MM-YYYY hh:mm a").format("ddd h a");

  if (!modalData?.className) <></>;

  return (
    <Modal
      isVisible={modalData?.isVisible}
      onSwipeComplete={() =>
        setModalData({ className: null, isVisible: false })
      }
      swipeDirection={["down"]}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={Mixins.WINDOW_HEIGHT * 0.4 - 300} // content height - ScrollView height
      propagateSwipe={true}
      onBackdropPress={() =>
        setModalData({ className: null, isVisible: false })
      }
      style={styles.modal}
    >
      <View style={[styles.scrollableModal, { backgroundColor: card }]}>
        <View style={styles.grayBar} />
        {loading && (
          <View style={[styles.loadingContainer]}>
            <ActivityIndicator size='small' color='gray' />
            <Text style={[styles.loadingText, { color: text }]}>
              Refreshing
            </Text>
          </View>
        )}
        <Text style={[styles.title, { color: text }]}>
          {modalData?.className?.split(" - ")[0]}
        </Text>
        <AnimatedCircularProgress
          size={Mixins.scaleSize(60)}
          width={Mixins.scaleSize(5)}
          fill={
            modalData?.attendancePercentage === undefined
              ? 100
              : modalData?.attendancePercentage
          }
          tintColor={primary}
          backgroundColor='#3d5875'
          lineCap='round'
          backgroundColor={black}
          rotation={0}
          duration={200}
          style={styles.circularProgress}
        >
          {(fill) => (
            <Text style={[styles.attendancePercentage, { color: text }]}>
              {parseInt(fill)} %
            </Text>
          )}
        </AnimatedCircularProgress>
        <View style={styles.attendanceBoxes}>
          <View style={[styles.total, { backgroundColor: backgroundLight }]}>
            <Text style={[styles.typeAttendance, { color: text }]}>
              {modalData?.total}
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
          {modalData?.classType && (
            <View style={[styles.total, { backgroundColor: backgroundLight }]}>
              <Text style={[styles.typeAttendance, { color: text }]}>
                {modalData?.lecture}
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
          {modalData?.classType && (
            <View style={[styles.total, { backgroundColor: backgroundLight }]}>
              <Text style={[styles.typeAttendance, { color: text }]}>
                {modalData?.tutorial}
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
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
        >
          <View style={styles.list}>
            {data &&
              Object.keys(data)
                .map((key) => data[key])
                .reverse()
                .map((item, key) => (
                  <View key={item[1]}>
                    <View style={[styles.attendanceRow, { borderWidth: 0 }]}>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: text,
                            textAlign: "center",
                            flex: 2,
                          },
                        ]}
                      >
                        {getPrettyDateFirstHalf(item[1])}
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: text,
                            textAlign: "center",
                            flex: 4,
                          },
                        ]}
                      >
                        {toTitleCase(item[2])}
                      </Text>
                      <Text
                        style={[
                          styles.text,
                          {
                            color: text,
                            textAlign: "center",
                            flex: 2,
                          },
                        ]}
                      >
                        {getPrettyDateSecondHalf(item[1])}
                      </Text>
                    </View>
                    <View
                      style={[
                        styles.attendanceRow,
                        { borderBottomColor: `${text}70` },
                      ]}
                    >
                      <Text
                        style={[
                          styles.text,

                          {
                            color: item[3] == "Absent" ? "#e74c3c" : "#2ecc71",
                            flex: 1,
                          },
                        ]}
                      >
                        {item[3] == "Absent" ? "A" : "P"}
                      </Text>
                    </View>
                  </View>
                ))}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    height: Mixins.WINDOW_HEIGHT * 0.7,
    paddingHorizontal: 2,
    paddingTop: Mixins.scaleSize(10),
  },
  list: {},
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
  title: {
    fontSize: Mixins.scaleSize(20),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: "center",
    width: Mixins.WINDOW_WIDTH,
  },
  attendancePercentage: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_14,
  },
  circularProgress: {
    alignSelf: "center",
    marginTop: Mixins.scaleSize(20),
    marginBottom: Mixins.scaleSize(20),
  },
  attendanceRow: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    ...Mixins.padding(10, 10, 10, 10),
    position: "relative",
  },
  text: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    textAlign: "center",
  },
  grayBar: {
    width: Mixins.scaleSize(40),
    height: Mixins.scaleSize(5),
    backgroundColor: "gray",
    borderRadius: Mixins.scaleSize(15),
    alignSelf: "center",
    marginTop: 5,
    marginBottom: 15,
  },
  attendanceBoxes: {
    flexDirection: "row",
    ...Mixins.padding(10, 10, 10, 10),
    alignItems: "center",
    justifyContent: "space-around",
    width: "100%",
  },
  total: {
    ...Mixins.margin(0, 0, 0, 0),
    ...Mixins.padding(5, 10, 5, 10),
    justifyContent: "center",
    alignItems: "center",
    borderRadius: Mixins.scaleSize(30),
    backgroundColor: "#fff",
    position: "relative",
  },
  classType: {
    position: "absolute",
    top: Mixins.scaleSize(-10),
    left: Mixins.scaleSize(-10),
    height: 20,
    width: 20,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 1,
  },
  classTypeText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
  },
});
