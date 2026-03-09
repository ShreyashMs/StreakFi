import { useState } from "react";
import {
    Alert,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

import { transact } from "@solana-mobile/mobile-wallet-adapter-protocol-web3js";
import { Connection, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";

export default function SendSOL() {

    const [address, setAddress] = useState("");
    const [amount, setAmount] = useState("");

    const sendSOL = async () => {

        try {

            const connection = new Connection(
                "https://api.mainnet-beta.solana.com"
            );

            const tx = new Transaction().add(
                SystemProgram.transfer({
                    fromPubkey: new PublicKey(address),
                    toPubkey: new PublicKey(address),
                    lamports:
                        parseFloat(amount) * LAMPORTS_PER_SOL,
                })
            );

            const signature = await transact(async (wallet) => {

                const { blockhash } =
                    await connection.getLatestBlockhash();

                tx.recentBlockhash = blockhash;
                const auth = await wallet.authorize({
                    chain: "solana:mainnet",
                    identity: { name: "StreakFi" },
                });

                const sender = new PublicKey(
                    Buffer.from(auth.accounts[0].address, "base64")
                );

                tx.feePayer = sender;

                const signed =
                    await wallet.signTransactions({
                        transactions: [tx],
                    });

                const txid =
                    await connection.sendRawTransaction(
                        signed[0].serialize()
                    );

                return txid;

            });

            Alert.alert("Transaction sent", signature);

        } catch (e) {

            console.log(e);
            Alert.alert("Transaction failed");

        }

    };

    return (

        <View style={styles.container}>

            <Text style={styles.title}>Send SOL</Text>

            <TextInput
                placeholder="Recipient Address"
                style={styles.input}
                value={address}
                onChangeText={setAddress}
            />

            <TextInput
                placeholder="Amount (SOL)"
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={sendSOL}
            >

                <Text style={styles.text}>
                    Send
                </Text>

            </TouchableOpacity>

        </View>

    );

}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
    },

    title: {
        fontSize: 22,
        marginBottom: 20,
    },

    input: {
        borderWidth: 1,
        padding: 12,
        marginBottom: 10,
        borderRadius: 10,
    },

    button: {
        backgroundColor: "#4f46e5",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
    },

    text: {
        color: "#fff",
        fontWeight: "600",
    },

});