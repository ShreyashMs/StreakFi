import ParallaxScrollView from '@/components/parallax-scroll-view';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
export default function HomeScreen() {
    return (
        <ParallaxScrollView
            headerBackgroundColor={{ light: '#4c1d95', dark: '#4c1d95' }}
            headerImage={
                <Image
                    source={require('@/assets/images/partial-react-logo.png')}
                    style={styles.reactLogo}
                />
            }>
            <LinearGradient colors={["#4c1d95", "#0f172a"]} style={styles.container}>
                <ScrollView>

                    <Text style={styles.title}>StreakFi</Text>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Current streaks</Text>
                        <Text style={styles.streak}>🔥🔥🔥🔥🔥</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Daily XP</Text>
                        <Text style={styles.xp}>36 XP</Text>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Current Active Boosters</Text>

                        <View style={styles.boosters}>
                            <Text style={styles.booster}>🔥</Text>
                            <Text style={styles.booster}>💧</Text>
                            <Text style={styles.booster}>🚀</Text>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Text style={styles.cardTitle}>Recently earned NFT</Text>

                        <View style={styles.nfts}>
                            <View style={styles.nft} />
                            <View style={styles.nft} />
                            <View style={styles.nft} />
                        </View>
                    </View>

                </ScrollView>
            </LinearGradient>
        </ParallaxScrollView>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },

    title: {
        fontSize: 26,
        fontWeight: "bold",
        color: "white",
        marginBottom: 20,
    },

    card: {
        backgroundColor: "#1e293b",
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
    },

    cardTitle: {
        color: "white",
        fontWeight: "bold",
        marginBottom: 10,
    },

    streak: { fontSize: 30 },

    xp: {
        color: "#60a5fa",
        fontSize: 20,
        fontWeight: "bold",
    },

    boosters: {
        flexDirection: "row",
        gap: 20,
    },

    booster: {
        fontSize: 30,
    },

    nfts: {
        flexDirection: "row",
        justifyContent: "space-between",
    },

    nft: {
        width: 80,
        height: 80,
        backgroundColor: "#334155",
        borderRadius: 12,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    stepContainer: {
        gap: 8,
        marginBottom: 8,
    },
    reactLogo: {
        height: 178,
        width: 290,
        bottom: 0,
        left: 0,
        position: 'absolute',
    },
});