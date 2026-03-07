import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Login() {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>⚡</Text>

      <Text style={styles.title}>StreakFi</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.replace("/(main)/home")}
      >
        <Text style={styles.buttonText}>Connect Phantom / Solflare</Text>
      </TouchableOpacity>


    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  logo: { fontSize: 60 },
  title: { fontSize: 28, fontWeight: "bold", marginVertical: 20 },
  button: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },
  buttonText: { color: "white" },
  email: { marginTop: 20, color: "#475569" },
});