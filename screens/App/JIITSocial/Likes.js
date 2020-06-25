import * as firebase from "firebase";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "../../../components/Avatar";
import { useTheme } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";

const LikesView = ({ item }) => {
  const {
    theme: {
      colors: { text },
    },
  } = useTheme();
  const [avatar, setAvatar] = useState(undefined);
  useEffect(() => {
    getAvatar(item?.enrollment_number);
  }, []);

  const getAvatar = async (enrollmentNumber) => {
    let res = await firebase
      .database()
      .ref("avatars/" + enrollmentNumber)
      .once("value");
    res = JSON.parse(JSON.stringify(res));
    setAvatar(res?.avatar);
  };
  return (
    <View style={styles.commentContainer}>
      <Avatar image={avatar} />
      <Text style={[styles.commentText, { color: text }]}>
        <Text style={{ fontFamily: Typography.FONT_FAMILY_BOLD }}>
          {item?.username}
        </Text>
      </Text>
    </View>
  );
};

const Likes = ({ route }) => {
  const [likesArray, setlikesArray] = useState([]);

  const { _id, likes } = route.params;
  useEffect(() => {
    setlikesArray(likes);
  }, []);

  return (
    <ScrollView>
      {likesArray?.map((item, key) => (
        <LikesView item={item} key={`like-${key}`} />
      ))}
    </ScrollView>
  );
};
export default Likes;

const styles = StyleSheet.create({
  avatar: {
    height: Mixins.scaleSize(30),
    width: Mixins.scaleSize(30),
    borderRadius: Mixins.scaleSize(15),
    resizeMode: "cover",
    marginRight: Mixins.scaleSize(20),
  },

  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    ...Mixins.padding(10, 10, 10, 10),
  },
  commentText: {
    flex: 8,
    marginLeft: Mixins.scaleSize(20),
  },
});
