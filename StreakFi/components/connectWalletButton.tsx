import { useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { connectWallet } from "../services/solanaWallet";

export default function ConnectWalletButton({ onConnected }: any) {

  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {

    setLoading(true);

    const wallet = await connectWallet();

    setLoading(false);

    if (wallet && onConnected) {
      onConnected(wallet);
    }

  };

  return (

    <TouchableOpacity
      style={styles.button}
      onPress={handleConnect}
      disabled={loading}
    >

      <Text style={styles.text}>
        {loading ? "Connecting..." : "Connect Wallet"}
      </Text>

    </TouchableOpacity>

  );

}

const styles = StyleSheet.create({

  button: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 10,
    alignItems: "center"
  },

  text: {
    color: "white",
    fontWeight: "600"
  }

});