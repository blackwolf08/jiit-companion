import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Attendance } from "../screens/App/Attendance";
import { HeaderTitle } from "../components";
import { Typography, Mixins } from "../styles";
import { useTheme } from "../contexts";
import { Ionicons } from "@expo/vector-icons";
import LottieView from "lottie-react-native";

const AttendanceStack = createStackNavigator();

export const CookingLottie = () => (
  <LottieView
    source={require("../assets/lottieFiles/cooking.json")}
    autoPlay
    loop
    style={{
      width: Mixins.scaleSize(40),
      height: Mixins.scaleSize(40),
      marginLeft: -Mixins.scaleSize(10),
      marginTop: -Mixins.scaleSize(2),
    }}
  />
);

function AttendanceStackScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <AttendanceStack.Navigator
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
      <AttendanceStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title="JIIT Companion" />,
          headerRight: CookingLottie,

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
        name="attendance"
        component={Attendance}
      />
    </AttendanceStack.Navigator>
  );
}

export { AttendanceStackScreen };
