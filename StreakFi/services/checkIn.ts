import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const checkInHabit = async (habitId: string, wallet: string) => {

  const today = new Date().toISOString().split("T")[0];

  const q = query(
    collection(db, "habitLogs"),
    where("habitId", "==", habitId),
    where("wallet","==",wallet),
    where("date", "==", today)
  );

  const existing = await getDocs(q);

  if (!existing.empty) {
    return false;
  }

  await addDoc(collection(db, "habitLogs"), {
    habitId,
    wallet: wallet,
    date: today,
    completed: true,
    createdAt: Date.now()
  });

  return true;
};