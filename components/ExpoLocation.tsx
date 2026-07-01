import {useEffect, useState} from "react";
import {StyleSheet, Text, View} from "react-native";
import * as Location from "expo-location";

import {useAppTheme} from "@/components/ui/app-shell";

//Logik komplett generiert, ich kenne Arkustangens nicht
function getDistance(
    a: { latitude: number; longitude: number },
    b: { latitude: number; longitude: number }
) {
    const toRadians = (degree: number): number => (degree * Math.PI) / 180;
    const earthRadiusMeters = 6371000;
    const deltaLatitude = toRadians(b.latitude - a.latitude);
    const deltaLongitude = toRadians(b.longitude - a.longitude);
    const fromLatitude = toRadians(a.latitude);
    const toLatitude = toRadians(b.latitude);

    const aValue =
        Math.sin(deltaLatitude / 2) *
        Math.sin(deltaLatitude / 2) +
        Math.cos(fromLatitude) *
        Math.cos(toLatitude) *
        Math.sin(deltaLongitude / 2) *
        Math.sin(deltaLongitude / 2);

    const c = 2 * Math.atan2(Math.sqrt(aValue), Math.sqrt(1 - aValue));
    return earthRadiusMeters * c;
}

export default function ExpoLocation() {
    const colors = useAppTheme();

    const [distance, setDistance] = useState(0);

    useEffect(() => {
        let lastLocation: Location.LocationObjectCoords | null = null;
        let subscription: Location.LocationSubscription | null = null;

        (async () => {
            const {granted} = await Location.requestForegroundPermissionsAsync();
            if (!granted) return;

            subscription = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.Highest,
                    timeInterval: 3000,
                    distanceInterval: 1,
                },
                ({coords}) => {
                    if (lastLocation !== null) {
                        setDistance((d) => d + getDistance(lastLocation as Location.LocationObjectCoords, coords));
                    }
                    lastLocation = coords;
                }
            );
        })();

        return () => subscription?.remove();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={[styles.text, {color: colors.muted}]}>
                Distance travelled
            </Text>
            <Text style={[styles.value, {color: colors.text}]}>
                {String((distance / 1000).toFixed(2)) + " km"}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {gap: 8},
    text: {fontSize: 16, lineHeight: 24},
    value: {fontSize: 24, fontWeight: "800", lineHeight: 30},
});
