import AsyncStorage from "@react-native-async-storage/async-storage";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { PublicKey } from "@solana/web3.js";
import { useState } from "react";

export function useWallet() {

  const [publicKey, setPublicKey] = useState<PublicKey | null>(null);

  const connect = async () => {

    const result = await transact(async (wallet) => {

      const auth = await wallet.authorize({
        chain: "solana:mainnet",
        identity: {
          name: "StreakFi",
          uri: "https://streakfi.app",
        },
      });

      return auth;
    });

    const key = new PublicKey(
      Buffer.from(result.accounts[0].address, "base64")
    );

    const address = key.toBase58();

    await AsyncStorage.setItem("wallet", address);

    setPublicKey(key);

    return key;
  };

  return {
    publicKey,
    connect,
    connected: !!publicKey,
  };
}