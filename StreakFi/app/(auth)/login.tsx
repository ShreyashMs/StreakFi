import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedModal from "../../components/ThemedModal"; // import modal
import { createUserIfNotExists } from "../../services/userService";

export default function Login() {

  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const connectWallet = async () => {
    try {
      setLoading(true);

      const walletAddress =
        "demo_wallet_" + Math.floor(Math.random() * 100000);

      await createUserIfNotExists(walletAddress);

      await AsyncStorage.setItem("wallet", walletAddress);

      router.replace("/(tabs)/home");

    } catch (error) {

      setModalMessage("Connection failed due to some issue.");
      setModalVisible(true);

    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>

      <Image
        source={require("../../assets/images/splash-icon.png")}
        style={styles.image}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={connectWallet}
        disabled={loading}
      >
        <Text style={styles.buttonText}>
          {loading ? "Connecting..." : "Connect Phantom / Solflare"}
        </Text>
      </TouchableOpacity>

      {/* Modal */}
      <ThemedModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => setModalVisible(false)}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },

  image: {
    width: 250,
    height: 130,
    marginBottom: 40,
  },

  button: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "600",
  },
});