import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import HabitCard from "../../components/habitCard";
import StatCard from "../../components/StatCard";
import useHabits from "../../hooks/useHabits";
import { getLevel, getNextLevelXP } from "../../utils/xpSystem";

export default function Home() {

  const { habits } = useHabits();
  const router = useRouter();

  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [nextXP, setNextXP] = useState(200);
  const [loginStreak, setLoginStreak] = useState<number>(0);
  const [lastLogin, setLastLogin] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  const getLoginStreak = async () => {
    try {
      const streak = await AsyncStorage.getItem("loginStreak");
      const last = await AsyncStorage.getItem("lastLogin");

      setLoginStreak(streak ? parseInt(streak) : 0);
      setLastLogin(last);
    } catch (error) {
      console.log("Error getting streak:", error);
    } finally {
      setLoading(false);
    }
  };


  // top 3 streak habits
  const topHabits = [...habits]
    .sort((a, b) => (b.streak || 0) - (a.streak || 0))
    .slice(0, 3);

  // stats
  const totalHabits = habits.length;

  const xpToday = habits.reduce((sum, h) => {
    if (h.completedToday) return sum + (h.xp || 0);
    return sum;
  }, 0);

  const highestStreak = habits.reduce((max, h) => {
    return Math.max(max, h.streak || 0);
  }, 0);

  useEffect(() => {

    const loadXP = async () => {

      const storedXP = await AsyncStorage.getItem("xp");

      const value = storedXP ? parseInt(storedXP) : 0;

      setXP(value);
      setLevel(getLevel(value));
      setNextXP(getNextLevelXP(value));

    };

    loadXP();
    getLoginStreak();

  }, []);

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Dashboard</Text>
      <View style={styles.levelCard}>

        <Text style={styles.levelText}>
          Level {level}
        </Text>

        <View style={styles.xpBar}>
          <View
            style={[
              styles.xpFill,
              { width: `${(xp / nextXP) * 100}%` }
            ]}
          />
        </View>

        <Text style={styles.xpText}>
          {xp} / {nextXP} XP
        </Text>

      </View>

      {/* Stats Row */}

      <View style={styles.statsRow}>
        {/* <StatCard
          number={loginStreak}
          label="Login Streak"
        /> */}

        <StatCard
          number={totalHabits}
          label="Habits"
        />

        <StatCard
          number={xpToday}
          label="XP Today"
        />

        <StatCard
          number={highestStreak}
          label="Best Streak"
        />

      </View>

      {/* Top Habits */}

      <View style={styles.sectionHeader}>

        <Text style={styles.sectionTitle}>
          Top Streak Habits
        </Text>

        <TouchableOpacity
          onPress={() => router.push("/allHabits")}
        >
          <Text style={styles.viewAll}>
            View All
          </Text>
        </TouchableOpacity>

      </View>

      <FlatList
        data={topHabits}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <HabitCard habit={item} />
        )}
        ListEmptyComponent={
          <Text style={styles.emptyText}>
            No habits created yet
          </Text>
        }
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: "#0f172a",
    padding: 20,
  },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  statsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 25,
  },

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },

  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },

  viewAll: {
    color: "#38bdf8",
    fontSize: 14,
  },

  emptyText: {
    color: "#94a3b8",
    marginTop: 20,
    textAlign: "center",
  },
  levelCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20
  },

  levelText: {
    color: "white",
    fontSize: 18,
    marginBottom: 8
  },

  xpBar: {
    height: 8,
    backgroundColor: "#334155",
    borderRadius: 6,
    overflow: "hidden"
  },

  xpFill: {
    height: "100%",
    backgroundColor: "#22c55e"
  },

  xpText: {
    color: "#94a3b8",
    marginTop: 6
  },
});