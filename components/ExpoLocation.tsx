import {useEffect, useState} from "react";
import * as Location from "expo-location";

import {AppStat} from "@/components/ui/app-shell";

const MOVEMENT_TOLERANCE_M = 3;

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
                        const delta = getDistance(lastLocation as Location.LocationObjectCoords, coords);
                        if (delta > MOVEMENT_TOLERANCE_M) {
                            setDistance((d) => d + delta);
                        }
                    }
                    lastLocation = coords;
                }
            );
        })();

        return () => subscription?.remove();
    }, []);

    return (
        <AppStat label="Distance travelled" value={String((distance / 1000).toFixed(2)) + " km"}/>
    );
}
