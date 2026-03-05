import { StyleSheet, View } from "react-native";

export default function XPProgressBar({ progress = 0.6 }) {
  return (
    <View style={styles.container}>
      <View style={[styles.bar, { width: `${progress * 100}%` }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 10,
    backgroundColor: "#ECECFA",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 8,
  },

  bar: {
    height: "100%",
    backgroundColor: "#6C63FF",
  },
});