import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HeaderTitle } from "../components";
import { Typography, Mixins } from "../styles";
import { useTheme } from "../contexts";
import { Ionicons } from "@expo/vector-icons";
import { PreviousYearPapers } from "../screens/App/PreviousYearPapers";

const PreviousYearPapersStack = createStackNavigator();

function PreviousYearPapersScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <PreviousYearPapersStack.Navigator
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
      <PreviousYearPapersStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title='Previous Year Papers' />,
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
        name='previousyearpapers'
        component={PreviousYearPapers}
      />
    </PreviousYearPapersStack.Navigator>
  );
}

export { PreviousYearPapersScreen };
