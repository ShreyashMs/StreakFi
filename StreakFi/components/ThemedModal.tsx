import React from "react";
import {
    Modal,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";

interface Props {
  visible: boolean;
  title?: string;
  message: string;
  onClose: () => void;
}

export default function ThemedModal({
  visible,
  title = "StreakFi",
  message,
  onClose,
}: Props) {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>

        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({

  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
  },

  container: {
    width: "80%",
    backgroundColor: "#1e293b",
    padding: 25,
    borderRadius: 15,
    alignItems: "center",
  },

  title: {
    color: "#a855f7",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },

  message: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },

  button: {
    backgroundColor: "#a855f7",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 8,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

});