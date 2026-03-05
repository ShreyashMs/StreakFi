import { Pressable, StyleSheet, Text, View } from "react-native";

export default function BoosterCard({ title }: { title: string }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Pressable style={styles.button}>
        <Text style={styles.btnText}>Apply</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 18,
    marginBottom: 14,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  title: {
    fontWeight: "600",
  },

  button: {
    backgroundColor: "#6C63FF",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 10,
  },

  btnText: {
    color: "white",
  },
});