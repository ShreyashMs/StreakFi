import AsyncStorage from "@react-native-async-storage/async-storage";

const getDateString = (date: Date) => {
  return new Date(
    date.getFullYear(),
    date.getMonth(),
    date.getDate()
  ).toDateString();
};

export const updateLoginStreak = async () => {

  const today = getDateString(new Date());

  const lastLogin = await AsyncStorage.getItem("lastLogin");
  const currentStreak = await AsyncStorage.getItem("loginStreak");

  let streak = currentStreak ? parseInt(currentStreak) : 0;

  if (!lastLogin) {
    streak = 1;
  } else {

    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);

    const yesterday = getDateString(yesterdayDate);

    if (lastLogin === today) {
      return;
    }

    if (lastLogin === yesterday) {
      streak += 1;
    } else {
      streak = 1;
    }

  }

  await AsyncStorage.setItem("loginStreak", streak.toString());
  await AsyncStorage.setItem("lastLogin", today);

  return streak;
};