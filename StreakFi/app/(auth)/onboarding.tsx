import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Onboarding() {
  return (
    <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>
      <Text style={styles.emoji}>🔥</Text>

      <Text style={styles.title}>Welcome to StreakFi</Text>

      <Text style={styles.desc}>
        Build streaks, earn XP and unlock NFT rewards.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/intro")}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  emoji: { fontSize: 80 },
  title: { color: "white", fontSize: 26, fontWeight: "bold", marginTop: 20 },
  desc: { color: "#cbd5f5", textAlign: "center", marginVertical: 20 },
  button: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 25,
    paddingHorizontal: 40,
  },
  buttonText: { color: "white", fontWeight: "bold" },
});