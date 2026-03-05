import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Auth() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Authentication</Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 26, marginBottom: 30 },
  button: {
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
    width: 200,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16 },
});