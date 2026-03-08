import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWallet } from "../../hooks/useWallet";

import { Image } from "react-native";
import { createUserIfNotExists } from "../../services/userService";

export default function Wallet() {

  const [loading, setLoading] = useState(false);

  const wallet = useWallet();
  const connectWallet = async () => {

    try {

      setLoading(true);

      const pubkey = await wallet.connect();

      const address = pubkey.toBase58();

      await AsyncStorage.setItem("wallet", address);

      await createUserIfNotExists(address);

      router.replace("/(tabs)/home");

    } catch (e) {

      console.log(e);
      Alert.alert("Wallet connection failed");

    } finally {

      setLoading(false);

    }

  };

  return (

    <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>

      <Text style={styles.icon}>🔗</Text>

      <Text style={styles.title}>
        Connect Wallet
      </Text>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#4E44CE" }]}
        onPress={connectWallet}
      >
        <View style={styles.row}>
          <Image
            source={require("../../assets/images/phantom.png")}
            style={styles.icon}
          />
          <Text style={styles.text}>Connect Phantom</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, { backgroundColor: "#2563eb" }]}
        onPress={connectWallet}      >
        <View style={styles.row}>

          <Image
            source={require("../../assets/images/solflare.png")}
            style={styles.icon}
          />
          <Text style={styles.text}>Connect Solflare</Text>
        </View>
      </TouchableOpacity>

    </LinearGradient>

  );

}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: {
    color: "white",
    fontSize: 22,
    marginVertical: 20
  },

  button: {
    backgroundColor: "#7c3aed",
    padding: 15,
    borderRadius: 25,
    width: "80%",
    alignItems: "center",
    marginVertical: 10
  },

  buttonText: {
    color: "white",
    fontWeight: "600"
  }, icon: {
    width: 24,
    height: 24,
    marginRight: 10,
    fontSize: 70
  },

  text: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  }, row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },


});