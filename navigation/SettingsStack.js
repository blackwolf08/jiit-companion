import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HeaderTitle } from "../components";
import { Typography, Mixins } from "../styles";
import { useTheme } from "../contexts";
import { Ionicons } from "@expo/vector-icons";
import { Settings } from "../screens/App/Settings";
import { ChangeAvatar } from "../screens/App/Settings/ChangeAvatar";

const SettingsStack = createStackNavigator();

function SettingsStackScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <SettingsStack.Navigator
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
      <SettingsStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title="Settings" />,
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
        name="settings"
        component={Settings}
      />
      <SettingsStack.Screen
        options={{ headerTitle: "Change Avatar" }}
        name="changeavatar"
        component={ChangeAvatar}
      />
    </SettingsStack.Navigator>
  );
}

export { SettingsStackScreen };
