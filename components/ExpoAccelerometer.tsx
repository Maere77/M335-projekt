import {useEffect, useRef, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Accelerometer} from 'expo-sensors';
import {useAppTheme} from "@/components/ui/app-shell";

export default function ExpoAccelerometer() {
    const [{x, y, z}, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);
    const [nothingDoneThreeSeconds, setNothingDoneThreeSeconds] = useState(0);
    const lastCheckRef = useRef({x: 0, y: 0, z: 0});
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const colors = useAppTheme();

    const _subscribe = () => {
        setSubscription(Accelerometer.addListener(setData));
    };

    const _unsubscribe = () => {
        subscription && subscription.remove();
        setSubscription(null);
    };
    const incrementLazy = () => {
        setNothingDoneThreeSeconds(prev => prev + 1);
    };

    useEffect(() => {
        _subscribe();
        return () => _unsubscribe();
    }, []);

    useEffect(() => {
        const deltaX = Math.abs(x - lastCheckRef.current.x);
        const deltaY = Math.abs(y - lastCheckRef.current.y);
        const deltaZ = Math.abs(z - lastCheckRef.current.z);

        if (deltaX <= 0.5 && deltaY <= 0.5 && deltaZ <= 0.5) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                incrementLazy();
            }, 5000);
        }
    }, [x, y, z]);

    return (
        <View style={styles.container}>
            <Text style={[styles.label, {color: colors.muted}]}>
                Time of laziness
            </Text>
            <Text style={[styles.value, {color: colors.text}]}>
                {nothingDoneThreeSeconds + " Seconds"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {gap: 8},
    label: {fontSize: 14, lineHeight: 20, fontWeight: "600", textTransform: "uppercase", letterSpacing: 0.8},
    value: {fontSize: 28, fontWeight: "800", lineHeight: 32},
});
