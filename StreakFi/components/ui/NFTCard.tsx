import { StyleSheet, Text, View } from "react-native";

export default function NFTRewardCard({ title }: { title: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.icon}>🔥</Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: 120,
    height: 120,
    borderRadius: 18,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  icon: {
    fontSize: 30,
  },

  title: {
    marginTop: 10,
    fontWeight: "600",
  },
});