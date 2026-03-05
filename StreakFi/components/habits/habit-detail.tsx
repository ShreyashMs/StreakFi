import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function HabitDetails() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Habit Details</Text>

      <Text style={styles.text}>Habit Name: Workout</Text>
      <Text style={styles.text}>Current Streak: 5 Days</Text>
      <Text style={styles.text}>XP Earned: 50</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, marginBottom: 20 },
  text: { fontSize: 16, marginBottom: 10 },
});