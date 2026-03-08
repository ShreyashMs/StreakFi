import { doc, getDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getUser = async (wallet: string) => {

  const ref = doc(db, "users", wallet);

  const snap = await getDoc(ref);

  if (snap.exists()) {
    return {
      wallet,
      ...snap.data()
    };
  }

  return null;
};