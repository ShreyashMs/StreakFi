import { StyleSheet, Text, View } from "react-native";

export default function FlameStreak({ count = 5 }) {
  return (
    <View style={styles.container}>
      {Array.from({ length: count }).map((_, i) => (
        <Text key={i} style={styles.flame}>
          🔥
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    marginTop: 10,
  },

  flame: {
    fontSize: 26,
    marginRight: 6,
  },
});