import React, { useEffect } from 'react';
import {
  AsyncStorage,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firebase from 'firebase';

import { useTheme, useUser } from '../../../contexts';
import { Colors, Mixins, Typography } from '../../../styles';

const ThemeButtons = ({ item, index }) => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
    setTheme,
  } = useTheme();

  useEffect(() => {
    firebase.analytics().logEvent('settings_page_view');
  }, []);

  const { setUser } = useUser();
  return (
    <TouchableOpacity
      onPress={async () => {
        let user = await AsyncStorage.getItem('user');
        user = JSON.parse(user);
        user.theme = item;
        await AsyncStorage.setItem('user', JSON.stringify(user));
        setUser(user);
        // setTheme(Colors[item])
      }}
      style={[styles.button, { backgroundColor: Colors[item].colors.card }]}
    >
      <Text style={[styles.buttonText, { color: Colors[item].colors.text }]}>
        {item}
      </Text>
    </TouchableOpacity>
  );
};

const Settings = () => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
  } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: black }]}>
      <Text style={[styles.title, { color: text }]}>Theme</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={['dark', 'light', 'pink']}
        style={styles.flatList}
        renderItem={({ item, index }) => (
          <ThemeButtons item={item} index={index} />
        )}
        keyExtractor={() => `${Math.floor(Math.random() * 100000)}`}
        horizontal
      />
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: Typography.FONT_SIZE_28,
    ...Mixins.padding(10, 0, 10, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  buttonText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  button: {
    ...Mixins.padding(10, 20, 10, 20),
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    borderRadius: 2,
    height: Mixins.scaleSize(40),
  },
  flatList: {},
});
