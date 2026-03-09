import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    SystemProgram,
    Transaction,
} from "@solana/web3.js";

import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";

const connection = new Connection(
  "https://api.mainnet-beta.solana.com",
  "confirmed"
);

export const sendReward = async (
  userWallet: string,
  amount = 0.001
) => {

  try {

    const recipient = new PublicKey(userWallet);

    const signature = await transact(async (wallet) => {

      const auth = await wallet.authorize({
        chain: "solana:mainnet",
        identity: {
          name: "StreakFi",
        },
      });

      const sender = new PublicKey(
        Buffer.from(auth.accounts[0].address, "base64")
      );

      const tx = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: sender,
          toPubkey: recipient,
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );

      const { blockhash } =
        await connection.getLatestBlockhash();

      tx.recentBlockhash = blockhash;
      tx.feePayer = sender;

      const signed = await wallet.signTransactions({
        transactions: [tx],
      });

      const txid =
        await connection.sendRawTransaction(
          signed[0].serialize()
        );

      return txid;

    });

    return signature;

  } catch (err) {

    console.log("Reward error:", err);

  }

};