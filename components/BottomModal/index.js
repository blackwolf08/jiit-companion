import React, { useState, useRef } from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import Modal from "react-native-modal";
import { useBottomModal, useTheme } from "../../contexts";
import { Mixins } from "../../styles";

const BottomModal = () => {
  const { isVisible, setisVisible } = useBottomModal();
  const {
    theme: {
      colors: { primary, text, black, card, background },
    },
  } = useTheme();
  let scrollViewRef = useRef();
  const [scrollOffset, setscrollOffset] = useState(null);

  const handleOnScroll = (event) => {
    setscrollOffset(event.nativeEvent.contentOffset.y);
  };
  const handleScrollTo = (p) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo(p);
    }
  };
  return (
    <Modal
      isVisible={isVisible}
      onSwipeComplete={() => setisVisible(false)}
      swipeDirection={["down"]}
      scrollTo={handleScrollTo}
      scrollOffset={scrollOffset}
      scrollOffsetMax={Mixins.WINDOW_HEIGHT * 0.4 - 300} // content height - ScrollView height
      propagateSwipe={true}
      onBackdropPress={() => setisVisible(false)}
      style={styles.modal}
    >
      <View style={styles.scrollableModal}>
        <ScrollView
          ref={scrollViewRef}
          onScroll={handleOnScroll}
          scrollEventThrottle={16}
        >
          <View style={styles.scrollableModalContent1}>
            <Text style={styles.scrollableModalText1}>
              You can scroll me up! 👆
            </Text>
          </View>
          <View style={styles.scrollableModalContent1}>
            <Text style={styles.scrollableModalText1}>
              You can scroll me up! 👆
            </Text>
          </View>
          <View style={styles.scrollableModalContent2}>
            <Text style={styles.scrollableModalText2}>
              Same here as well! ☝
            </Text>
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
};

export default BottomModal;

const styles = StyleSheet.create({
  modal: {
    justifyContent: "flex-end",
    margin: 0,
  },
  scrollableModal: {
    height: Mixins.WINDOW_HEIGHT * 0.6,
  },
  scrollableModalContent1: {
    height: 200,
    backgroundColor: "#87BBE0",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollableModalText1: {
    fontSize: 20,
    color: "white",
  },
  scrollableModalContent2: {
    height: 200,
    backgroundColor: "#A9DCD3",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollableModalText2: {
    fontSize: 20,
    color: "white",
  },
});
