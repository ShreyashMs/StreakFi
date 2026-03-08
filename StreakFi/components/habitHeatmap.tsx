import { StyleSheet, View } from "react-native";

export default function HabitHeatmap({ dates }: any) {

  const days = [];

  for (let i = 27; i >= 0; i--) {

    const d = new Date();
    d.setDate(d.getDate() - i);

    const key = d.toDateString();

    const completed = dates?.includes(key);

    days.push(
      <View
        key={i}
        style={[
          styles.box,
          completed ? styles.done : styles.missed
        ]}
      />
    );
  }

  return (
    <View style={styles.grid}>
      {days}
    </View>
  );
}

const styles = StyleSheet.create({

  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 6
  },

  box: {
    width: 16,
    height: 16,
    borderRadius: 4
  },

  done: {
    backgroundColor: "#22c55e"
  },

  missed: {
    backgroundColor: "#334155"
  }

});