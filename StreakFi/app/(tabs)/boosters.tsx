import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { activateXPBooster } from "../../utils/boosterSystem";

export default function Boosters() {

  const activateBooster = async () => {
    await activateXPBooster();
    alert("⚡ XP Booster Activated for 24 hours!");
  };

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.header}>Boosters</Text>

      <View style={styles.card}>

        <Text style={styles.title}>
          ⚡ XP Booster
        </Text>

        <Text style={styles.desc}>
          Earn 2x XP for the next 24 hours
        </Text>

        <TouchableOpacity
          style={styles.button}
          onPress={activateBooster}
        >
          <Text style={styles.buttonText}>
            Activate
          </Text>
        </TouchableOpacity>

      </View>

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
    borderRadius: 12
  },

  title: {
    color: "white",
    fontSize: 20,
    marginBottom: 10
  },

  desc: {
    color: "#94a3b8",
    marginBottom: 15
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