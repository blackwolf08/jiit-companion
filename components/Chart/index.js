import React from "react";
import { Dimensions, StyleSheet } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { useTheme } from "../../contexts";
import { Mixins, Typography } from "../../styles";

const index = ({ data: { data } }) => {
  const {
    theme: {
      colors: { text, background, primary, card, border, backgroundLight },
    },
  } = useTheme();
  let sems = [];
  let sgpas = [];
  data?.map((_, idx) => {
    sems.push(parseInt(`${idx + 1}`));
  });
  data?.map((sem) => {
    sgpas.push(parseFloat(`${sem["total"][0]}`));
  });
  return (
    <LineChart
      data={{
        labels: sems,
        datasets: [
          {
            data: sgpas,
          },
        ],
      }}
      width={Dimensions.get("window").width - Mixins.scaleSize(30)} // from react-native
      height={Mixins.scaleSize(220)}
      chartConfig={{
        backgroundColor: background,
        backgroundGradientFrom: background,
        backgroundGradientTo: background,

        propsForLabels: {
          ...Typography.FONT_REGULAR,
        },
        color: (opacity = 1) => text,
        labelColor: (opacity = 1) => text,
        style: {
          borderRadius: Mixins.scaleSize(16),
          alignSelf: "center",
          margin: "auto",
        },
        propsForDots: {
          r: "6",
          strokeWidth: "2",
          stroke: text,
        },
      }}
      bezier
      style={{
        marginVertical: Mixins.scaleSize(8),
        borderRadius: Mixins.scaleSize(16),
      }}
    />
  );
};

export default index;

const styles = StyleSheet.create({});
