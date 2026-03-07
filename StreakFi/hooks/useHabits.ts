import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { getHabits } from "../services/habitService";

export default function useHabits() {

  const [habits, setHabits] = useState<any[]>([]);

  const loadHabits = async () => {

    const wallet = await AsyncStorage.getItem("wallet");

    if (!wallet) return;

    const data = await getHabits(wallet);

    setHabits(data);
  };

  useFocusEffect(
    useCallback(() => {
      loadHabits();
    }, [])
  );

  return { habits, loadHabits };
}