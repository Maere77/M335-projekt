import {ScrollView, StyleSheet, Text, View} from 'react-native';

import Height from '@/components/Height';
import {AppCard, AppScreen, AppStat, useAppTheme} from '@/components/ui/app-shell';
import PedometerComponent from "@/components/PedometerComponent";
import ExpoLocation from "@/components/ExpoLocation";
import ExpoAccelerometer from "@/components/ExpoAccelerometer";
import {getGameWithUsers} from "@/service/gameDataService";
import {useEffect, useRef, useState} from "react";
import {router} from "expo-router";
import {useGameData} from "@/context/GameDataContext";

function formatCountdown(totalSeconds: number): string {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
}

export default function StartScreen() {
    const colors = useAppTheme();

    const hasNavigated = useRef(false);
    const [gameEndMs, setGameEndMs] = useState<number | null>(null);
    const [remainingSeconds, setRemainingSeconds] = useState<number | null>(null);

    const {
        gameId,
        setGameStarted
    } = useGameData();


    useEffect(() => {
        if (!gameId) return;

        const syncGameEnd = async () => {
            const game = await getGameWithUsers(gameId);

            if (!game?.gameEnd) {
                setGameEndMs(null);
                return;
            }

            const nextGameEndMs =
                game.gameEnd.seconds * 1000 +
                game.gameEnd.nanoseconds / 1_000_000;

            setGameEndMs(nextGameEndMs);
        };

        syncGameEnd();
        const interval = setInterval(syncGameEnd, 3000);

        return () => clearInterval(interval);
    }, [gameId]);

    useEffect(() => {
        if (!gameEndMs) {
            setRemainingSeconds(null);
            return;
        }

        const updateRemaining = () => {
            const secondsLeft = Math.max(0, Math.ceil((gameEndMs - Date.now()) / 1000));
            setRemainingSeconds(secondsLeft);

            if (secondsLeft <= 0 && !hasNavigated.current) {
                hasNavigated.current = true;
                setGameStarted(false)
                router.push("/finish");
            }
        };

        updateRemaining();
        const interval = setInterval(updateRemaining, 1000);

        return () => clearInterval(interval);
    }, [gameEndMs, setGameStarted]);

    return (
        <AppScreen>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <AppCard style={styles.hero}>
                    <Text style={[styles.title, {color: colors.text}]}>START</Text>
                </AppCard>
                <AppStat
                    label="Countdown"
                    value={remainingSeconds !== null ? `T -${formatCountdown(remainingSeconds)}` : "T --:--"}
                />
                <View style={styles.container}>
                    <View style={styles.statsRow}>
                        <PedometerComponent/>
                        <ExpoLocation/>
                    </View>
                </View>
                <AppCard>
                    <Height/>
                </AppCard>
                <ExpoAccelerometer/>
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
    content: {
        gap: 16,
        paddingBottom: 24,
    },
    hero: {
        marginTop: 8,
    },
    kicker: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: 1,
        lineHeight: 40,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
});
