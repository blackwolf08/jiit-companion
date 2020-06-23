import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HeaderTitle } from "../components";
import { useTheme } from "../contexts";
import AcademicCalendar from "../screens/App/AcademicCalendar/AcademicCalendar";
import { Mixins, Typography } from "../styles";

const AcademicCalendarStack = createStackNavigator();

function AcademicCalendarScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <AcademicCalendarStack.Navigator
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
      <AcademicCalendarStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title="Academic Calendar" />,
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
        name="academiccalendar"
        component={AcademicCalendar}
      />
    </AcademicCalendarStack.Navigator>
  );
}

export { AcademicCalendarScreen };
