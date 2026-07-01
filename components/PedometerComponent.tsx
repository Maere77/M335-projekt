import {useEffect} from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import {Pedometer} from "expo-sensors";

import {useAppTheme} from '@/components/ui/app-shell';
import {useGameData} from "@/context/GameDataContext";

export default function PedometerComponent() {
    const colors = useAppTheme();

    const {gameData, setGameData} = useGameData();

    useEffect(() => {
        let subscription: Pedometer.Subscription | null = null;

        const start = async () => {
            //AI damit es auch für Android funktioniert
            const permission = await Pedometer.requestPermissionsAsync();

            subscription = Pedometer.watchStepCount(result => {
                setGameData(prev => ({
                    ...prev,
                    steps: result.steps,
                }));
            });
        };

        start();

        return () => {
            subscription?.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: colors.muted}]}>Steps Counter</Text>
            {Platform.OS === 'android' ? (
                <Text style={[styles.label, {color: colors.muted}]}>Step counter only works on iOS, not on Android.</Text>
            ) : null}
            <Text style={[styles.steps, {color: colors.text}]}>{gameData.steps.toLocaleString()}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 10,
        alignItems: "flex-start",
    },
    title: {
        fontSize: 16,
        fontWeight: "700",
        textTransform: "uppercase",
        letterSpacing: 1.2,
    },
    steps: {
        fontSize: 52,
        lineHeight: 56,
        fontWeight: "800",
    },
    label: {
        fontSize: 16,
        lineHeight: 24,
    },
});