import {useRouter} from 'expo-router';
import {AppButton, useAppTheme} from '@/components/ui/app-shell';
import {useGameData} from "@/context/GameDataContext";
import {useEffect, useRef, useState} from "react";
import {getGameWithUsers, setGameEnd, setGameStarted, UserData} from "@/service/gameDataService";
import {FlatList, StyleSheet, Text, TextInput, View} from "react-native";
import * as Crypto from 'expo-crypto';
import {triggerAdvancedNotification} from "@/service/PushService";
import {Picker} from "@react-native-picker/picker";

export default function LobbyScreen() {
    const colors = useAppTheme();
    const router = useRouter();

    const {
        gameData,
        setGameData,
        gameId,
    } = useGameData();

    const [users, setUsers] = useState<UserData[]>([]);
    const [username, setUsername] = useState("anonymous")
    const hasNavigated = useRef(false);
    const [gameTime, setGameTime] = useState(5);


    useEffect(() => {
        if (!gameId) return;

        const fetchGame = async () => {
            try {
                const game = await getGameWithUsers(gameId);

                setUsers(game?.users || []);

                if (game?.startedAt) {
                    const startedAtMs =
                        game.startedAt.seconds * 1000 +
                        game.startedAt.nanoseconds / 1_000_000;

                    const diffInSeconds = (startedAtMs - Date.now()) / 1000;

                    if (diffInSeconds >= 7 && diffInSeconds <= 10) {
                        await triggerAdvancedNotification(`Spiel startet in ${Math.ceil(diffInSeconds)} Sekunden!`, "Viel Glück!");
                    } else if (diffInSeconds <= 0 && !hasNavigated.current) {
                        hasNavigated.current = true;
                        await setGameEnd(
                            gameId,
                            new Date(Date.now() + gameTime * 60 * 1000)
                        );
                        router.push("/start");
                    }
                }
            } catch (error) {
                console.error("Fehler beim Laden der User:", error);
            }
        };

        fetchGame();

        const interval = setInterval(() => {
            fetchGame();
        }, 3000);

        return () => clearInterval(interval);
    }, [gameId]);

    useEffect(() => {
        if (!gameId) return;

        const uuid = gameData.userid || Crypto.randomUUID();

        setGameData(prev => ({...prev, userid: uuid, username: username}));
    }, [username, gameId]);


    const startGame = () => {
        setGameStarted(gameId);
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.title, {color: colors.text}]}>Spieler in der Lobby:</Text>
            <Text>Game-ID: {gameId}</Text>
            <FlatList
                data={users}
                keyExtractor={(item) => item.userid}
                scrollEnabled={false}
                renderItem={({item}) => (
                    <View style={styles.userItem}>
                        <Text style={{color: colors.text}}>{item.username}</Text>
                    </View>
                )}
                ListEmptyComponent={
                    <Text style={{color: colors.text, opacity: 0.5}}>Warte auf Spieler...</Text>
                }
            />

            <Picker
                selectedValue={gameTime}
                onValueChange={(value) => setGameTime(value)}
                style={{color: colors.text}}
                dropdownIconColor={colors.text}
            >
                <Picker.Item label="5 Minuten" value={5}/>
                <Picker.Item label="15 Minuten" value={15}/>
                <Picker.Item label="30 Minuten" value={30}/>
            </Picker>

            <TextInput
                style={[styles.input, {color: colors.text}]}
                value={username}
                onChangeText={(text) => setUsername(text)}
                placeholder="Username"
                placeholderTextColor={colors.text + '80'}
            />
            <AppButton title="Start" onPress={() => startGame()}/>
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