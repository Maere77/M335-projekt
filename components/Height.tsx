import {useEffect, useState} from 'react';
import {Platform, StyleSheet, View} from 'react-native';
import {Barometer} from 'expo-sensors';

import {AppStat} from '@/components/ui/app-shell';
import {createHighTracker} from '@/service/highCalculate';

export default function Height() {
    //Das ist das Code Beispiel, dass Markus mit Livio gemacht hat.
    const [highTracker] = useState(() => createHighTracker());
    const [pressure, setPressure] = useState(0);
    const [nativeRelativeAltitude, setNativeRelativeAltitude] = useState<number | null>(null);
    const [baselinePressure, setBaselinePressure] = useState<number | null>(null);
    const [elevationGain, setElevationGain] = useState(0);
    const [highestPoint, setHighestPoint] = useState<number | null>(null);

    useEffect(() => {
        const subscription = Barometer.addListener((measurement) => {
            if (measurement.pressure > 0) {
                setPressure(measurement.pressure);
                setBaselinePressure((currentBaseline) => currentBaseline ?? measurement.pressure);
            }

            if (typeof measurement.relativeAltitude === 'number') {
                setNativeRelativeAltitude(measurement.relativeAltitude);
            }
        });

        return () => subscription.remove();
    }, []);

    // Kalkulation von Copilot, weil es das noch nicht gibt in expo-sensors Barometer
    const pressureBasedRelativeAltitude =
        baselinePressure && pressure > 0
            ? 44330 * (1 - Math.pow(pressure / baselinePressure, 1 / 5.255))
            : null;

    //Dieses Attribut funktioniert nur auf IOS
    const relativeAltitude =
        Platform.OS === 'ios' && nativeRelativeAltitude !== null
            ? nativeRelativeAltitude
            : pressureBasedRelativeAltitude;

    useEffect(() => {
        const { elevationGain: nextElevationGain } = highTracker.update(relativeAltitude);
        setElevationGain(nextElevationGain);
    }, [highTracker, relativeAltitude]);

    useEffect(() => {
        if (relativeAltitude === null) {
            return;
        }

        setHighestPoint((currentHighestPoint) => {
            if (currentHighestPoint === null || relativeAltitude > currentHighestPoint) {
                return relativeAltitude;
            }

            return currentHighestPoint;
        });
    }, [relativeAltitude]);

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.statsRow}>
                    <AppStat label="Elevatio Gain" value={String(elevationGain?.toFixed(1) + " m")} />
                    <AppStat label="Mighest Point" value={String(highestPoint?.toFixed(2) + " m")} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        gap: 12,
    },
    kicker: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
    },
    title: {
        fontSize: 24,
        fontWeight: '800',
    },
    value: {
        fontSize: 16,
        lineHeight: 24,
    },
    label: {
        fontSize: 14,
        lineHeight: 22,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
})