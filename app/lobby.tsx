import { useRouter } from 'expo-router';
import { AppButton, useAppTheme } from '@/components/ui/app-shell';
import { useGameData } from "@/context/GameDataContext";
import { useEffect, useState } from "react";
import {createGame, getUsers, UserData} from "@/service/gameDataService";
import {View, Text, FlatList, StyleSheet, TextInput} from "react-native";
import * as Crypto from 'expo-crypto';

export default function LobbyScreen() {
    const colors = useAppTheme();
    const router = useRouter();

    const {
        gameData,
        setGameData,
        gameId,
        setGameId,
    } = useGameData();

    // State für die geladenen User
    const [users, setUsers] = useState<UserData[]>([]);

    const [username, setUsername] = useState("anonymous")

    // 2. User laden, sobald eine gameId existiert
    useEffect(() => {
        if (!gameId) return;

        const fetchUsers = async () => {
            try {
                const userList = await getUsers(gameId);

                setUsers(userList);
            } catch (error) {
                console.error("Fehler beim Laden der User:", error);
            }
        };

        fetchUsers();

        const interval = setInterval(() => {
            fetchUsers();
        }, 3000);

        return () => clearInterval(interval);
    }, [gameId]);


    useEffect(() => {
        if (!gameId) return;

        const uuid = gameData.userid || Crypto.randomUUID();

        setGameData(prev => ({ ...prev, userid: uuid, username: username }));
    }, [username, gameId]);

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: colors.text }]}>Spieler in der Lobby:</Text>
            <Text>{gameId}</Text>

            {/* Die Liste aller User */}
            <FlatList
                data={users}
                keyExtractor={(item) => item.userid}
                scrollEnabled={false}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={{ color: colors.text }}>{item.username}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={{ color: colors.text, opacity: 0.5 }}>Warte auf Spieler...</Text>
                }
            />

            <TextInput
                style={[styles.input, { color: colors.text }]}
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Username"
                placeholderTextColor={colors.text + '80'} // Leicht transparent
            />

            <AppButton title="Start" onPress={() => router.push('/start')}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
    },
    userItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        marginBottom: 5,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    }
});