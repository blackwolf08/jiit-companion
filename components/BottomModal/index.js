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
        ></ScrollView>
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
});
