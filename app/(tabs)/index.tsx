import {useRouter} from 'expo-router';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import {triggerAdvancedNotification} from '@/service/PushService';
import {AppButton, AppCard, AppScreen, useAppTheme} from '@/components/ui/app-shell';
import {useGameData} from "@/context/GameDataContext";
import {useState} from "react";

export default function HomeScreen() {
    const colors = useAppTheme();
    const router = useRouter();

    const {
        setGameId,
    } = useGameData();

    const [gameIdInput, setGameIdInput] = useState("id")


    const joinGame = () => {
        setGameId(gameIdInput);
        router.push('/lobby');
    }

    return (
        <AppScreen>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <AppCard style={styles.hero}>
                    <Text style={[styles.title, {color: colors.text}]}>Thirty dash</Text>
                    <Text style={[styles.text, {color: colors.muted}]}>Erklärung</Text>
                    <View style={styles.actions}>
                        <AppButton
                            title="Notify to Start Challange"
                            variant="secondary"
                            onPress={() => triggerAdvancedNotification('Game Starting', '10 Seconds')}
                            style={styles.secondaryButton}
                        />
                        <TextInput
                            style={[styles.input, { color: colors.text }]}
                            value={gameIdInput}
                            onChangeText={(text) => setGameIdInput(text)}
                            placeholder="Game ID"
                            placeholderTextColor={colors.text + '80'}
                        />
                        <AppButton title="Host Game" onPress={() => joinGame()} style={styles.primaryButton}/>
                        <AppButton title="Join Game" onPress={() => joinGame()} style={styles.primaryButton}/>
                    </View>
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
        gap: 12,
    },
    kicker: {
        fontSize: 12,
        fontWeight: '800',
        textTransform: 'uppercase',
        letterSpacing: 1.4,
    },
    title: {
        fontSize: 34,
        fontWeight: '800',
        lineHeight: 38,
    },
    text: {
        fontSize: 16,
        lineHeight: 24,
    },
    actions: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
        marginTop: 8,
    },
    primaryButton: {
        flexGrow: 1,
    },
    secondaryButton: {
        flexGrow: 1,
    },
    statsRow: {
        flexDirection: 'row',
        gap: 12,
    },

    input: {
        width: "100%",
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
});
