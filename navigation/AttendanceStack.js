import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Attendance } from '../screens/App/Attendance';
import { HeaderTitle } from '../components';
import { Typography, Mixins } from '../styles';
import { useTheme } from '../contexts';

const AttendanceStack = createStackNavigator();

function AttendanceStackScreen() {
  const { theme } = useTheme();
  return (
    <AttendanceStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
        headerStyle: {
          backgroundColor: theme.colors.black,
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
      <AttendanceStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title='JIIT Companion' />,
        }}
        name='attendance'
        component={Attendance}
      />
    </AttendanceStack.Navigator>
  );
}

export { AttendanceStackScreen };
