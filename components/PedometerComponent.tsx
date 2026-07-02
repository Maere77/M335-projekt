import {useEffect} from "react";
import {Platform} from "react-native";
import {Pedometer} from "expo-sensors";

import {AppStat} from '@/components/ui/app-shell';
import {useGameData} from "@/context/GameDataContext";

export default function PedometerComponent() {

    const {gameData, setGameData} = useGameData();

    useEffect(() => {
        let subscription: Pedometer.Subscription | null = null;

        const start = async () => {
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
        <AppStat label="Steps Counter" value={ Platform.OS === 'android' ? ( "Works only on iOS sorry" ) : gameData.steps.toLocaleString()}/>
    );
}