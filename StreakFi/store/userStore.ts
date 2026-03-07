import { create } from "zustand";

interface UserState {
  wallet: string | null;
  setWallet: (wallet: string) => void;
}

export const useUserStore = create<UserState>((set) => ({
  wallet: null,
  setWallet: (wallet) => set({ wallet }),
}));