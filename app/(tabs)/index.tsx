import {useRouter} from 'expo-router';
import {ScrollView, StyleSheet, Text, TextInput, View} from 'react-native';

import {triggerAdvancedNotification} from '@/service/PushService';
import {AppButton, AppCard, AppScreen, useAppTheme} from '@/components/ui/app-shell';
import {saveGameData} from "@/service/gameDataService";
import {getAuth, signInAnonymously} from "firebase/auth";
import {useEffect} from "react";
import {useGameData} from "@/context/GameDataContext";

export default function HomeScreen() {
    const colors = useAppTheme();
    const router = useRouter();

    const {gameData, setGameData} = useGameData();

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
                        <View style={styles.usernameCard}>
                            <Text style={[styles.usernameLabel, {color: colors.muted}]}>
                                Username
                            </Text>

                            <TextInput
                                value={gameData.username}
                                onChangeText={(text) =>
                                    setGameData((prev) => ({
                                        ...prev,
                                        username: text,
                                    }))
                                }
                                placeholder="Username"
                                style={[
                                    styles.usernameInput,
                                    {
                                        color: colors.text,
                                        borderColor: colors.muted,
                                    },
                                ]}
                            />
                        </View>
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
        width: "100%"
    },

    usernameLabel: {
        fontSize: 12,
        marginBottom: 4,
    },

    usernameInput: {
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        paddingVertical: 10,
        fontSize: 16,
    },
});
