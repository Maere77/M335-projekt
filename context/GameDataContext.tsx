import {createContext, useContext, useEffect, useState} from "react";
import {saveUser, UserData,} from "@/service/gameDataService";

type GameDataContextType = {
    gameData: UserData;
    setGameData: React.Dispatch<React.SetStateAction<UserData>>;
    gameId: string;
    setGameId: React.Dispatch<React.SetStateAction<string>>;
    gameStarted: boolean;
    setGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
};

const GameDataContext = createContext<GameDataContextType | null>(null);

export function GameDataProvider({children}: Readonly<{
    children: React.ReactNode;
}>) {
    const [gameId, setGameId] = useState("");

    const [gameData, setGameData] = useState<UserData>({
        distance: 0, elevatedGain: 0, highestPoint: 0, nothingDone: 0,
        userid: "",
        username: "anonymous-user",
        steps: 0
    });

    const [gameStarted, setGameStarted] = useState(false);

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
                gameStarted,
                setGameStarted,
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