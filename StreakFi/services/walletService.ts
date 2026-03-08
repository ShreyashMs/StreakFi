import AsyncStorage from "@react-native-async-storage/async-storage";

export const connectWallet = async () => {

  // TEMP mock wallet for now
  // later we will replace with Phantom / Solflare adapter

  const mockWallet = "So1anaDemoWallet12345";

  await AsyncStorage.setItem("wallet", mockWallet);

  return mockWallet;
};

export const getWallet = async () => {
  return await AsyncStorage.getItem("wallet");
};

export const disconnectWallet = async () => {
  await AsyncStorage.removeItem("wallet");
};