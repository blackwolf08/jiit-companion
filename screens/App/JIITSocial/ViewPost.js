import Axios from "axios";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  RefreshControl,
  StyleSheet,
  View,
  Vibration,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { JIIT_SOCIAL_BASE_API } from "../../../api/constants";
import { Card } from "../../../components";
import { useTheme } from "../../../contexts";

const ViewPost = ({ navigation, route }) => {
  const { postId } = route?.params;
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const {
    theme: {
      colors: { text, black },
    },
  } = useTheme();

  const getPosts = async () => {
    try {
      let res = await Axios.get(`${JIIT_SOCIAL_BASE_API}/post/${postId}`);
      let posts = res?.data?.post;
      setData(posts);
      Vibration.vibrate(100);
    } catch (err) {
      setData([]);
      console.log("get post failed");
      console.log(err);
    }
  };

  useEffect(() => {
    (async () => {
      setLoading(true);
      await getPosts();
      Vibration.vibrate(100);
      setLoading(false);
    })();
  }, []);

  if (loading)
    return (
      <View style={styles.flexConatiner}>
        <ActivityIndicator color={text} />
      </View>
    );
  console.log(data);

  return (
    <View style={[styles.flexConatiner, { backgroundColor: black }]}>
      <Card navigation={navigation} item={data} />
    </View>
  );
};

export default ViewPost;

const styles = StyleSheet.create({
  flexConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
