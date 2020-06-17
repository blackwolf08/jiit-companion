import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Avatar } from "../../../components/Avatar";
import { useTheme } from "../../../contexts";
import { Mixins, Typography } from "../../../styles";

const Likes = ({ route }) => {
  const {
    theme: {
      colors: { text },
    },
  } = useTheme();

  const [likesArray, setlikesArray] = useState([]);

  const { _id, likes } = route.params;
  useEffect(() => {
    setlikesArray(likes);
  }, []);

  return (
    <ScrollView>
      {likesArray?.map((item, key) => (
        <View key={`comment-${key}`} style={styles.commentContainer}>
          <Avatar />
          <Text style={[styles.commentText, { color: text }]}>
            <Text style={{ fontFamily: Typography.FONT_FAMILY_BOLD }}>
              {item?.enrollment_number}
            </Text>
          </Text>
        </View>
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
