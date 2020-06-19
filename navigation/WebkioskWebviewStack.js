import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HeaderTitle } from "../components";
import { Typography, Mixins } from "../styles";
import { useTheme } from "../contexts";
import { Ionicons } from "@expo/vector-icons";
import { WebkioskWebview } from "../screens/App/WebkioskWebview";

const WebkioskWebviewStack = createStackNavigator();

function WebkioskWebviewScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <WebkioskWebviewStack.Navigator
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
      <WebkioskWebviewStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title="Webkiosk Webview" />,
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
        name="webkioskwebview"
        component={WebkioskWebview}
      />
    </WebkioskWebviewStack.Navigator>
  );
}

export { WebkioskWebviewScreen };
