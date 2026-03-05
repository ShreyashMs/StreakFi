import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Wallet() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connect Wallet</Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Connect Phantom</Text>
      </Pressable>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Connect Solflare</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, marginBottom: 20 },
  button: {
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 10,
    marginVertical: 10,
  },
  buttonText: { color: "#fff" },
});