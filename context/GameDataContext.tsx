import {createContext, useContext, useEffect, useState} from "react";
import {getAuth, signInAnonymously} from "firebase/auth";
import {GameData, saveGameData} from "@/service/gameDataService";

type GameDataContextType = {
    gameData: GameData;
    setGameData: React.Dispatch<React.SetStateAction<GameData>>;
};

const GameDataContext = createContext<GameDataContextType | null>(null);

export function GameDataProvider({
                                     children,
                                 }: {
    children: React.ReactNode;
}) {
    const [gameData, setGameData] = useState<GameData>({
        steps: 0,
        username: "anonymous-user",
        updatedAt: undefined,
    });

    useEffect(() => {
        async function save() {
            const auth = getAuth();

            if (!auth.currentUser) {
                await signInAnonymously(auth);
            }

            const uid = auth.currentUser?.uid;

            if (uid) {
                await saveGameData(uid, gameData);
            }
        }

        save();
    }, [gameData]);

    return (
        <GameDataContext.Provider value={{gameData, setGameData}}>
            {children}
        </GameDataContext.Provider>
    );
}

export function useGameData() {
    const context = useContext(GameDataContext);

    if (!context) {
        throw new Error("useGameData must be used inside GameDataProvider");
    }

    return context;
}