import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { disconnectWallet } from "../../services/walletService";

export default function Profile() {

  const [wallet, setWallet] = useState<string | null>(null);
  const [xp, setXP] = useState(0);

  useEffect(() => {

    const loadProfile = async () => {

      const storedWallet = await AsyncStorage.getItem("wallet");
      const storedXP = await AsyncStorage.getItem("xp");

      setWallet(storedWallet);
      setXP(storedXP ? parseInt(storedXP) : 0);

    };

    loadProfile();

  }, []);

  const logout = async () => {

    await disconnectWallet();
    setWallet(null);

  };

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>
        Profile
      </Text>

      <View style={styles.card}>

        <Text style={styles.label}>
          Wallet
        </Text>

        {/* {!wallet && (
          <ConnectWalletButton onConnected={(w: any) => setWallet(w)} />
        )} */}
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

    </SafeAreaView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20
  },

  header: {
    color: "white",
    fontSize: 28,
    marginBottom: 20
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