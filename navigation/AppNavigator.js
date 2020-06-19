import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import * as React from "react";
import { useTheme } from "../contexts";
import { AttendanceStackScreen } from "./AttendanceStack";
import { CgpaStackScreen } from "./CgpaStack";
import { FileServerStackScreen } from "./FileServerStack";
import { SettingsStackScreen } from "./SettingsStack";
import { TimeTableStackScreen } from "./TimeTableStack";
import { JIITSocialScreenStack } from "./JIITSocialScreenStack";
import { WebkioskWebviewScreen } from "./WebkioskWebviewStack";

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case "attendance":
              iconName = "ios-calendar";
              break;
            case "cgpa":
              iconName = "ios-trending-up";
              break;
            case "fileserver":
              iconName = "ios-folder-open";
              break;
            case "timetable":
              iconName = "ios-time";
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: theme.colors.card,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name="timetable" component={TimeTableStackScreen} />
      <Tab.Screen name="attendance" component={AttendanceStackScreen} />
      <Tab.Screen name="fileserver" component={FileServerStackScreen} />
      <Tab.Screen name="cgpa" component={CgpaStackScreen} />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <Drawer.Navigator drawerType="slide" initialRouteName="home">
      <Drawer.Screen name="Home" component={TabNavigator} />
      <Drawer.Screen name="JIIT Social" component={JIITSocialScreenStack} />
      <Drawer.Screen
        name="Webkiosk Webview"
        component={WebkioskWebviewScreen}
      />
      <Drawer.Screen name="Settings" component={SettingsStackScreen} />
    </Drawer.Navigator>
  );
}
