import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { useTheme } from "../../contexts";
import { Mixins, Typography } from "../../styles";

const index = ({
  subject: [name, credit],
  currentCredits,
  setCurrentCredits,
}) => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [selectedGrade, setSelectedGrade] = useState("");
  const {
    theme: {
      colors: { text, card, border, background, primary },
    },
  } = useTheme();

  const getCreditsForGrade = (grade) => {
    switch (grade) {
      case "A+":
        return 10 * credit;
      case "A":
        return 9 * credit;
      case "B+":
        return 8 * credit;
      case "B":
        return 7 * credit;
      case "C+":
        return 6 * credit;
      case "C":
        return 5 * credit;
      case "D":
        return 4 * credit;
      case "F":
        return 0 * credit;
    }
  };

  const cleanClassName = (className) =>
    className?.split("(")[0].replace(/[^A-Z0-9]+/gi, "_");
  const onPress = (grade) => {
    setSelectedGrade(grade);
    setmodalVisible(false);
    let cleanedClassName = cleanClassName(name);
    let newCurrentCredits = currentCredits;
    newCurrentCredits[cleanedClassName] = getCreditsForGrade(grade);
    setCurrentCredits(newCurrentCredits);
  };

  return (
    <View key={name}>
      <Modal
        style={styles.modal}
        onBackdropPress={() => setmodalVisible(false)}
        isVisible={modalVisible}
      >
        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: card,
              borderColor: border,
            },
          ]}
          onPress={() => onPress("A+")}
        >
          <Text
            style={{
              color: text,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            A+
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: card,
              borderColor: border,
            },
          ]}
          onPress={() => onPress("A")}
        >
          <Text
            style={{
              color: text,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            A
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: card,
              borderColor: border,
            },
          ]}
          onPress={() => onPress("B+")}
        >
          <Text
            style={{
              color: text,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            B+
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: card,
              borderColor: border,
            },
          ]}
          onPress={() => onPress("B")}
        >
          <Text
            style={{
              color: text,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            B
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: card,
              borderColor: border,
            },
          ]}
          onPress={() => onPress("C+")}
        >
          <Text
            style={{
              color: text,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            C+
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: card,
              borderColor: border,
            },
          ]}
          onPress={() => onPress("C")}
        >
          <Text
            style={{
              color: text,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            C
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: card,
              borderColor: border,
            },
          ]}
          onPress={() => onPress("D")}
        >
          <Text
            style={{
              color: text,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            D
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.option,
            {
              backgroundColor: card,
              borderColor: border,
            },
          ]}
          onPress={() => onPress("F")}
        >
          <Text
            style={{
              color: text,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            F
          </Text>
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity onPress={() => setmodalVisible(true)}>
        <Text style={[styles.text, { color: text }]}>{name}</Text>
        <Text style={[styles.text, { color: text }]}>{selectedGrade}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({
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
  text: {
    ...Typography.FONT_REGULAR,
    ...Mixins.padding(10, 10, 10, 10),
    textAlign: "center",
  },
});
