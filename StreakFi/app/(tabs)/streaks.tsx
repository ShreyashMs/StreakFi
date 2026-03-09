import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import { getHabits } from "../../services/habitService";

export default function Streaks() {

  const [habits, setHabits] = useState<any[]>([]);

  const loadHabits = async () => {

    const wallet = await AsyncStorage.getItem("wallet");

    if (!wallet) return;

    const data = await getHabits(wallet);

    const sorted = data.sort(
      (a: any, b: any) => (b.streak || 0) - (a.streak || 0)
    );

    setHabits(sorted);

  };

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [])
  );

  const renderItem = ({ item, index }: any) => (

    <View style={styles.card}>

      <Text style={styles.rank}>
        #{index + 1}
      </Text>

      <View style={{ flex: 1 }}>

        <Text style={styles.title}>
          {item.title}
        </Text>

        <Text style={styles.subtitle}>
          {item.duration} min • {item.xp} XP
        </Text>

      </View>

      <Text style={styles.streak}>
        🔥 {item.streak || 0}
      </Text>

    </View>

  );

  return (

    <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>
      <SafeAreaView style={styles.container}>

        <Text style={styles.header}>
          Streaks
        </Text>

        {habits.length === 0 ? (

          <Text style={styles.empty}>
            No habits yet. Create your first habit!
          </Text>

        ) : (

          <FlatList
            data={habits}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />

        )}
      </SafeAreaView>
    </LinearGradient>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding:20
  },

  header: {
     color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  empty: {
    color: "#94a3b8",
    marginTop: 40
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 12
  },

  rank: {
    color: "#38bdf8",
    fontSize: 18,
    width: 40
  },

  title: {
    color: "white",
    fontSize: 18
  },

  subtitle: {
    color: "#94a3b8"
  },

  streak: {
    color: "#f97316",
    fontSize: 18,
    fontWeight: "bold"
  }

});