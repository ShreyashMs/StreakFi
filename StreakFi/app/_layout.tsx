import { Buffer } from "buffer";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-get-random-values";
import "../polyfills";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  global.Buffer = global.Buffer || Buffer;
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}