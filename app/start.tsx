import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { useRouter } from 'expo-router';

import Height from '@/app/service/height';
import {AppButton, AppCard, AppScreen, AppSectionTitle, AppStat, useAppTheme} from '@/components/ui/app-shell';
import PedometerComponent from "@/components/PedometerComponent";

export default function StartScreen() {
    const colors = useAppTheme();
    const steps = 0;
    const maxHeight = 0;
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

                <View style={styles.statsRow}>
                    <AppStat label="Steps" value={String(steps)} />
                    <AppStat label="Max height" value={String(maxHeight)} />
                </View>

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
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },
});
