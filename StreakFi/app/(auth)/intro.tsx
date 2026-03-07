import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Intro() {
  return (
    <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>
      <Text style={styles.icon}>💎</Text>

      <Text style={styles.title}>NFTs & Boosters</Text>

      <Text style={styles.desc}>
        Explore NFTs rewards and booster mechanics to grow your streak.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>🚀  Booster for you </Text>
        <Text style={styles.cardText}>
          Boost your streak rewards with special NFT boosters.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/(auth)/wallet")}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  icon: { fontSize: 70 },
  title: { color: "white", fontSize: 24, fontWeight: "bold", marginTop: 20 },
  desc: { color: "#cbd5f5", textAlign: "center", marginVertical: 20 },
  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 15,
    marginBottom: 30,
  },
  cardTitle: { color: "white", fontWeight: "bold",marginVertical:5 },
  cardText: { color: "#94a3b8" },
  button: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 25,
    paddingHorizontal: 40,
  },
  buttonText: { color: "white" },
});