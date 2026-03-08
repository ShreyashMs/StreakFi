import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    query,
    Timestamp,
    updateDoc,
    where,
} from "firebase/firestore";
import { getXPBooster } from "../utils/boosterSystem";
import { calculateXP } from "../utils/xpCalculator";
import { db } from "./firebase";

export const createHabit = async (
  wallet: string,
  title: string,
  reminderTime: Date,
  duration: number,
  expiryDate: Date
) => {

  const xp = calculateXP(duration);

  await addDoc(collection(db, "habits"), {
    wallet,
    title,
    reminderTime: Timestamp.fromDate(reminderTime),
    duration,
    xp,
    expiryDate: Timestamp.fromDate(expiryDate),
    createdAt: Timestamp.now(),
    streak: 0,
    completedDates: [],
  });

};

export const getHabits = async (wallet: string) => {

  const habitsQuery = query(
    collection(db, "habits"),
    where("wallet", "==", wallet)
  );

  const habitsSnapshot = await getDocs(habitsQuery);

  const habits = habitsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));

  const today = new Date().toISOString().split("T")[0];

  const logsQuery = query(
    collection(db, "habitLogs"),
    where("wallet", "==", wallet),
    where("date", "==", today)
  );

  const logsSnapshot = await getDocs(logsQuery);

  const completedHabitIds = logsSnapshot.docs.map(
    (doc) => doc.data().habitId
  );

  const updatedHabits = habits.map((habit: any) => ({
    ...habit,
    claimed: completedHabitIds.includes(habit.id),
  }));

  return updatedHabits;
};

export const completeHabit = async (habitId: string) => {

  const habitRef = doc(db, "habits", habitId);
  const habitSnap = await getDoc(habitRef);

  if (!habitSnap.exists()) return;

  const habit: any = habitSnap.data();

  const today = new Date();
  const todayString = today.toDateString();

  const lastCompleted = habit.lastCompleted
    ? habit.lastCompleted.toDate
      ? habit.lastCompleted.toDate()
      : new Date(habit.lastCompleted)
    : null;

  let newStreak = habit.streak || 0;

  if (lastCompleted) {

    const diff = Math.floor(
      (today.getTime() - lastCompleted.getTime()) /
      (1000 * 60 * 60 * 24)
    );

    if (diff === 1) {
      newStreak += 1;
    } else if (diff > 1) {
      newStreak = 1;
    }

  } else {
    newStreak = 1;
  }

  const completedDates = habit.completedDates || [];

  // Prevent double claim
  if (completedDates.includes(todayString)) {
    return;
  }

  completedDates.push(todayString);

  await updateDoc(habitRef, {
    streak: newStreak,
    lastCompleted: Timestamp.fromDate(today),
    completedDates,
  });

  // XP SYSTEM

  const currentXP = await AsyncStorage.getItem("xp");
  let xp = currentXP ? parseInt(currentXP) : 0;

  const multiplier = await getXPBooster();
  const gainedXP = habit.xp * multiplier;

  xp += gainedXP;

  await AsyncStorage.setItem("xp", xp.toString());

  // Update user XP in Firestore
  if (habit.wallet) {

    const userRef = doc(db, "users", habit.wallet);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      await updateDoc(userRef, {
        xp: xp
      });
    }

  }

};

export const deleteHabit = async (habitId: string) => {

  await deleteDoc(doc(db, "habits", habitId));

};