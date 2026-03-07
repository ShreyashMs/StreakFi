import { StyleSheet, Text, View } from "react-native";

export default function StatCard({ number, label }: any) {

  return (
    <View style={styles.card}>

      <Text style={styles.number}>{number}</Text>

      <Text style={styles.label}>{label}</Text>

    </View>
  );
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 12,
    width: "30%",
    alignItems: "center",
  },

  number: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },

  label: {
    color: "#94a3b8",
    fontSize: 12,
  },

});