import { AppButton, AppCard, AppScreen, AppSectionTitle, useAppTheme } from "@/components/ui/app-shell";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { useGameData } from "@/context/GameDataContext";
import { getGameWithUsers, UserData } from "@/service/gameDataService";
import { useEffect, useMemo, useState } from "react";
import {router} from "expo-router";

export default function FinishScreen() {
    const colors = useAppTheme();
    const { gameId } = useGameData();

    const [users, setUsers] = useState<UserData[]>([]);

    useEffect(() => {
        getGameWithUsers(gameId).then(game => {
            if (game) {
                setUsers(game.users || []);
            }
        });
    }, [gameId]);

    const rankings = useMemo(() => ({
        steps: [...users].sort((a, b) => b.steps - a.steps),
        highestPoint: [...users].sort((a, b) => b.highestPoint - a.highestPoint),
        elevatedGain: [...users].sort((a, b) => b.elevatedGain - a.elevatedGain),
        distance: [...users].sort((a, b) => b.distance - a.distance),
        nothingDone: [...users].sort((a, b) => b.nothingDone - a.nothingDone),
    }), [users]);

    const renderRanking = (
        title: string,
        data: UserData[],
        key: keyof UserData
    ) => (
        <AppCard style={styles.card}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>{title}</Text>

            {data.map((user, index) => (
                <View
                    key={user.userid}
                    style={[
                        styles.row,
                        {
                            borderColor: colors.border,
                            backgroundColor: colors.surfaceAlt,
                        },
                    ]}>
                    <Text style={[styles.rank, { color: colors.muted }]}>{index + 1}.</Text>
                    <Text style={[styles.username, { color: colors.text }]}>{user.username}</Text>
                    <Text style={[styles.value, { color: colors.primary }]}>{String(user[key])}</Text>
                </View>
            ))}
        </AppCard>
    );

    return (
        <AppScreen>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <AppSectionTitle title="Final Rankings" subtitle="Spiel beendet" />
                {renderRanking("👟 Steps", rankings.steps, "steps")}
                {renderRanking("🏔 Highest Point", rankings.highestPoint, "highestPoint")}
                {renderRanking("📈 Elevation Gain", rankings.elevatedGain, "elevatedGain")}
                {renderRanking("📍 Distance", rankings.distance, "distance")}
                {renderRanking("😴 Nothing Done", rankings.nothingDone, "nothingDone")}
                <AppButton
                    title="Back to the Lobby"
                    onPress={() => router.replace("/(tabs)")}
                    style={styles.backButton}
                />
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 16,
        paddingBottom: 28,
    },
    card: {
        gap: 10,
    },
    cardTitle: {
        fontSize: 20,
        fontWeight: "800",
        lineHeight: 24,
    },
    row: {
        flexDirection: "row",
        alignItems: "center",
        borderWidth: 1,
        borderRadius: 14,
        paddingVertical: 10,
        paddingHorizontal: 12,
    },
    rank: {
        width: 28,
        fontSize: 14,
        fontWeight: "700",
    },
    username: {
        flex: 1,
        fontSize: 15,
        fontWeight: "600",
    },
    value: {
        fontSize: 15,
        fontWeight: "800",
    },
    backButton: {
        marginTop: 8,
        marginBottom: 8,
    },
});