import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import axios from "axios";

import { Mixins, Typography } from "../../styles";
import { useTheme, useUser } from "../../contexts";
import { JIIT_SOCIAL_BASE_API } from "../../api/constants";

export const Card = ({ item, navigation }) => {
  const {
    theme: {
      colors: { background, black, text, primary, card },
    },
  } = useTheme();
  const { user } = useUser();

  const [likesLength, setlikesLength] = useState(0);
  const [isLiked, setisLiked] = useState(false);

  useEffect(() => {
    const _likesLength = item?.likes?.length || 0;
    item?.likes?.forEach((_user) => {
      if (_user.enrollment_number == user.enrollmentNumber) setisLiked(true);
    });
    increaseView();
    setlikesLength(_likesLength);
  }, []);

  const increaseLike = async () => {
    try {
      setisLiked(true);
      let newLikesLength = likesLength + 1;
      setlikesLength(newLikesLength);
      await axios.get(
        `${JIIT_SOCIAL_BASE_API}/post/${item?._id}/like?enrollment_number=${user.enrollmentNumber}`
      );
    } catch (err) {
      console.log("like failed");
      console.log(err);
    }
  };

  const increaseView = async () => {
    try {
      await axios.get(`${JIIT_SOCIAL_BASE_API}/post/${item?._id}/view`);
    } catch (err) {
      console.log("view failed");
      console.log(err);
    }
  };

  const decreaseLike = async () => {};
  console.log(item?.author);
  return (
    <>
      <View style={[styles.header, { backgroundColor: black }]}>
        <View style={styles.headerLeft}>
          <Image
            style={styles.avatar}
            source={{ uri: "https://picsum.photos/100" }}
          />
          <Text style={[styles.userName, { color: text }]}>
            {item?.author?.enrollment_number}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="ios-more" color={text} size={Mixins.scaleSize(20)} />
        </View>
      </View>
      <Image source={{ uri: item?.image_string }} style={styles.image} />
      <View style={[styles.actionConatiner, { backgroundColor: black }]}>
        {isLiked ? (
          <Ionicons
            name="ios-heart"
            color={"#c0392b"}
            size={Mixins.scaleSize(30)}
          />
        ) : (
          <TouchableOpacity onPress={increaseLike}>
            <Ionicons
              name="ios-heart-empty"
              color={text}
              size={Mixins.scaleSize(30)}
            />
          </TouchableOpacity>
        )}
        <EvilIcons
          name="comment"
          color={text}
          style={{ marginLeft: 20 }}
          size={Mixins.scaleSize(35)}
        />
      </View>
      {likesLength ? (
        <Text style={[styles.likes, { color: "gray", backgroundColor: black }]}>
          Liked by {item?.likes[0]?.enrollment_number || user?.enrollmentNumber}{" "}
          and {likesLength - 1} others
        </Text>
      ) : (
        <Text style={[styles.likes, { color: "gray", backgroundColor: black }]}>
          {likesLength} likes
        </Text>
      )}
      {item?.comments[0] && (
        <Text style={[styles.likes, { color: "gray", backgroundColor: black }]}>
          {item?.comments[0]?.author?.enrollment_number}
        </Text>
      )}
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("comments", {
            comments: item?.comments,
            _id: item?._id,
          })
        }
      >
        <Text
          style={[styles.comments, { color: "gray", backgroundColor: black }]}
        >
          view all {item?.comments?.length} comments
        </Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    resizeMode: "contain",
    height: Mixins.WINDOW_WIDTH,
    width: Mixins.WINDOW_WIDTH,
  },
  avatar: {
    height: Mixins.scaleSize(40),
    width: Mixins.scaleSize(40),
    borderRadius: Mixins.scaleSize(20),
  },
  header: {
    ...Mixins.padding(10, 10, 10, 10),
    flexDirection: "row",
    alignItems: "center",
  },
  userName: {
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    fontSize: Typography.FONT_SIZE_16,
    marginLeft: Mixins.scaleSize(20),
  },
  headerLeft: {
    flex: 9,
    flexDirection: "row",
    alignItems: "center",
  },
  headerRight: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  actionConatiner: {
    flexDirection: "row",
    width: "100%",
    ...Mixins.padding(10, 10, 10, 10),
  },
  likes: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    ...Mixins.padding(0, 10, 0, 10),
  },
  comments: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
    ...Mixins.padding(10, 10, 40, 10),
  },
});
