import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { deleteHabit, getHabits } from "../../services/habitService";

export default function HabitsPage() {

  const [activeHabits, setActiveHabits] = useState<any[]>([]);
  const [expiredHabits, setExpiredHabits] = useState<any[]>([]);

  const loadHabits = async () => {

    const wallet = await AsyncStorage.getItem("wallet");

    if (!wallet) return;

    const habits = await getHabits(wallet);

    const today = new Date();

    const active: any[] = [];
    const expired: any[] = [];

    habits.forEach((habit: any) => {

      const expiry = habit.expiryDate
        ? new Date(habit.expiryDate.seconds * 1000)
        : null;

      if (expiry && expiry < today) {
        expired.push(habit);
      } else {
        active.push(habit);
      }

    });

    setActiveHabits(active);
    setExpiredHabits(expired);

  };

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [])
  );

  const handleDelete = (habitId: string) => {

    Alert.alert(
      "Delete Habit",
      "Are you sure you want to delete this habit?",
      [
        { text: "Cancel" },
        {
          text: "Delete",
          onPress: async () => {
            await deleteHabit(habitId);
            loadHabits();
          }
        }
      ]
    );

  };

  const renderActiveHabit = ({ item }: any) => (
    <View style={styles.card}>

      <View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.info}>
          {item.duration} min • {item.xp} XP
        </Text>
        {item.streak ?
          <Text style={styles.streak}>
            🔥 {item.streak || 0} day streak
          </Text>
          : null}
      </View>

      <View style={styles.actions}>

        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </TouchableOpacity>

      </View>

    </View>
  );

  const renderExpiredHabit = ({ item }: any) => (
    <View style={styles.expiredCard}>

      <View>
        <Text style={styles.expiredTitle}>{item.title}</Text>
        <Text style={styles.expiredInfo}>
          {item.duration} min • {item.xp} XP
        </Text>
      </View>

      <Text style={styles.expiredLabel}>
        Expired
      </Text>

    </View>
  );

  return (

    <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>
      <Text style={styles.header}>My Habits</Text>

      <Text style={styles.section}>Active Habits</Text>

      <FlatList
        data={activeHabits}
        renderItem={renderActiveHabit}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.section}>Expired Habits</Text>

      <FlatList
        data={expiredHabits}
        renderItem={renderExpiredHabit}
        keyExtractor={(item) => item.id}
      />

    </LinearGradient>

  );

}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  header: {
    fontSize: 28,
    color: "white",
    marginBottom: 20
  },

  section: {
    color: "#94a3b8",
    marginTop: 20,
    marginBottom: 10
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between"
  },

  title: {
    color: "white",
    fontSize: 18
  },

  info: {
    color: "#94a3b8"
  },

  actions: {
    flexDirection: "row",
    gap: 10
  },

  editButton: {
    backgroundColor: "#6366f1",
    padding: 8,
    borderRadius: 8
  },

  editText: {
    color: "white"
  },

  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 8,
    borderRadius: 8
  },

  deleteText: {
    color: "white"
  },

  expiredCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    opacity: 0.4
  },

  expiredTitle: {
    color: "#d1d5db",
    fontSize: 18
  },

  expiredInfo: {
    color: "#9ca3af"
  },

  expiredLabel: {
    color: "#9ca3af"
  },
  streak: {
    color: "#f97316",
    fontSize: 14,
    marginTop: 4
  },

});