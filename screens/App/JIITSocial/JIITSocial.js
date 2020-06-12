import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ActivityIndicator,
} from "react-native";

import { Card } from "../../../components";
import { useTheme } from "../../../contexts";
import Axios from "axios";
import { JIIT_SOCIAL_BASE_API } from "../../../api/constants";

const JIITSocial = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [refreshing, setrefreshing] = useState();

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
        renderItem={({ item }) => <Card navigation={navigation} item={item} />}
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
