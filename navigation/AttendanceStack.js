import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { Attendance } from '../screens/App/Attendance';
import { HeaderTitle } from '../components';
import { Typography, Mixins } from '../styles';
import { useTheme } from '../contexts';
import { Ionicons } from '@expo/vector-icons';

const AttendanceStack = createStackNavigator();

function AttendanceStackScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <AttendanceStack.Navigator
      screenOptions={{
        headerTitleAlign: 'center',
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
      <AttendanceStack.Screen
        options={{
          headerTitle: () => <HeaderTitle title='JIIT Companion' />,
          headerRight: () => (
            <Ionicons
              onPress={() => {}}
              name='ios-send'
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
              name='ios-more'
              size={Typography.FONT_SIZE_28}
              style={{
                marginLeft: Mixins.scaleSize(10),
                width: Mixins.scaleSize(40),
              }}
              color={theme.colors.text}
            />
          ),
        }}
        name='attendance'
        component={Attendance}
      />
    </AttendanceStack.Navigator>
  );
}

export { AttendanceStackScreen };
