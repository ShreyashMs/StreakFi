import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Linking from "expo-linking";

const PHANTOM = "https://phantom.app/ul/v1/connect";
const SOLFLARE = "https://solflare.com/ul/v1/connect";

const REDIRECT = "streakfi://wallet";

const connect = async (base: string) => {
  return new Promise<string>((resolve, reject) => {

    const url =
      `${base}?` +
      `app_url=https://streakfi.app&` +
      `cluster=mainnet-beta&` +
      `redirect_link=${encodeURIComponent(REDIRECT)}`;

    let handled = false;

    const sub = Linking.addEventListener("url", async ({ url }) => {

      if (handled) return;
      handled = true;

      console.log("Returned URL:", url);

      const parsed = Linking.parse(url);

      const wallet = parsed.queryParams?.public_key as string;

      if (!wallet) {
        sub.remove();
        reject("No wallet returned");
        return;
      }

      await AsyncStorage.setItem("wallet", wallet);

      sub.remove();

      resolve(wallet);

    });

    Linking.openURL(url).catch((err) => {
      sub.remove();
      reject(err);
    });

  });
};

export const connectPhantom = () => connect(PHANTOM);
export const connectSolflare = () => connect(SOLFLARE);

export const disconnectWallet = async () => {
  await AsyncStorage.removeItem("wallet");
};