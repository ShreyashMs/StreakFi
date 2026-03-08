import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";

export const getHabits = async (wallet: string) => {

  const q = query(
    collection(db, "habits"),
    where("wallet", "==", wallet)
  );

  const snapshot = await getDocs(q);

  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};