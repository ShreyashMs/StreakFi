import { StyleSheet, Text, View } from "react-native";

export default function StreakFlames({ count = 5 }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <Text key={i} style={styles.flame}>🔥</Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 8,
  },
  flame: {
    fontSize: 28,
    marginRight: 6,
  },
});