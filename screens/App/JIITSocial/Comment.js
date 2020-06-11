import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  View,
  Text,
  TextInput,
  Platform,
  Button,
  Image,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import { useTheme, useUser } from "../../../contexts";
import { useHeaderHeight } from "@react-navigation/stack";
import {
  ScrollView,
  TouchableOpacity,
  FlatList,
} from "react-native-gesture-handler";
import { Mixins, Typography } from "../../../styles";
import { JIIT_SOCIAL_BASE_API } from "../../../api/constants";

const Comment = ({ item, navigation, route }) => {
  const {
    theme: {
      colors: { background, black, text, primary, card },
    },
  } = useTheme();
  const { user } = useUser();

  const [comment, setComment] = useState("");
  const [commentsArray, setcommentsArray] = useState([]);
  const [loading, setloading] = useState(false);
  const headerHeight = useHeaderHeight();

  const { _id, comments } = route.params;
  useEffect(() => {
    setcommentsArray(comments);
  }, []);

  const postComment = async () => {
    setComment("");
    try {
      setloading(true);

      let formData = new FormData();
      formData.append("comment_body", comment);
      formData.append("enrollment_number", user.enrollmentNumber);
      formData.append("username", user.enrollmentNumber);

      await new axios({
        method: "post",
        url: `${JIIT_SOCIAL_BASE_API}/post/${_id}/comment/new`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
      let newComment = {
        _id: `5ee215e${Math.floor(Math.random() * 1000000)}`,
        author: {
          id: user.enrollmentNumber,
          username: user.enrollmentNumber,
        },
        body: comment,
        created_at: Date.now(),
      };
      let newCommentsArray = [...commentsArray, newComment];
      setcommentsArray(newCommentsArray);
      setloading(false);
    } catch (err) {
      console.log("adding comment error");
      setloading(false);
    }
  };

  return (
    <>
      <KeyboardAvoidingView
        keyboardVerticalOffset={headerHeight + 20}
        style={{ flex: 1 }}
        behavior={Platform.OS == "ios" ? "padding" : "height"}
      >
        <FlatList
          data={commentsArray}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Image
                style={styles.avatar}
                source={{ uri: "https://picsum.photos/100" }}
              />
              <Text style={[styles.commentText, { color: text }]}>
                <Text style={{ fontFamily: Typography.FONT_FAMILY_BOLD }}>
                  {item?.author?.username}
                </Text>
                {"  "}
                {item?.body}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item._id}
        />
        <TextInput
          style={[styles.input, { backgroundColor: black, color: "gray" }]}
          placeholder={`Add a comment as ${user.enrollmentNumber}`}
          placeholderTextColor="gray"
          onChangeText={(comment) => setComment(comment)}
          multiline
          value={comment}
        />
        <TouchableOpacity
          onPress={postComment}
          style={[styles.button, { backgroundColor: card }]}
        >
          {loading ? (
            <ActivityIndicator color={text} />
          ) : (
            <Text style={[styles.buttonText, { color: text }]}>POST</Text>
          )}
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </>
  );
};
export default Comment;

const styles = StyleSheet.create({
  input: {
    ...Mixins.padding(20, 10, 20, 10),
  },
  button: {
    ...Mixins.padding(20, 10, 20, 10),
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    height: Mixins.scaleSize(30),
    width: Mixins.scaleSize(30),
    borderRadius: Mixins.scaleSize(15),
    resizeMode: "cover",
    marginRight: Mixins.scaleSize(20),
  },
  buttonText: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
    ...Mixins.padding(10, 10, 10, 10),
  },
  commentText: {
    flex: 8,
  },
});
