import AsyncStorage from "@react-native-async-storage/async-storage";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { activateXPBooster } from "../../utils/boosterSystem";

export default function Boosters() {

  const [remaining, setRemaining] = useState<number | null>(null);

  const loadBooster = async () => {

    const expiry = await AsyncStorage.getItem("boosterExpiry");

    if (!expiry) return;

    const diff = parseInt(expiry) - Date.now();

    if (diff > 0) {
      setRemaining(diff);
    }

  };

  useEffect(() => {

    loadBooster();

    const interval = setInterval(() => {
      loadBooster();
    }, 60000);

    return () => clearInterval(interval);

  }, []);

  const activateBooster = async () => {

    await activateXPBooster();

    const expiry = Date.now() + 24 * 60 * 60 * 1000;

    await AsyncStorage.setItem(
      "boosterExpiry",
      expiry.toString()
    );

    setRemaining(expiry - Date.now());

  };

  const formatTime = (ms: number) => {

    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor(
      (ms % (1000 * 60 * 60)) / (1000 * 60)
    );

    return `${hours}h ${minutes}m`;

  };

  return (

    <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>
<SafeAreaView style={{flex:1,padding:20}}>

      <Text style={styles.header}>
        Boosters
      </Text>

      <View style={styles.card}>

        <Text style={styles.title}>
          ⚡ XP Booster
        </Text>

        <Text style={styles.desc}>
          Earn 2x XP for the next 24 hours
        </Text>

        {remaining ? (
          <Text style={styles.active}>
            Active: {formatTime(remaining)} remaining
          </Text>
        ) : null}

        <TouchableOpacity
          style={[
            styles.button,
            remaining && { backgroundColor: "#64748b" }
          ]}
          disabled={!!remaining}
          onPress={activateBooster}
        >
          <Text style={styles.buttonText}>
            {remaining ? "Active" : "Activate"}
          </Text>
        </TouchableOpacity>

      </View>
  
</SafeAreaView>
    </LinearGradient>

  );

}

const styles = StyleSheet.create({

  container: { flex: 1, padding: 20 },

  header: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 20,
    borderRadius: 12
  },

  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 10
  },

  desc: {
    color: "#94a3b8",
    marginBottom: 10
  },

  active: {
    color: "#22c55e",
    marginBottom: 10
  },

  button: {
    backgroundColor: "#22c55e",
    padding: 12,
    borderRadius: 8,
    alignItems: "center"
  },

  buttonText: {
    color: "white",
    fontWeight: "600"
  }

});