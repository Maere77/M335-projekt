import {useRouter} from 'expo-router';
import {Alert, Pressable, ScrollView, StyleSheet, Text, View} from 'react-native';

import {triggerAdvancedNotification} from '@/service/PushService';
import {AppButton, AppCard, AppScreen, useAppTheme} from '@/components/ui/app-shell';
import {GameData, saveGameData} from "@/service/gameDataService";
import {getAuth, signInAnonymously} from "firebase/auth";
import {useEffect, useState} from "react";

export default function HomeScreen() {
    const colors = useAppTheme();
    const router = useRouter();


    const [gameData, setGameData] = useState<GameData>({
        steps: 0, updatedAt: undefined, username: "anonymous-user"
    });


    //todo: initial daten laden falls schon eintrag für user online ist

    const save = async () => {
        const auth = getAuth();

        if (!auth.currentUser) {
            await signInAnonymously(auth);
        }

        const uid = auth.currentUser?.uid;

        if (uid) {
            await saveGameData(uid, gameData);
        }
    }

    useEffect(() => {
        save();
    }, [gameData, save]);

    const editUsername = () => {
        Alert.prompt(
            "Username ändern",
            "Gib einen neuen Username ein",
            [
                {
                    text: "Abbrechen",
                    style: "cancel",
                },
                {
                    text: "Speichern",
                    onPress: (value?: string) => {
                        if (!value?.trim()) return;

                        setGameData((prev) => ({
                            ...prev,
                            username: value.trim(),
                        }));
                    },
                },
            ],
            "plain-text",
            gameData.username
        );
    };


    return (
        <AppScreen>
            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <AppCard style={styles.hero}>
                    <Text style={[styles.title, {color: colors.text}]}>Thirty dash</Text>
                    <Text style={[styles.text, {color: colors.muted}]}>Erklärung</Text>
                    <View style={styles.actions}>
                        <AppButton title="Start" onPress={() => router.push('/start')} style={styles.primaryButton}/>
                        <AppButton
                            title="Notify to Start Challange"
                            variant="secondary"
                            onPress={() => triggerAdvancedNotification('Game Starting', '10 Seconds')}
                            style={styles.secondaryButton}
                        />
                        <Pressable
                            style={styles.usernameCard}
                            onPress={editUsername}
                        >
                            <Text style={[styles.usernameLabel, {color: colors.muted}]}>
                                Username
                            </Text>
                            <Text style={[styles.username, {color: colors.text}]}>
                                {gameData.username}
                            </Text>
                        </Pressable>
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
    usernameCard: {
        padding: 14,
        borderRadius: 12,
        borderWidth: 1,
        borderColor: "#ccc",
        marginTop: 8,
    },

    usernameLabel: {
        fontSize: 12,
        marginBottom: 4,
    },

    username: {
        fontSize: 18,
        fontWeight: "600",
    },
});
