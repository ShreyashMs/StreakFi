import { Pressable, StyleSheet, Text } from "react-native";

export default function FloatingActionButton() {
  return (
    <Pressable style={styles.button}>
      <Text style={styles.plus}>＋</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 30,
    right: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#6C63FF",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },

  plus: {
    color: "white",
    fontSize: 28,
  },
});