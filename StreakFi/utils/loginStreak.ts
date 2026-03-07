import AsyncStorage from "@react-native-async-storage/async-storage";

export const updateLoginStreak = async () => {

  const today = new Date().toDateString();

  const lastLogin = await AsyncStorage.getItem("lastLogin");
  const currentStreak = await AsyncStorage.getItem("loginStreak");

  let streak = currentStreak ? parseInt(currentStreak) : 0;

  if (!lastLogin) {
    streak = 1;
  } else {

    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);

    if (lastLogin === yesterday.toDateString()) {
      streak += 1;
    }

    if (lastLogin === today) {
      return;
    }

    if (
      lastLogin !== yesterday.toDateString() &&
      lastLogin !== today
    ) {
      streak = 1;
    }

  }

  await AsyncStorage.setItem("loginStreak", streak.toString());
  await AsyncStorage.setItem("lastLogin", today);

};