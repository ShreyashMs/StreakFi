import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import ThemedModal from "../../components/ThemedModal";
import { HABIT_SUGGESTIONS } from "../../constants/habits";
import { createHabit } from "../../services/habitService";
import { scheduleHabitReminder } from "../../services/notificationService";

export default function CreateHabit() {

  const [title, setTitle] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [duration, setDuration] = useState(10);
  const expiryDate = new Date(time);
  expiryDate.setDate(expiryDate.getDate() + 7);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [navigateBack, setNavigateBack] = useState(false);

  const handleSearch = (text: string) => {
    setTitle(text);

    const filtered = HABIT_SUGGESTIONS.filter((habit) =>
      habit.toLowerCase().includes(text.toLowerCase())
    );

    setSuggestions(filtered);
  };

  const selectHabit = (habit: string) => {
    setTitle(habit);
    setSuggestions([]);
  };

  const handleCreate = async () => {
    try {
      const wallet = await AsyncStorage.getItem("wallet");

      if (!wallet || !title) {
        setModalMessage("Please select a habit or connect the wallet again!");
        setNavigateBack(false);
        setModalVisible(true);
        return;
      }

      await createHabit(wallet, title, time, duration, expiryDate);

      await scheduleHabitReminder(title, time);

      setModalMessage("Habit created successfully 🎉");
      setNavigateBack(true);
      setModalVisible(true);

      setTitle("");
      router.back();

    } catch (error) {
      console.log(error);
      setModalMessage("Could not create habit");
      setNavigateBack(false);
      setModalVisible(true);
    }
  };

  return (
    <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>
      <ThemedModal
        visible={modalVisible}
        message={modalMessage}
        onClose={() => {
          setModalVisible(false);

          if (navigateBack) {
            router.back();
          }
        }}
      />
      <SafeAreaView style={styles.container}>
        <View>

          <Text style={styles.title}>Create Habit</Text>

          <TextInput
            style={styles.input}
            placeholder="Search habit..."
            placeholderTextColor="#94a3b8"
            value={title}
            onChangeText={handleSearch}
          />

          {suggestions.length > 0 && (
            <FlatList
              data={suggestions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.suggestion}
                  onPress={() => selectHabit(item)}
                >
                  <Text style={styles.suggestionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          )}

          <TouchableOpacity
            style={styles.timeButton}
            onPress={() => setShowPicker(true)}
          >
            <Text style={styles.timeText}>
              Reminder: {time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Text>
          </TouchableOpacity>

          {showPicker && (
            <DateTimePicker
              value={time}
              mode="time"
              display="default"
              is24Hour={true}
              onChange={(event, selectedDate) => {
                setShowPicker(Platform.OS === "ios");
                if (selectedDate) setTime(selectedDate);
              }}
            />
          )}

          <Text style={styles.label}>Duration</Text>

          <View style={styles.durationContainer}>
            {[5, 10, 20, 30, 60].map((d) => (
              <TouchableOpacity
                key={d}
                style={[
                  styles.durationChip,
                  duration === d && styles.selectedChip,
                ]}
                onPress={() => setDuration(d)}
              >
                <Text style={styles.durationText}>{d} min</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={handleCreate}>
            <Text style={styles.buttonText}>Create Habit</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({

  container: { flex: 1, padding: 20 },

  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },

  input: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    color: "white",
    marginBottom: 10,
  },

  suggestion: {
    backgroundColor: "#1e293b",
    padding: 12,
    borderRadius: 8,
    marginBottom: 5,
  },

  suggestionText: {
    color: "white",
  },

  timeButton: {
    backgroundColor: "#1e293b",
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
  },

  timeText: {
    color: "white",
  },

  label: {
    color: "white",
    marginTop: 20,
    marginBottom: 10,
  },

  durationContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  durationChip: {
    backgroundColor: "#1e293b",
    padding: 10,
    borderRadius: 20,
  },

  selectedChip: {
    backgroundColor: "#a855f7",
  },

  durationText: {
    color: "white",
  },

  button: {
    backgroundColor: "#a855f7",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
  },

});