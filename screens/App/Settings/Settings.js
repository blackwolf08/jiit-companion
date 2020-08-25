import axios from 'axios';
import * as Analytics from 'expo-firebase-analytics';
import * as firebase from 'firebase';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from 'react-native';
import Modal from 'react-native-modal';
import { JIIT_SOCIAL_BASE_API } from '../../../api/constants';
import { Avatar } from '../../../components';
import { useAuth, useTheme, useUser } from '../../../contexts';
import { Colors, Mixins, Typography } from '../../../styles';
import { isModerator } from '../../../constants';

const ThemeButtons = ({ item }) => {
  const {
    theme: {
      colors: { background, card, text, primary, black },
    },
    setTheme,
  } = useTheme();

  useEffect(() => {
    Analytics.logEvent('settings_page_view');
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

const Settings = ({ navigation }) => {
  const {
    theme: {
      colors: { background, card, text, primary, black, border },
    },
  } = useTheme();

  const [userName, setUserName] = useState('');
  const [year, setYear] = useState(user?.year);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isYearModalVisible, setIsYearModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const { setisAuthenticated } = useAuth();
  const { user, setUser } = useUser();
  const [avatar, setAvatar] = useState(undefined);
  const [notificationBody, setNotificationBody] = useState('');
  const [notificationTitle, setNotificationTitle] = useState('');
  const [screen, setScreen] = useState('jiitsocial');
  const [drawer, setDrawer] = useState('JIIT Social');
  const [password, setPassword] = useState('');
  const [isNotificationModalVisible, setisNotificationModalVisible] = useState(
    false
  );

  useEffect(() => {
    _setAvatar();
    firebase.database().ref('avatars/').on('value', _setAvatar);
  }, []);

  const _setAvatar = async () => {
    let res = await firebase
      .database()
      .ref('avatars/' + user?.enrollmentNumber)
      .once('value');
    res = JSON.parse(JSON.stringify(res));
    setAvatar(res?.avatar);
  };

  const changeUserName = async () => {
    Keyboard.dismiss();
    setLoading(true);
    let formData = new FormData();
    formData.append('enrollment_number', user?.enrollmentNumber);
    formData.append('username', userName);
    let res;
    try {
      res = await new axios({
        method: 'post',
        url: `${JIIT_SOCIAL_BASE_API}/changeUsername`,
        data: formData,
        config: {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      });
    } catch (err) {
      setError(true);
      setLoading(false);
      return;
    }
    setError(false);
    setLoading(false);
    let message = res.data.message;
    console.log(message);
    if (message == 'Error Registering User') {
      setError(true);
      return;
    }
    user.userName = userName;
    await AsyncStorage.setItem('user', JSON.stringify(user));
    setUser(user);
    setIsModalVisible(false);
  };

  const sendNotification = async () => {
    Keyboard.dismiss();
    setLoading(true);
    let formData = new FormData();
    formData.append('password', password);
    formData.append('notificationTitle', notificationTitle);
    formData.append('notificationBody', notificationBody);
    formData.append('screen', screen);
    formData.append('drawer', drawer);
    try {
      await new axios({
        method: 'post',
        url: `${JIIT_SOCIAL_BASE_API}/appNotifications`,
        data: formData,
        config: {
          headers: { 'Content-Type': 'multipart/form-data' },
        },
      });
    } catch (err) {
      console.log(err);
    }
    setisNotificationModalVisible(false);
    setLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={[styles.container, { backgroundColor: black }]}>
        <Modal
          isVisible={isModalVisible}
          style={styles.modal}
          onBackdropPress={() => setIsModalVisible(false)}
        >
          <TextInput
            keyboardAppearance={'dark'}
            placeholderTextColor={text}
            style={[
              styles.input,
              {
                backgroundColor: background,
                borderColor: card,
                color: text,
              },
            ]}
            placeholder='Enter your username'
            onChangeText={(userName) => setUserName(userName)}
            value={userName}
          />
          {error && (
            <Text
              style={[
                styles.muted,
                {
                  fontSize: Typography.FONT_SIZE_14,
                  color: 'red',
                  backgroundColor: background,
                },
              ]}
            >
              Username already taken
            </Text>
          )}
          <TouchableOpacity
            onPress={changeUserName}
            style={[styles.button, { backgroundColor: primary, marginTop: 0 }]}
          >
            {loading ? (
              <ActivityIndicator color='#fff' size='small' />
            ) : (
              <Text style={[styles.buttonText, { color: '#fff' }]}>Done</Text>
            )}
          </TouchableOpacity>
        </Modal>
        <View style={styles.userDetailsContainer}>
          <Avatar image={avatar} />
          <Text style={[styles.title, { color: text }]}>
            Hello {user?.userName}
          </Text>
        </View>
        <Text style={[styles.title, { color: text }]}>Theme</Text>
        {['dark', 'light', 'pink'].map((item, index) => (
          <ThemeButtons key={`key-button-${index}`} item={item} index={index} />
        ))}
        <Text style={[styles.title, { color: text }]}>User Options</Text>

        <TouchableOpacity
          onPress={() => setIsModalVisible(true)}
          style={[styles.button, { backgroundColor: primary }]}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Change username
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setIsYearModalVisible(true)}
          style={[
            styles.text,
            {
              backgroundColor: background,
              borderColor: card,
            },
          ]}
        >
          <Text
            style={{
              color: text,
              fontFamily: Typography.FONT_FAMILY_REGULAR,
            }}
          >
            Set Year
          </Text>
        </TouchableOpacity>
        <Modal
          style={styles.modal}
          onBackdropPress={() => setIsYearModalVisible(false)}
          isVisible={isYearModalVisible}
        >
          <View>
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: card,
                  borderColor: border,
                },
              ]}
              onPress={async () => {
                user.year = '1';
                setUser(user);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                setIsYearModalVisible(false);
                setYear('1');
              }}
            >
              <Text
                style={{
                  color: text,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: card,
                  borderColor: border,
                },
              ]}
              onPress={async () => {
                user.year = '2';
                setUser(user);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                setIsYearModalVisible(false);
                setYear('2');
              }}
            >
              <Text
                style={{
                  color: text,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: card,
                  borderColor: border,
                },
              ]}
              onPress={async () => {
                user.year = '3';
                setUser(user);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                setIsYearModalVisible(false);
                setYear('3');
              }}
            >
              <Text
                style={{
                  color: text,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: card,
                  borderColor: border,
                },
              ]}
              onPress={async () => {
                user.year = '4';
                setUser(user);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                setIsYearModalVisible(false);
                setYear('4');
              }}
            >
              <Text
                style={{
                  color: text,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {
                  backgroundColor: card,
                  borderColor: border,
                },
              ]}
              onPress={async () => {
                user.year = '5';
                setUser(user);
                await AsyncStorage.setItem('user', JSON.stringify(user));
                setIsYearModalVisible(false);
                setYear('5');
              }}
            >
              <Text
                style={{
                  color: text,
                  fontFamily: Typography.FONT_FAMILY_REGULAR,
                }}
              >
                5
              </Text>
            </TouchableOpacity>
          </View>
        </Modal>
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('timetable');
            user.timetable = null;
            user.attendance = null;
            await AsyncStorage.setItem('user', JSON.stringify(user));
            setUser(user);
            Alert.alert('Timetable successfully resetted. Restart App.');
          }}
          style={[styles.button, { backgroundColor: primary }]}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Reset Timetable
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate('changeavatar')}
          style={[styles.button, { backgroundColor: primary }]}
        >
          <Text style={[styles.buttonText, { color: '#fff' }]}>
            Change Avatar
          </Text>
        </TouchableOpacity>
        {/* MOD OPTIONS */}
        {isModerator(user?.enrollmentNumber) ? (
          <View>
            <Modal
              onBackdropPress={() => setisNotificationModalVisible(false)}
              style={{
                backgroundColor: black,
                ...Mixins.padding(10, 10, 10, 10),
              }}
              isVisible={isNotificationModalVisible}
            >
              <TextInput
                keyboardAppearance={'dark'}
                placeholderTextColor={text}
                style={[
                  styles.notificationInput,
                  {
                    backgroundColor: background,
                    borderColor: card,
                    color: text,
                  },
                ]}
                placeholder='Notification Title'
                onChangeText={(title) => setNotificationTitle(title)}
                value={notificationTitle}
              />
              <TextInput
                keyboardAppearance={'dark'}
                placeholderTextColor={text}
                style={[
                  styles.notificationInput,
                  {
                    backgroundColor: background,
                    borderColor: card,
                    color: text,
                  },
                ]}
                placeholder='Notification Body'
                onChangeText={(body) => setNotificationBody(body)}
                value={notificationBody}
              />
              <TextInput
                secureTextEntry
                keyboardAppearance={'dark'}
                placeholderTextColor={text}
                style={[
                  styles.notificationInput,
                  {
                    backgroundColor: background,
                    borderColor: card,
                    color: text,
                  },
                ]}
                placeholder='Moderator Password'
                onChangeText={(password) => setPassword(password)}
                value={password}
              />
              <TextInput
                keyboardAppearance={'dark'}
                placeholderTextColor={text}
                style={[
                  styles.notificationInput,
                  {
                    backgroundColor: background,
                    borderColor: card,
                    color: text,
                  },
                ]}
                placeholder='Screen'
                onChangeText={(screen) => setScreen(screen)}
                value={screen}
              />
              <TextInput
                keyboardAppearance={'dark'}
                placeholderTextColor={text}
                style={[
                  styles.notificationInput,
                  {
                    backgroundColor: background,
                    borderColor: card,
                    color: text,
                  },
                ]}
                placeholder='Which Drawer'
                onChangeText={(drawer) => setDrawer(drawer)}
                value={drawer}
              />
              <TouchableOpacity
                onPress={sendNotification}
                style={[
                  styles.button,
                  { backgroundColor: primary, marginTop: Mixins.scaleSize(20) },
                ]}
              >
                {loading ? (
                  <ActivityIndicator color='#fff' size='small' />
                ) : (
                  <Text style={[styles.buttonText, { color: '#fff' }]}>
                    Send Notification
                  </Text>
                )}
              </TouchableOpacity>
            </Modal>
            <Text style={[styles.title, { color: text }]}>
              Moderator Options
            </Text>
            <TouchableOpacity
              onPress={() => setisNotificationModalVisible(true)}
              style={[styles.button, { backgroundColor: primary }]}
            >
              <Text style={[styles.buttonText, { color: '#fff' }]}>
                Send Notification
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
        <View style={{ ...Mixins.padding(100, 0, 100, 0) }} />
      </ScrollView>
      <TouchableOpacity
        onPress={async () => {
          await AsyncStorage.clear();
          setisAuthenticated(false);
          // setTheme(Colors[item])
        }}
        style={[styles.logoutButton]}
      >
        <Text style={[styles.buttonText, { color: '#fff' }]}>Logout</Text>
      </TouchableOpacity>
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
    ...Mixins.padding(20, 20, 20, 20),
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Mixins.scaleSize(10),
    borderRadius: 2,
  },
  flatList: {
    height: Mixins.scaleSize(60),
  },
  logoutButton: {
    backgroundColor: '#eb4d4b',
    ...Mixins.padding(30, 0, 30, 0),
    alignItems: 'center',
    marginTop: Mixins.scaleSize(30),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  userDetailsContainer: {
    flexDirection: 'row',
    marginTop: Mixins.scaleSize(20),
    alignItems: 'center',
  },
  avatar: {
    height: Mixins.scaleSize(80),
    width: Mixins.scaleSize(80),
  },
  input: {
    height: Mixins.scaleSize(50),
    marginTop: Mixins.scaleSize(15),
    borderRadius: Mixins.scaleSize(4),
    borderWidth: Mixins.scaleSize(1),
    ...Mixins.padding(5, 0, 5, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
  },
  notificationInput: {
    height: Mixins.scaleSize(50),
    marginTop: Mixins.scaleSize(15),
    borderRadius: Mixins.scaleSize(4),
    borderWidth: Mixins.scaleSize(1),
    ...Mixins.padding(5, 0, 5, 10),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
  },
  muted: {
    color: 'gray',
    ...Mixins.padding(10, 10, 10, 10),
  },
  option: {
    ...Mixins.padding(20, 10, 20, 10),
    borderBottomWidth: 1,
    width: Mixins.WINDOW_WIDTH - Mixins.scaleSize(20),
    margin: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    height: Mixins.scaleSize(50),
    marginTop: Mixins.scaleSize(15),
    borderRadius: Mixins.scaleSize(4),
    borderWidth: Mixins.scaleSize(1),
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_12,
    justifyContent: 'center',
    ...Mixins.padding(5, 0, 5, 10),
  },
});
