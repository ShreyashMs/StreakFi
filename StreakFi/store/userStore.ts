import { create } from "zustand";
import { persist } from "zustand/middleware";

interface UserState {
  wallet: string | null;
  setWallet: (wallet: string) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set) => ({
      wallet: null,
      setWallet: (wallet) => set({ wallet }),
    }),
    { name: "user-storage" }
  )
);