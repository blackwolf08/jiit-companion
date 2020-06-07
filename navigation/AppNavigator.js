import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import { useTheme } from '../contexts';
import { Cgpa } from '../screens/App/Cgpa';
import { AttendanceStackScreen } from './AttendanceStack';
import { CgpaStackScreen } from './CgpaStack';

const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

const TabNavigator = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          console.log(route.name);
          switch (route.name) {
            case 'attendance':
              iconName = 'ios-calendar';
              break;
            case 'cgpa':
              iconName = 'ios-trending-up';
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        showLabel: false,
        style: {
          backgroundColor: theme.colors.black,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen name='attendance' component={AttendanceStackScreen} />
      <Tab.Screen name='cgpa' component={CgpaStackScreen} />
    </Tab.Navigator>
  );
};

export default function AppNavigator() {
  return (
    <Drawer.Navigator initialRouteName='home'>
      <Drawer.Screen name='home' component={TabNavigator} />
    </Drawer.Navigator>
  );
}
