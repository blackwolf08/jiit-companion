import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, useAuth } from '../contexts';
import { createStackNavigator } from '@react-navigation/stack';
import { Login } from '../screens/Auth/Login';

const Stack = createStackNavigator();

export default ({ children, ...restProps }) => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  return (
    <NavigationContainer {...restProps} theme={theme}>
      <Stack.Navigator>
        {isAuthenticated ? (
          <></>
        ) : (
          <>
            <Stack.Screen
              options={{
                headerShown: false,
              }}
              name='login'
              component={Login}
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
