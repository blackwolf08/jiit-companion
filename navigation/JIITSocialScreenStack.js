import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { HeaderTitle } from "../components";
import { Typography, Mixins } from "../styles";
import { useTheme } from "../contexts";
import { Ionicons } from "@expo/vector-icons";
import { JIITSocial } from "../screens/App/JIITSocial";
import { AddPost } from "../screens/App/JIITSocial/AddPost";
import Comment from "../screens/App/JIITSocial/Comment";

const JIITSocialStack = createStackNavigator();

function JIITSocialScreenStack({ navigation }) {
  const { theme } = useTheme();
  return (
    <JIITSocialStack.Navigator
      initialRouteName="jiitsocial"
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
      <JIITSocialStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title="JIIT Social" />,
          headerRight: () => (
            <Ionicons
              onPress={() => {
                navigation.navigate("addpost");
              }}
              name="ios-camera"
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
        name="jiitsocial"
        component={JIITSocial}
      />
      <JIITSocialStack.Screen
        options={{ headerTitle: "Add Post" }}
        name="addpost"
        component={AddPost}
      />
      <JIITSocialStack.Screen
        options={{ headerTitle: "Comments" }}
        name="comments"
        component={Comment}
      />
    </JIITSocialStack.Navigator>
  );
}

export { JIITSocialScreenStack };
