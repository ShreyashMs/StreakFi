import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useWallet } from "../../hooks/useWallet";

import { Ionicons } from "@expo/vector-icons";
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
      <Image
        source={require("../../assets/images/solana.png")}
        style={styles.image}
      />


<TouchableOpacity
  style={[styles.button, { backgroundColor: "#4E44CE", opacity: loading ? 0.7 : 1 }]}
  onPress={connectWallet}
  disabled={loading}
>
  <View style={styles.row}>
    {loading ? (
      <ActivityIndicator size="small" color="#fff" />
    ) : (
      <>
        <Text style={styles.text}>Connect Wallet</Text>
        <Ionicons name="wallet" size={30} color={"#c8c6dd"} />
      </>
    )}
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
    fontWeight: "600",marginHorizontal:5
  }, row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 250,
    height: 130,
    marginBottom: 40,
  },
});