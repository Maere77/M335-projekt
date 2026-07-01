import {ScrollView, StyleSheet, Text} from 'react-native';

import {useRouter} from 'expo-router';

import Height from '@/service/height';
import {AppButton, AppCard, AppScreen, useAppTheme} from '@/components/ui/app-shell';
import PedometerComponent from "@/components/PedometerComponent";

export default function StartScreen() {
    const colors = useAppTheme();
    const router = useRouter();
    return (
        <AppScreen>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <AppCard style={styles.hero}>
                    <Text style={[styles.title, { color: colors.text }]}>START</Text>
                    <Text style={[styles.text, { color: colors.muted }]}>You Think your at the PEAK?</Text>
                    <AppButton title="Start" onPress={() => router.push('/maxHeight')} />
                </AppCard>

                <AppCard>
                    <PedometerComponent />
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
