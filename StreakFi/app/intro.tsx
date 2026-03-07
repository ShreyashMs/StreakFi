import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Intro() {
  return (
    <LinearGradient colors={["#3b1c80", "#0a0f2c"]} style={styles.container}>
      <Text style={styles.icon}>💎</Text>

      <Text style={styles.title}>NFT & Booster Introduction</Text>

      <Text style={styles.desc}>
        Explore the NFT reward system and rare boosters.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚀 SKR Booster</Text>
        <Text style={styles.cardText}>
          Use boosters to increase rewards.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/wallet")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  icon: { fontSize: 70, marginBottom: 20 },
  title: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  desc: { color: "#ccc", textAlign: "center", marginVertical: 20 },
  card: {
    backgroundColor: "#1c1f3a",
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  cardTitle: { color: "#fff", fontWeight: "bold" },
  cardText: { color: "#aaa" },
  button: {
    backgroundColor: "#7a5cff",
    padding: 14,
    borderRadius: 25,
    paddingHorizontal: 40,
  },
  buttonText: { color: "#fff" },
});