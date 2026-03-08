import AsyncStorage from "@react-native-async-storage/async-storage";
import { Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
// import "../../polyfills";
import { updateLoginStreak } from "../../utils/loginStreak";

export default function Index() {

  const [wallet, setWallet] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {

    const checkWallet = async () => {
      const storedWallet = await AsyncStorage.getItem("wallet");

      setWallet(storedWallet);
      setChecked(true);
    };

    checkWallet();
    updateLoginStreak();


  }, []);


  if (!checked) {
    return <View />;
  }

  if (wallet) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/login" />;
}