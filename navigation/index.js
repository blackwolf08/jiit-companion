import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, useAuth } from '../contexts';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, MoreDetails } from '../screens/Auth/Login';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Mixins } from '../styles';

import { HeaderTitle } from '../components';
import AppNavigator from './AppNavigator';

const Stack = createStackNavigator();

export default ({ children, ...restProps }) => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer {...restProps} theme={theme}>
      {isAuthenticated ? (
        <AppNavigator />
      ) : (
        <Stack.Navigator
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
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name='login'
            component={Login}
          />
          <Stack.Screen
            options={{
              headerTitle: () => <HeaderTitle title='JIIT Companion' />,
            }}
            name='moredetails'
            component={MoreDetails}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
