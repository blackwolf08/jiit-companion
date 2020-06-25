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
import { Mixins } from "../../../styles";

const JIITSocial = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [refreshing, setrefreshing] = useState();

  // onFocus refresh hook
  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      // The screen is focused
      getPosts();
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const {
    theme: {
      colors: { text },
    },
  } = useTheme();

  const getPosts = async () => {
    setrefreshing(true);
    try {
      let res = await Axios.get(`${JIIT_SOCIAL_BASE_API}/posts`);
      let posts = res?.data?.posts?.reverse();
      setData(posts);
      Vibration.vibrate(100);
      setrefreshing(false);
    } catch (err) {
      setData([]);
      console.log("get posts failed");
      setrefreshing(false);
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

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            tintColor={text}
            refreshing={refreshing}
            onRefresh={getPosts}
          />
        }
        data={data}
        renderItem={({ item }) => (
          <Card getPosts={getPosts} navigation={navigation} item={item} />
        )}
        keyExtractor={(item) => item?._id}
      />
    </View>
  );
};

export default JIITSocial;

const styles = StyleSheet.create({
  flexConatiner: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
