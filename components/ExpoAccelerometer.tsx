import {useEffect, useRef, useState} from 'react';
import {Accelerometer} from 'expo-sensors';
import {AppStat} from "@/components/ui/app-shell";
import {useGameData} from "@/context/GameDataContext";

export default function ExpoAccelerometer() {
    const [{ x, y, z }, setData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [subscription, setSubscription] = useState(null);
    const [nothingDoneThreeSeconds, setNothingDoneThreeSeconds] = useState(0);
    const lastCheckRef = useRef({ x: 0, y: 0, z: 0 });
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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
    //Logik mit Rinaldo + AI gemacht
    useEffect(() => {
        const deltaX = Math.abs(x - lastCheckRef.current.x);
        const deltaY = Math.abs(y - lastCheckRef.current.y);
        const deltaZ = Math.abs(z - lastCheckRef.current.z);
        lastCheckRef.current.x = x;
        lastCheckRef.current.y = y;
        lastCheckRef.current.z = z;
        if (deltaX >= 0.3 || deltaY >= 0.3 || deltaZ >= 0.3) {
            if (intervalRef.current) clearInterval(intervalRef.current);
            intervalRef.current = setInterval(() => {
                console.log(1244124124)
                incrementLazy();
            }, 2000);
        }
    }, [x, y, z]);


    const {setGameData} = useGameData();

    useEffect(() => {
        setGameData(prev => ({
            ...prev,
            nothingDone: nothingDoneThreeSeconds,
        }));
    }, [nothingDoneThreeSeconds, setGameData]);

    return (
        <AppStat label="Nothing Done" value={nothingDoneThreeSeconds + " Seconds"}/>
    );
}
