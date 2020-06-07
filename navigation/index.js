import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useTheme, useAuth, useUser } from '../contexts';
import { createStackNavigator } from '@react-navigation/stack';
import { Login, MoreDetails } from '../screens/Auth/Login';
import { Ionicons } from '@expo/vector-icons';
import { Typography, Mixins } from '../styles';

import { HeaderTitle } from '../components';
import AppNavigator from './AppNavigator';
import { AsyncStorage } from 'react-native';
import { AppLoading } from 'expo';

const Stack = createStackNavigator();

export default ({ children, ...restProps }) => {
  const { theme } = useTheme();
  const { setUser } = useUser();
  const [loading, setloading] = useState(true);
  const { isAuthenticated, setisAuthenticated } = useAuth();

  useEffect(() => {
    (async () => {
      let user = await AsyncStorage.getItem('user');
      if (!user) {
        setisAuthenticated(false);
        setloading(false);
        return;
      }
      user = JSON.parse(user);
      if (user?.loggedIn) {
        setUser(user);
        setisAuthenticated(true);
        setloading(false);
      }
    })();
  }, []);
  if (loading) return <AppLoading />;
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
