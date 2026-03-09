import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ThemedModal from "../../components/ThemedModal";
import { disconnectWallet } from "../../services/walletService";

export default function Profile() {

  const [wallet, setWallet] = useState<string | null>(null);
  const [xp, setXP] = useState(0);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const router = useRouter();

  useEffect(() => {

    const loadProfile = async () => {

      const storedWallet = await AsyncStorage.getItem("wallet");
      const storedXP = await AsyncStorage.getItem("xp");

      setWallet(storedWallet);
      setXP(storedXP ? parseInt(storedXP) : 0);

    };

    loadProfile();

  }, []);

  const shortenWallet = (w: string) =>
    w.slice(0, 4) + "..." + w.slice(-4);

  const copyWallet = async () => {

    if (!wallet) return;

    await Clipboard.setStringAsync(wallet);

    setModalMessage("Wallet address copied!");
    setModalVisible(true);

  };

  const logout = async () => {

    try {

      await disconnectWallet();
      setWallet(null);

      router.replace("/(auth)/onboarding");

    } catch (error) {

      setModalMessage("Failed to disconnect wallet.");
      setModalVisible(true);

    }

  };

  return (

    <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>
      <SafeAreaView style={styles.container}>

        <Text style={styles.header}>
          Profile
        </Text>

        <View style={styles.card}>

          <Text style={styles.label}>
            Wallet
          </Text>

          <Text style={styles.wallet}>
            {wallet ? shortenWallet(wallet) : "Not connected"}
          </Text>

          {wallet && (
            <TouchableOpacity onPress={copyWallet}>
              <Text style={styles.copy}>
                Copy Address
              </Text>
            </TouchableOpacity>
          )}

        </View>

        <View style={styles.card}>

          <Text style={styles.label}>
            Total XP
          </Text>

          <Text style={styles.value}>
            {xp}
          </Text>

        </View>

        <TouchableOpacity
          style={styles.logout}
          onPress={logout}
        >
          <Text style={styles.logoutText}>
            Disconnect Wallet
          </Text>
        </TouchableOpacity>

        {/* Modal */}
        <ThemedModal
          visible={modalVisible}
          message={modalMessage}
          onClose={() => setModalVisible(false)}
        />

      </SafeAreaView>
    </LinearGradient>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  header: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 12,
    marginBottom: 15
  },

  label: {
    color: "#94a3b8",
    marginBottom: 5
  },

  wallet: {
    color: "white",
    fontSize: 16
  },

  copy: {
    color: "#38bdf8",
    marginTop: 10
  },

  value: {
    color: "#22c55e",
    fontSize: 20
  },

  logout: {
    backgroundColor: "#ef4444",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20
  },

  logoutText: {
    color: "white",
    fontWeight: "600"
  }

});