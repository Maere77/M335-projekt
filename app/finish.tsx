import {AppScreen, useAppTheme} from '@/components/ui/app-shell';
import {Text} from "react-native";

export default function FinishScreen() {
    const colors = useAppTheme();

    return (
        <AppScreen>
            <Text>Finish Screen</Text>
        </AppScreen>
    );
}

