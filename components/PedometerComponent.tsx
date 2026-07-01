import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pedometer } from "expo-sensors";

import { useAppTheme } from '@/components/ui/app-shell';

export default function PedometerComponent() {
    const colors = useAppTheme();
    const [isAvailable, setIsAvailable] = useState(false);
    const [steps, setSteps] = useState(0);

    useEffect(() => {
        let subscription: Pedometer.Subscription | null = null;

        const start = async () => {
            //AI damit es auch für Android funktioniert
            const available = await Pedometer.isAvailableAsync();
            setIsAvailable(available);
            console.log("Available:", available);

            const permission = await Pedometer.requestPermissionsAsync();
            console.log("Permission:", permission);
            if (!available) return;

            // Schritte seit Start der Komponente
            subscription = Pedometer.watchStepCount(result => {
                setSteps(result.steps);
            });
        };

        start();

        return () => {
            subscription?.remove();
        };
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.muted }]}>Schrittzähler</Text>

            <Text style={[styles.steps, { color: colors.text }]}>{steps.toLocaleString()}</Text>

            <Text style={[styles.label, { color: colors.muted }]}>
                {isAvailable
                    ? "Schritte seit App-Start"
                    : "Pedometer nicht verfügbar"}
            </Text>
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