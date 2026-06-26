import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Pedometer } from "expo-sensors";

export default function PedometerComponent() {
    const [isAvailable, setIsAvailable] = useState(false);
    const [steps, setSteps] = useState(0);

    useEffect(() => {
        let subscription: Pedometer.Subscription | null = null;

        const start = async () => {
            const available = await Pedometer.isAvailableAsync();
            setIsAvailable(available);

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
            <Text style={styles.title}>Schrittzähler</Text>

            <Text style={styles.steps}>{steps}</Text>

            <Text style={styles.label}>
                {isAvailable
                    ? "Schritte seit App-Start"
                    : "Pedometer nicht verfügbar"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
    },
    steps: {
        fontSize: 56,
        fontWeight: "bold",
        marginVertical: 16,
    },
    label: {
        fontSize: 16,
        color: "#666",
    },
});