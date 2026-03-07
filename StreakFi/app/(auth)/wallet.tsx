import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function Wallet() {
  return (
    <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>
      <Text style={styles.icon}>🔗</Text>

      <Text style={styles.title}>Connect Your Wallet</Text>

      <TouchableOpacity style={styles.walletBtn} onPress={() => router.push("/(auth)/login")}>
        <Text style={styles.walletText}>Connect Phantom / Solflare</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>Secure Web3 authentication</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  icon: { fontSize: 70 },
  title: { color: "white", fontSize: 22, marginVertical: 20 },
  walletBtn: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
    marginBottom: 15,
  },
  emailBtn: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 20,
    width: "80%",
    alignItems: "center",
  },
  walletText: { color: "white" },
  footer: { color: "#94a3b8", marginTop: 20 },
});