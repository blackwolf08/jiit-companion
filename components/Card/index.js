import { EvilIcons, Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as firebase from "firebase";
import LottieView from "lottie-react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Vibration,
  View,
} from "react-native";
import Modal from "react-native-modal";
import { JIIT_SOCIAL_BASE_API } from "../../api/constants";
import heartLottie from "../../assets/lottieFiles/heart.json";
import { useDropDown, useTheme, useUser } from "../../contexts";
import { Mixins, Typography } from "../../styles";
import { Avatar } from "../Avatar";

export const Card = ({ item, navigation, getPosts }) => {
  const {
    theme: {
      colors: { background, black, text, primary, card },
    },
  } = useTheme();
  const { user } = useUser();
  const { ref } = useDropDown();

  const [likesLength, setlikesLength] = useState(0);
  const [isLiked, setisLiked] = useState(false);
  const [lastPress, setLastPress] = useState(0);
  const [heartDisplay, setHeartDisplay] = useState("none");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [avatar, setAvatar] = useState(undefined);

  const heartRef = useRef(null);

  useEffect(() => {
    const _likesLength = item?.likes?.length || 0;
    item?.likes?.forEach((_user) => {
      if (_user.enrollment_number == user.enrollmentNumber) setisLiked(true);
    });
    increaseView();
    setlikesLength(_likesLength);
    setAvatar();
    firebase.database().ref("avatars/").on("value", _setAvatar);
  }, []);

  const increaseLike = async () => {
    if (updating) return;
    setUpdating(true);

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
        `${JIIT_SOCIAL_BASE_API}/post/${item?._id}/like?enrollment_number=${user.enrollmentNumber}&username=${user?.userName}`
      );
    } catch (err) {
      console.log("like failed");
      console.log(err);
    }
    setUpdating(false);
  };

  const _setAvatar = async () => {
    let res = await firebase
      .database()
      .ref("avatars/" + item?.author?.enrollment_number)
      .once("value");
    res = JSON.parse(JSON.stringify(res));
    setAvatar(res?.avatar);
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
    if (updating) return;
    setUpdating(true);

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
    setUpdating(false);
  };

  const handleDoubleTap = async () => {
    let currentTime = new Date().getTime();
    let delta = currentTime - lastPress;
    setLastPress(currentTime);
    //if not double tap
    if (delta > 300) return;

    Vibration.vibrate(100);
    if (!isLiked) {
      await increaseLike();
    } else {
      await decreaseLike();
    }

    //heart animation
  };

  const deletePost = async () => {
    setIsDeleting(true);
    try {
      let formData = new FormData();
      formData.append("enrollment_number", user?.enrollmentNumber);
      await new axios({
        method: "post",
        url: `${JIIT_SOCIAL_BASE_API}/post/${item?._id}/delete`,
        data: formData,
        config: { headers: { "Content-Type": "multipart/form-data" } },
      });
      ref.current.alertWithType("success", "Post deleted successfully", "");
      getPosts();
      setIsModalVisible(false);
    } catch (err) {
      console.log(err);
    }
    setIsDeleting(false);
  };

  const postActions = () => {
    setIsModalVisible(true);
  };
  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        onBackdropPress={() => setIsModalVisible(false)}
      >
        {item?.author?.enrollment_number == user?.enrollmentNumber ? (
          <TouchableOpacity onPress={deletePost} style={[styles.logoutButton]}>
            {isDeleting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={[styles.buttonText, { color: "#fff" }]}>
                Delete Post
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={async () => {
              setIsModalVisible(false);
            }}
            style={[styles.logoutButton]}
          >
            <Text style={[styles.buttonText, { color: "#fff" }]}>
              You can only delete your own post
            </Text>
          </TouchableOpacity>
        )}
      </Modal>
      <View style={[styles.header, { backgroundColor: black }]}>
        <View style={styles.headerLeft}>
          <Avatar image={avatar} />
          <Text style={[styles.userName, { color: text }]}>
            {item?.author?.username}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => postActions()}
          style={styles.headerRight}
        >
          <Ionicons name="ios-more" color={text} size={Mixins.scaleSize(20)} />
        </TouchableOpacity>
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
          <View style={styles.views}>
            <Text
              style={[
                styles.likes,
                {
                  color: "white",
                  backgroundColor: "#00000070",
                  fontSize: Mixins.scaleSize(16),
                },
              ]}
            >
              {item?.views}{" "}
              <Ionicons
                name="ios-eye"
                size={Mixins.scaleSize(16)}
                color="white"
              />
            </Text>
          </View>
          <Image
            enableHorizontalBounce={true}
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
              Liked by {item?.likes[0]?.username || user?.userName} and{" "}
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
      {item?.caption !== undefined && (
        <View style={{ backgroundColor: black }}>
          <Text
            style={[
              styles.likes,
              { color: text, marginTop: Mixins.scaleSize(5) },
            ]}
          >
            <Text style={{ fontFamily: Typography.FONT_FAMILY_BOLD }}>
              {item?.author?.username}
            </Text>{" "}
            {item?.caption}
          </Text>
        </View>
      )}

      <TouchableWithoutFeedback
        onPress={() =>
          navigation.navigate("comments", {
            comments: item?.comments,
            _id: item?._id,
          })
        }
      >
        <View>
          <Text
            style={[styles.comments, { color: "gray", backgroundColor: black }]}
          >
            view all {item?.comments?.length} comments
          </Text>
          {item?.comments[0] && (
            <View style={{ backgroundColor: black }}>
              <Text
                style={[
                  styles.likes,
                  {
                    color: text,
                  },
                ]}
              >
                <Text style={{ fontFamily: Typography.FONT_FAMILY_BOLD }}>
                  {item?.comments[0]?.author?.username}
                </Text>{" "}
                {item?.comments[0]?.body}
              </Text>
            </View>
          )}
        </View>
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
    ...Mixins.padding(10, 10, 10, 10),
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
  views: {
    position: "absolute",
    backgroundColor: "transparent",
    zIndex: 10,
    bottom: 0,
    right: 0,
  },
  buttonText: {
    fontSize: Typography.FONT_SIZE_16,
    fontFamily: Typography.FONT_FAMILY_REGULAR,
  },
  button: {
    ...Mixins.padding(20, 20, 20, 20),
    justifyContent: "center",
    alignItems: "center",
    marginTop: Mixins.scaleSize(10),
    borderRadius: 2,
  },
  logoutButton: {
    backgroundColor: "#eb4d4b",
    ...Mixins.padding(30, 0, 30, 0),
    alignItems: "center",
    marginTop: Mixins.scaleSize(30),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
