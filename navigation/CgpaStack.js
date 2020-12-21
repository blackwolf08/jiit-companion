import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { Cgpa } from "../screens/App/Cgpa";
import { HeaderTitle } from "../components";
import { Typography, Mixins } from "../styles";
import { useTheme } from "../contexts";
import { Ionicons } from "@expo/vector-icons";
import { CookingLottie } from "./AttendanceStack";

const CgpaStack = createStackNavigator();

function CgpaStackScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <CgpaStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerBackTitleVisible: false,
        headerBackImage: () => (
          <Ionicons
            name='ios-arrow-back'
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
      <CgpaStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title='JIIT Companion' />,
          headerRight: CookingLottie,
          headerLeft: () => (
            <Ionicons
              onPress={() => navigation.toggleDrawer()}
              name='ios-menu'
              size={Typography.FONT_SIZE_28}
              style={{
                marginLeft: Mixins.scaleSize(10),
                width: Mixins.scaleSize(40),
              }}
              color={theme.colors.text}
            />
          ),
        }}
        name='cgpa'
        component={Cgpa}
      />
    </CgpaStack.Navigator>
  );
}

export { CgpaStackScreen };
