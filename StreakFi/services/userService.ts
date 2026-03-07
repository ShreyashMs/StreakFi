import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const createUserIfNotExists = async (wallet: string) => {
  const ref = doc(db, "users", wallet);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    await setDoc(ref, {
      wallet,
      xp: 0,
      streak: 0,
      level: 1,
      createdAt: Date.now()
    });
  }
};