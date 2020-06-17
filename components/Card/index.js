import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
} from "react-native";
import { Ionicons, EvilIcons } from "@expo/vector-icons";
import axios from "axios";
import LottieView from "lottie-react-native";

import { Mixins, Typography } from "../../styles";
import { useTheme, useUser } from "../../contexts";
import { JIIT_SOCIAL_BASE_API } from "../../api/constants";
import heartLottie from "../../assets/lottieFiles/heart.json";
import { Avatar } from "../Avatar";

export const Card = ({ item, navigation }) => {
  const {
    theme: {
      colors: { background, black, text, primary, card },
    },
  } = useTheme();
  const { user } = useUser();

  const [likesLength, setlikesLength] = useState(0);
  const [isLiked, setisLiked] = useState(false);
  const [lastPress, setLastPress] = useState(0);
  const [heartDisplay, setHeartDisplay] = useState("none");

  const heartRef = useRef(null);

  useEffect(() => {
    const _likesLength = item?.likes?.length || 0;
    item?.likes?.forEach((_user) => {
      if (_user.enrollment_number == user.enrollmentNumber) setisLiked(true);
    });
    increaseView();
    setlikesLength(_likesLength);
  }, []);

  const increaseLike = async () => {
    setHeartDisplay("flex");
    heartRef.current.play();
    setTimeout(() => {
      setHeartDisplay("none");
    }, 1000);

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
      heartRef.current.play();
    } catch (err) {
      console.log("view failed");
      console.log(err);
    }
  };

  const decreaseLike = async () => {
    try {
      setisLiked(false);
      let newLikesLength = likesLength - 1;

      if (newLikesLength < 0) newLikesLength = 0;
      setlikesLength(newLikesLength);

      await axios.get(
        `${JIIT_SOCIAL_BASE_API}/post/${item?._id}/unlike?enrollment_number=${user.enrollmentNumber}`
      );
    } catch (err) {
      console.log("unlike failed");
      console.log(err);
    }
  };

  const handleDoubleTap = () => {
    let currentTime = new Date().getTime();
    let delta = currentTime - lastPress;
    setLastPress(currentTime);
    Vibration.vibrate(100);

    //if not double tap
    if (delta > 300) return;
    console.log(isLiked);
    if (!isLiked) {
      increaseLike();
    } else {
      decreaseLike();
    }

    //heart animation
  };
  return (
    <View style={styles.container}>
      <View style={[styles.header, { backgroundColor: black }]}>
        <View style={styles.headerLeft}>
          <Avatar />
          <Text style={[styles.userName, { color: text }]}>
            {item?.author?.enrollment_number}
          </Text>
        </View>
        <View style={styles.headerRight}>
          <Ionicons name="ios-more" color={text} size={Mixins.scaleSize(20)} />
        </View>
      </View>

      <TouchableWithoutFeedback onPress={handleDoubleTap}>
        <View style={{ position: "relative" }}>
          <View style={styles.lottieView}>
            <LottieView
              source={heartLottie}
              autoPlay={false}
              loop={false}
              ref={heartRef}
              style={[styles.heartLottie, { display: heartDisplay }]}
            />
          </View>
          <Image
            source={{ uri: JIIT_SOCIAL_BASE_API + item?.image_path }}
            style={styles.image}
          />
        </View>
      </TouchableWithoutFeedback>
      <View style={[styles.actionConatiner, { backgroundColor: black }]}>
        {isLiked ? (
          <TouchableOpacity onPress={decreaseLike}>
            <Ionicons
              name="ios-heart"
              color={"#c0392b"}
              size={Mixins.scaleSize(30)}
            />
          </TouchableOpacity>
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
          style={{ marginLeft: Mixins.scaleSize(20) }}
          size={Mixins.scaleSize(35)}
          onPress={() =>
            navigation.navigate("comments", {
              comments: item?.comments,
              _id: item?._id,
            })
          }
        />
      </View>

      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("likes", {
            likes: item?.likes,
            _id: item?._id,
          })
        }
      >
        <View>
          {likesLength ? (
            <Text
              style={[styles.likes, { color: "gray", backgroundColor: black }]}
            >
              Liked by{" "}
              {item?.likes[0]?.enrollment_number || user?.enrollmentNumber} and{" "}
              {likesLength - 1} others
            </Text>
          ) : (
            <Text
              style={[styles.likes, { color: "gray", backgroundColor: black }]}
            >
              {likesLength} likes
            </Text>
          )}
        </View>
      </TouchableWithoutFeedback>
      {item?.caption && (
        <View style={{ backgroundColor: black }}>
          <Text
            style={[
              styles.likes,
              { color: text, marginTop: Mixins.scaleSize(5) },
            ]}
          >
            <Text style={{ fontFamily: Typography.FONT_FAMILY_BOLD }}>
              {item?.author?.enrollment_number}
            </Text>
            {"  "}
            {item?.caption}
          </Text>
        </View>
      )}
      {item?.comments[0] && (
        <Text style={[styles.likes, { color: "gray", backgroundColor: black }]}>
          {item?.comments[0]?.author?.enrollment_number}
        </Text>
      )}
      <TouchableWithoutFeedback
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
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
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
  heartLottie: {
    width: Mixins.scaleSize(200),
    height: Mixins.scaleSize(200),
  },
  lottieView: {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 10,
    alignItems: "center",
    justifyContent: "center",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
