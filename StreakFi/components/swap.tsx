import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { getSwapQuote } from "../services/jupiterService";

export default function Swap() {

  const [amount, setAmount] = useState("");

  const handleSwap = async () => {

    try {

      const quote = await getSwapQuote(
        "So11111111111111111111111111111111111111112",
        "EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGk6VQx",
        parseFloat(amount) * 1000000000
      );


      Alert.alert("Swap quote received");

    } catch (e) {

      console.log(e);
      Alert.alert("Swap failed");

    }

  };

  return (

    <View style={styles.container}>

      <Text style={styles.title}>
        Swap SOL → USDC
      </Text>

      <TextInput
        placeholder="Amount"
        value={amount}
        onChangeText={setAmount}
        style={styles.input}
      />

      <TouchableOpacity
        style={styles.button}
        onPress={handleSwap}
      >

        <Text style={styles.text}>
          Get Quote
        </Text>

      </TouchableOpacity>

    </View>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },

  title: {
    fontSize: 22,
    marginBottom: 20,
  },

  input: {
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  text: {
    color: "white",
    fontWeight: "600",
  },

});