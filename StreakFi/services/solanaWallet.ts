import AsyncStorage from "@react-native-async-storage/async-storage";
import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { PublicKey } from "@solana/web3.js";

export const connectWallet = async () => {

  try {

    const result = await transact(async (wallet) => {

      const authorizationResult = await wallet.authorize({
        cluster: "devnet",
        identity: {
          name: "Solana Streaks",
        },
      });

      const account = authorizationResult.accounts[0];

      return account.address;

    });

    const walletAddress = new PublicKey(
      Buffer.from(result, "base64")
    ).toBase58();
    await AsyncStorage.setItem("wallet", walletAddress);

    return walletAddress;

  } catch (error) {

    console.log("Wallet connection failed", error);

    return null;
  }
};

export const getWallet = async () => {
  return await AsyncStorage.getItem("wallet");
};

export const disconnectWallet = async () => {
  await AsyncStorage.removeItem("wallet");
};