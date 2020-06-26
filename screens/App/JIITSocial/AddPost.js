import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/stack";
import Constants from "expo-constants";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Vibration,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { addPostToDB } from "../../../api/requests";
import { useDropDown, useTheme, useUser } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";

export const AddPost = ({ navigation }) => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const headerHeight = useHeaderHeight();
  const [isLoading, setisLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const { user } = useUser();
  const { ref } = useDropDown();

  const {
    theme: {
      colors: { background, primary, card, text, black },
    },
  } = useTheme();

  useEffect(() => {
    (async () => {
      if (Constants.platform.ios) {
        const {
          status,
        } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.4,
      base64: true,
    });
    if (!result.cancelled) {
      setDisabled(false);
      setImage(result.base64);
      Vibration.vibrate(100);
    }
  };

  const uploadImage = async () => {
    Keyboard.dismiss();
    setisLoading(true);
    let res = await addPostToDB(
      user.enrollmentNumber,
      image,
      caption,
      user?.userName
    );
    if (res.message == "success")
      ref.current.alertWithType("success", "Image uploaded successfully", "");
    if (res.message == "error")
      ref.current.alertWithType("error", "Image upload error", "");

    Vibration.vibrate(100);
    setisLoading(false);
    navigation.navigate("jiitsocial");
  };

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={headerHeight + 40}
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
    >
      <ScrollView>
        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={[styles.imageConatiner, { backgroundColor: black }]}
            onPress={pickImage}
          >
            {image ? (
              <Image
                source={{
                  uri: "data:image/jpeg;base64," + image,
                }}
                style={styles.image}
              />
            ) : (
              <>
                <Ionicons
                  size={Mixins.scaleSize(42)}
                  name="ios-camera"
                  color={text}
                />
                <Text
                  style={{
                    fontSize: Mixins.scaleSize(24),
                    color: text,
                    fontFamily: Typography.FONT_FAMILY_REGULAR,
                  }}
                >
                  Pick an Image
                </Text>
              </>
            )}
          </TouchableOpacity>
          <TextInput
            placeholderTextColor={"gray"}
            placeholder="Write a caption..."
            style={styles.input}
            numberOfLines={5}
            onChangeText={(caption) => setCaption(caption)}
          />
          <TouchableOpacity
            disabled={disabled}
            onPress={uploadImage}
            style={[
              styles.logInButton,
              {
                backgroundColor: primary,
                opacity: disabled ? 0.5 : 1,
              },
            ]}
          >
            {isLoading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={[styles.logInText]}>Continue</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  imageConatiner: {
    width: Mixins.WINDOW_WIDTH,
    height: Mixins.WINDOW_WIDTH,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: Mixins.WINDOW_WIDTH,
    height: Mixins.WINDOW_WIDTH,
  },
  input: {
    ...Mixins.padding(10, 10, 10, 10),
    color: "gray",
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    width: Mixins.WINDOW_WIDTH - 30,
  },
  logInButton: {
    height: Mixins.scaleSize(50),
    borderRadius: Mixins.scaleSize(5),
    marginTop: Mixins.scaleSize(15),
    alignItems: "center",
    justifyContent: "center",
    margin: "auto",
    width: Mixins.WINDOW_WIDTH * 0.7,
  },
  logInText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    textAlign: "center",
    color: "#fff",
  },
});
