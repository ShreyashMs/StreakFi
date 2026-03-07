import AsyncStorage from "@react-native-async-storage/async-storage";

export const activateXPBooster = async () => {

  const expiry = Date.now() + (24 * 60 * 60 * 1000);

  await AsyncStorage.setItem(
    "xpBooster",
    JSON.stringify({ multiplier: 2, expiry })
  );

};

export const getXPBooster = async () => {

  const booster = await AsyncStorage.getItem("xpBooster");

  if (!booster) return 1;

  const data = JSON.parse(booster);

  if (Date.now() > data.expiry) {
    await AsyncStorage.removeItem("xpBooster");
    return 1;
  }

  return data.multiplier;

};