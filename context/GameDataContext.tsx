import {createContext, useContext, useEffect, useState} from "react";
import {saveUser, UserData,} from "@/service/gameDataService";

type GameDataContextType = {
    gameData: UserData;
    setGameData: React.Dispatch<React.SetStateAction<UserData>>;
    gameId: string;
    setGameId: React.Dispatch<React.SetStateAction<string>>;
};

const GameDataContext = createContext<GameDataContextType | null>(null);

export function GameDataProvider({
                                     children,
                                 }: {
    children: React.ReactNode;
}) {
    const [gameId, setGameId] = useState("");

    const [gameData, setGameData] = useState<UserData>({
        userid: "",
        username: "anonymous-user",
        steps: 0,
    });

// Erst speichern, wenn es eine gameId gibt
    useEffect(() => {
        if (!gameId || !gameData.userid) return;

        saveUser(gameId, gameData);
    }, [gameData, gameId]);

    return (
        <GameDataContext.Provider
            value={{
                gameData,
                setGameData,
                gameId,
                setGameId,
            }}
        >
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