import { AppScreen, useAppTheme } from "@/components/ui/app-shell";
import { Text, View } from "react-native";
import { useGameData } from "@/context/GameDataContext";
import { getGameWithUsers, UserData } from "@/service/gameDataService";
import { useEffect, useMemo, useState } from "react";

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
        <View style={{ marginBottom: 24 }}>
            <Text style={{ fontSize: 20, fontWeight: "bold" }}>{title}</Text>

            {data.map((user, index) => (
                <Text key={user.userid}>
                    {index + 1}. {user.username} - {user[key]}
                </Text>
            ))}
        </View>
    );

    return (
        <AppScreen>
            {renderRanking("👟 Steps", rankings.steps, "steps")}
            {renderRanking("🏔 Highest Point", rankings.highestPoint, "highestPoint")}
            {renderRanking("📈 Elevation Gain", rankings.elevatedGain, "elevatedGain")}
            {renderRanking("📍 Distance", rankings.distance, "distance")}
            {renderRanking("😴 Nothing Done", rankings.nothingDone, "nothingDone")}
        </AppScreen>
    );
}