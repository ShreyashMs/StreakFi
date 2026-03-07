import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { completeHabit } from "../services/habitService";

export default function HabitCard({ habit }: any) {

    const now = new Date();
    const reminder = new Date(habit.reminderTime);

    const endTime = new Date(reminder);
    endTime.setMinutes(endTime.getMinutes() + habit.duration);

    const isClaimable = now >= endTime;
    const isExpired = habit.expiryDate && new Date(habit.expiryDate) < now;
    const isClaimed = habit.lastCompleted;

    const progress = Math.min(
        ((now.getTime() - reminder.getTime()) /
            (endTime.getTime() - reminder.getTime())) * 100,
        100
    );

    const handleClaim = async () => {
        if (!isClaimable || isClaimed) return;
        await completeHabit(habit.id);
    };

    return (
        <View style={[styles.card, isExpired && styles.expired]}>

            <Text style={styles.title}>{habit.title}</Text>

            {/* Progress Bar */}

            <View style={styles.progressBar}>
                <View
                    style={[
                        styles.progressFill,
                        { width: `${Math.max(progress, 0)}%` },
                    ]}
                />
            </View>

            {/* Bottom Row */}

            <View style={styles.bottomRow}>

                {/* Streak */}

                <Text style={styles.streak}>
                    🔥 {habit.streak || 0}
                </Text>

                {/* Claim Button */}

                <TouchableOpacity
                    style={[
                        styles.claimButton,
                        isClaimable && !isClaimed ? styles.claimActive : styles.claimDisabled,
                    ]}
                    disabled={!isClaimable || isClaimed}
                    onPress={handleClaim}
                >

                    <Text style={styles.claimText}>
                        {isClaimed ? "Claimed" : "Claim"}
                    </Text>

                </TouchableOpacity>

            </View>

        </View>
    );
}

const styles = StyleSheet.create({

    card: {
        backgroundColor: "#1e293b",
        padding: 16,
        borderRadius: 12,
        marginBottom: 14,
    },

    expired: {
        backgroundColor: "#111",
        opacity: 0.6,
    },

    title: {
        color: "white",
        fontSize: 18,
        fontWeight: "600",
        marginBottom: 10,
    },

    progressBar: {
        height: 8,
        backgroundColor: "#334155",
        borderRadius: 6,
        overflow: "hidden",
        marginBottom: 12,
    },

    progressFill: {
        height: "100%",
        backgroundColor: "#22c55e",
    },

    bottomRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },

    streak: {
        color: "#f97316",
        fontSize: 16,
        fontWeight: "600",
    },

    claimButton: {
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
    },

    claimActive: {
        backgroundColor: "#22c55e",
    },

    claimDisabled: {
        backgroundColor: "#334155",
    },

    claimText: {
        color: "white",
        fontWeight: "600",
    },

});