import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { FileServer } from '../screens/App/FileServer';
import { HeaderTitle } from '../components';
import { Typography, Mixins } from '../styles';
import { useTheme } from '../contexts';
import { Ionicons } from '@expo/vector-icons';

const FileServerStack = createStackNavigator();

function FileServerStackScreen({ navigation }) {
  const { theme } = useTheme();
  return (
    <FileServerStack.Navigator
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
      <FileServerStack.Screen
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
        name='fileserver'
        component={FileServer}
      />
    </FileServerStack.Navigator>
  );
}

export { FileServerStackScreen };
