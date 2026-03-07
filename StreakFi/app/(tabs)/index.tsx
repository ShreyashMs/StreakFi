import { Redirect } from "expo-router";

const walletConnected = false;

export default function Index() {
  if (walletConnected) {
    return <Redirect href="/(main)/home" />;
  }

  return <Redirect href="/(auth)/onboarding" />;
}