import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";

export const checkInHabit = async (habitId:string, wallet:string) => {

  const today = new Date().toISOString().split("T")[0];

  await addDoc(collection(db,"habitLogs"),{
    habitId,
    userId: wallet,
    date: today,
    completed: true
  });

};