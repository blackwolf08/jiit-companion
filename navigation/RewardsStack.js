import { Ionicons } from "@expo/vector-icons";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HeaderTitle } from "../components";
import { useTheme } from "../contexts";
import { Rewards } from "../screens/App/Rewards";
import { Mixins, Typography } from "../styles";

const RewardsScreenStack = createStackNavigator();

function RewardsScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <RewardsScreenStack.Navigator
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
      <RewardsScreenStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title="Rewards" />,
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
        name="rewards"
        component={Rewards}
      />
    </RewardsScreenStack.Navigator>
  );
}

export { RewardsScreen };
