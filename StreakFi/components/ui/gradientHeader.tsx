import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text } from "react-native";

export default function GradientHeader({ title }: { title: string }) {
  return (
    <LinearGradient
      colors={["#6C63FF", "#8E7CFF"]}
      style={styles.container}
    >
      <Text style={styles.title}>{title}</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingBottom: 28,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "white",
  },
});