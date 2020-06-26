import { Ionicons } from "@expo/vector-icons";
import { useHeaderHeight } from "@react-navigation/stack";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  Vibration,
  View,
} from "react-native";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { JIIT_SOCIAL_BASE_API } from "../../../api/constants";
import { Avatar } from "../../../components/Avatar";
import { useTheme, useUser } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";
import * as firebase from "firebase";

const CommentView = ({ item, _id, setcommentsArray, commentsArray }) => {
  const {
    theme: {
      colors: { text },
    },
  } = useTheme();
  const { user } = useUser();
  const [isdeleteing, setIsdeleteing] = useState(false);
  const [avatar, setAvatar] = useState(undefined);
  useEffect(() => {
    getAvatar(item?.author?.enrollment_number);
  }, []);

  const deleteComment = async (id) => {
    setIsdeleteing(true);
    let { data } = await new axios({
      method: "post",
      url: `${JIIT_SOCIAL_BASE_API}/post/${_id}/comment/${id}/delete`,
      config: { headers: { "Content-Type": "multipart/form-data" } },
    });
    setIsdeleteing(false);
    let _newCommentsArray = commentsArray.filter((el) => el._id != id);
    setcommentsArray(_newCommentsArray);
    Vibration.vibrate(100);
  };

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
          {item?.author?.username}
        </Text>
        {"  "}
        {item?.body}
      </Text>
      {item?.author?.enrollment_number == user?.enrollmentNumber && (
        <TouchableOpacity
          onPress={() => deleteComment(item?._id)}
          style={styles.deleteButton}
        >
          {isdeleteing ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Ionicons
              size={Mixins.scaleSize(20)}
              name="ios-trash"
              color="#fff"
            />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

const Comment = ({ route }) => {
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
      formData.append("username", user.userName);

      let newComments = await new axios({
        method: "post",
        url: `${JIIT_SOCIAL_BASE_API}/post/${_id}/comment/new`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
      setcommentsArray(newComments?.data?.comments);
      Vibration.vibrate(100);
      setloading(false);
    } catch (err) {
      console.log("adding comment error");
      setcommentsArray([]);
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
            <CommentView
              setcommentsArray={setcommentsArray}
              commentsArray={commentsArray}
              _id={_id}
              item={item}
            />
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
    marginLeft: Mixins.scaleSize(20),
  },
  deleteButton: {
    backgroundColor: "#eb4d4b",
    alignItems: "center",
    justifyContent: "center",
    height: Mixins.scaleSize(30),
    width: Mixins.scaleSize(30),
    borderRadius: Mixins.scaleSize(20),
  },
});
