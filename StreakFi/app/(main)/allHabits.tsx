import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import ThemedModal from "../../components/ThemedModal";
import { deleteHabit, getHabits } from "../../services/habitService";
import { getLevel, getNextLevelXP } from "../../utils/xpSystem";

export default function HabitsPage() {

  const [activeHabits, setActiveHabits] = useState<any[]>([]);
  const [expiredHabits, setExpiredHabits] = useState<any[]>([]);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [selectedHabitId, setSelectedHabitId] = useState<string | null>(null);

  const [xp, setXP] = useState(0);
  const [level, setLevel] = useState(1);
  const [nextXP, setNextXP] = useState(200);
  const [canClaim, setCanClaim] = useState(false);

  const loadXP = async () => {

    const storedXP = await AsyncStorage.getItem("xp");
    const value = storedXP ? parseInt(storedXP) : 0;

    setXP(value);

    const lvl = getLevel(value);
    const next = getNextLevelXP(value);

    setLevel(lvl);
    setNextXP(next);

    setCanClaim(value >= next);

  };

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
      loadXP();
    }, [])
  );

  const progressPercent = Math.min((xp / nextXP) * 100, 100);

  const handleClaimReward = async () => {

    const newXP = xp - nextXP;

    await AsyncStorage.setItem("xp", newXP.toString());

    const lvl = getLevel(newXP);
    const next = getNextLevelXP(newXP);

    setXP(newXP);
    setLevel(lvl);
    setNextXP(next);
    setCanClaim(false);

  };

  const handleDelete = (habitId: string) => {

    setSelectedHabitId(habitId);
    setModalMessage("Are you sure you want to delete this habit?");
    setModalVisible(true);

  };

  const confirmDelete = async () => {

    if (!selectedHabitId) return;

    await deleteHabit(selectedHabitId);

    setModalVisible(false);
    setSelectedHabitId(null);

    loadHabits();

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

        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => handleDelete(item.id)}
        >
          <Text style={styles.deleteText}>
            Delete
          </Text>
        </TouchableOpacity>

      </View>

    </View>
  );

  const renderExpiredHabit = ({ item }: any) => (
    <View style={styles.expiredCard}>

      <View>
        <Text style={styles.expiredTitle}>
          {item.title}
        </Text>

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

      <Text style={styles.header}>
        My Habits
      </Text>

      {/* LEVEL CARD */}

      <View style={styles.levelCard}>

        <Text style={styles.levelText}>
          Level {level}
        </Text>

        <View style={styles.xpBar}>
          <View
            style={[
              styles.xpFill,
              { width: `${progressPercent}%` }
            ]}
          />
        </View>

        <Text style={styles.xpText}>
          {xp} / {nextXP} XP
        </Text>

      </View>

      {canClaim && (
        <TouchableOpacity
          style={styles.claimButton}
          onPress={handleClaimReward}
        >
          <Text style={styles.claimText}>
            Claim Reward
          </Text>
        </TouchableOpacity>
      )}

      <Text style={styles.section}>
        Active Habits
      </Text>

      <FlatList
        data={activeHabits}
        renderItem={renderActiveHabit}
        keyExtractor={(item) => item.id}
      />

      {expiredHabits.length > 0 ?
        <Text style={styles.section}>
          Expired Habits
        </Text> : null}

      <FlatList
        data={expiredHabits}
        renderItem={renderExpiredHabit}
        keyExtractor={(item) => item.id}
      />

      <ThemedModal
        visible={modalVisible}
        message={modalMessage}
        onClose={confirmDelete}
      />

    </LinearGradient>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    padding: 20
  },

  header: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },

  section: {
    color: "#94a3b8",
    marginTop: 20,
    marginBottom: 10
  },

  levelCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 16
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

  claimButton: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20
  },

  claimText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16
  },

  card: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
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

  deleteButton: {
    backgroundColor: "#ef4444",
    padding: 5,
    borderRadius: 8
  },

  deleteText: {
    color: "white"
  },

  expiredCard: {
    backgroundColor: "#1e293b",
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
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