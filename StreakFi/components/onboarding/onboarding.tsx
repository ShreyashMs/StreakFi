import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

export default function Onboarding() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔥 Welcome to StreakFi</Text>

      <Text style={styles.subtitle}>
        Build streaks and earn NFT rewards.
      </Text>

      <Pressable style={styles.button}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 28, marginBottom: 10 },
  subtitle: { fontSize: 16, marginBottom: 20 },
  button: {
    backgroundColor: "#7C3AED",
    padding: 14,
    borderRadius: 10,
  },
  buttonText: { color: "#fff" },
});