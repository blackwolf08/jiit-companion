import { Ionicons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState, useRef } from 'react';
import { AsyncStorage } from 'react-native';
import { HeaderTitle } from '../components';
import { useAuth, useTheme, useUser } from '../contexts';
import { Login, MoreDetails } from '../screens/Auth/Login';
import { Mixins, Typography } from '../styles';
import AppNavigator from './AppNavigator';
import useLinking from './useLinking';
const Stack = createStackNavigator();

export default ({ children, ...restProps }) => {
  const { theme } = useTheme();
  const { user, setUser } = useUser();
  const [loading, setloading] = useState(true);
  const { isAuthenticated, setisAuthenticated } = useAuth();

  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = useRef();
  const { getInitialState } = useLinking(containerRef);

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

  if (loading) return <></>;
  return (
    <NavigationContainer
      ref={containerRef}
      initialState={initialNavigationState}
      {...restProps}
      theme={theme}
    >
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
