import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { useTheme } from '../contexts';
import { Cgpa } from '../screens/App/Cgpa';
import { AttendanceStackScreen } from './AttendanceStack';

const Tab = createBottomTabNavigator();
const stack = createStackNavigator();

export default function AppNavigator() {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          switch (route.name) {
            case 'attendance':
              iconName = focused
                ? 'ios-information-circle'
                : 'ios-information-circle-outline';
            case 'cgpa':
              iconName = focused ? 'ios-list-box' : 'ios-list';
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
      <Tab.Screen name='cgpa' component={Cgpa} />
    </Tab.Navigator>
  );
}
