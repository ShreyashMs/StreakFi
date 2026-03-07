import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    addDoc,
    collection,
    deleteDoc, doc,
    getDoc,
    getDocs,
    query,
    updateDoc,
    where
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
        reminderTime,
        duration,
        xp,
        expiryDate,
        createdAt: new Date(),
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
        collection(db, "habit_logs"),
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

    const habit = habitSnap.data();

    const today = new Date();

    const lastCompleted = habit.lastCompleted
        ? new Date(habit.lastCompleted)
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

    await updateDoc(habitRef, {
        streak: newStreak,
        lastCompleted: today,
    });

    // XP SYSTEM

    const currentXP = await AsyncStorage.getItem("xp");

    let xp = currentXP ? parseInt(currentXP) : 0;

    const multiplier = await getXPBooster();

    const gainedXP = habit.xp * multiplier;

    xp += gainedXP;

    await AsyncStorage.setItem("xp", xp.toString());

};

export const deleteHabit = async (habitId: string) => {

    await deleteDoc(doc(db, "habits", habitId));

};