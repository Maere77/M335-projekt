import {ScrollView, StyleSheet, Text} from 'react-native';

import Height from '@/service/height';
import {AppCard, AppScreen, useAppTheme} from '@/components/ui/app-shell';
import PedometerComponent from "@/components/PedometerComponent";
import ExpoLocation from "@/components/ExpoLocation";

export default function StartScreen() {
    const colors = useAppTheme();

    return (
        <AppScreen>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <AppCard style={styles.hero}>
                    <Text style={[styles.title, { color: colors.text }]}>START</Text>
                </AppCard>

                <AppCard>
                    <PedometerComponent />
                </AppCard>
                <AppCard>
                    <ExpoLocation />
                </AppCard>
                <AppCard>
                    <Height />
                </AppCard>
            </ScrollView>
        </AppScreen>
    );
}

const styles = StyleSheet.create({
    content: {
        gap: 16,
        paddingBottom: 24,
    },
    hero: {
        marginTop: 8,
    },
    kicker: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
    },
    title: {
        fontSize: 36,
        fontWeight: '800',
        letterSpacing: 1,
        lineHeight: 40,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
});
