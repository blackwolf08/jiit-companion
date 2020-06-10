import React from "react";
import { StyleSheet } from "react-native";
import Modal from "react-native-modal";

export const ModalContainer = ({ children, isVisible, onBackdropPress }) => {
  return (
    <Modal onBackdropPress={onBackdropPress} isVisible={isVisible}>
      {children}
    </Modal>
  );
};

const styles = StyleSheet.create({});
