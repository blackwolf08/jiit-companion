import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { TimeTable } from "../screens/App/TimeTable";
import { HeaderTitle } from "../components";
import { Typography, Mixins } from "../styles";
import { useTheme } from "../contexts";
import { Ionicons } from "@expo/vector-icons";

const TimeTableStack = createStackNavigator();

function TimeTableStackScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <TimeTableStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <Ionicons
            name="ios-arrow-back"
            size={Typography.FONT_SIZE_28}
            style={{
              marginLeft: Mixins.scaleSize(10),
              width: Mixins.scaleSize(40),
            }}
            color={theme.colors.text}
          />
        ),
      }}
    >
      <TimeTableStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title="JIIT Companion" />,
          headerRight: () => (
            <Ionicons
              onPress={() => {}}
              name="ios-send"
              size={Typography.FONT_SIZE_28}
              style={{
                marginLeft: Mixins.scaleSize(10),
                width: Mixins.scaleSize(40),
              }}
              color={theme.colors.text}
            />
          ),
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.toggleDrawer()}
              name="ios-more"
              size={Typography.FONT_SIZE_28}
              style={{
                marginLeft: Mixins.scaleSize(10),
                width: Mixins.scaleSize(40),
              }}
              color={theme.colors.text}
            />
          ),
        }}
        name="timetable"
        component={TimeTable}
      />
    </TimeTableStack.Navigator>
  );
}

export { TimeTableStackScreen };
