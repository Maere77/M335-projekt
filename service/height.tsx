import { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Barometer } from 'expo-sensors';

import { useAppTheme } from '@/components/ui/app-shell';

export default function Height() {
    //Das ist das Code Beispiel, dass Markus mit Livio gemacht hat.
    const colors = useAppTheme();
    const [{ pressure, relativeAltitude }, setData] = useState({ pressure: 0, relativeAltitude: 0 });

    useEffect(() => {
        const subscription = Barometer.addListener(setData);
        return () => subscription.remove();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[styles.kicker, { color: colors.primary }]}>Barometer</Text>
            <Text style={[styles.title, { color: colors.text }]}>Height sensor</Text>
            <Text style={[styles.value, { color: colors.text }]}>Pressure: {pressure} hPa</Text>
            <Text style={[styles.label, { color: colors.muted }]}>
                Relative altitude:{' '}
                {Platform.OS === 'ios' ? `${relativeAltitude} m` : 'Only available on iOS'}
            </Text>
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
})