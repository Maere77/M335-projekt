import {collection, deleteDoc, doc, getDoc, getDocs, setDoc, Timestamp, updateDoc,} from "firebase/firestore";
import {db} from "./firebase";

const GAMES_COLLECTION = "Games";
const USERS_COLLECTION = "users";

export interface UserData {
    userid: string;
    username: string;
    steps: number;
    distance: number;
    elevatedGain: number;
    highestPoint: number;
    nothingDone: number;
}

export interface GameData {
    gameid: string;
    startedAt?: any;
    gameEnd?: any;
}

//
// --------------------
// Game Funktionen
// --------------------
//

/**
 * Erstellt ein neues Spiel.
 */
export async function createGame(gameId: string): Promise<void> {
    await setDoc(doc(db, GAMES_COLLECTION, gameId), {
        gameid: gameId,
        startedAt: null,
        gameEnd: null
    });
}

/**
 * Lädt die Daten eines Spiels.
 */
export async function getGame(
    gameId: string
): Promise<GameData | null> {
    const snapshot = await getDoc(doc(db, GAMES_COLLECTION, gameId));

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data() as GameData;
}

/**
 * Lädt alle Spiele.
 */
export async function getGames(): Promise<GameData[]> {
    const snapshot = await getDocs(collection(db, GAMES_COLLECTION));

    return snapshot.docs.map((doc) => doc.data() as GameData);
}

/**
 * Löscht ein Spiel.
 */
export async function deleteGame(gameId: string): Promise<void> {
    await deleteDoc(doc(db, GAMES_COLLECTION, gameId));
}


/**
 * Setzt startedAt auf 10 Sekunden in der Zukunft.
 */
export async function setGameStartIn10s(
    gameId: string
): Promise<void> {
    const startTime = new Date(Date.now() + 10_000);

    await updateDoc(
        doc(db, GAMES_COLLECTION, gameId),
        {
            startedAt: Timestamp.fromDate(startTime),
        }
    );
}

export async function setGameEnd(
    gameId: string,
    endGame: Date
): Promise<void> {

    await updateDoc(
        doc(db, GAMES_COLLECTION, gameId),
        {
            gameEnd: Timestamp.fromDate(endGame),
        }
    );
}

//
// --------------------
// User Funktionen
// --------------------
//

/**
 * Fügt einen User zu einem Spiel hinzu oder überschreibt ihn.
 */
export async function saveUser(
    gameId: string,
    user: UserData
): Promise<void> {
    await setDoc(
        doc(db, GAMES_COLLECTION, gameId, USERS_COLLECTION, user.userid),
        user
    );
}

/**
 * Aktualisiert einzelne Felder eines Users.
 */
export async function updateUser(
    gameId: string,
    userId: string,
    data: Partial<UserData>
): Promise<void> {
    await updateDoc(
        doc(db, GAMES_COLLECTION, gameId, USERS_COLLECTION, userId),
        data
    );
}

/**
 * Lädt einen User aus einem Spiel.
 */
export async function getUser(
    gameId: string,
    userId: string
): Promise<UserData | null> {
    const snapshot = await getDoc(
        doc(db, GAMES_COLLECTION, gameId, USERS_COLLECTION, userId)
    );

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data() as UserData;
}

/**
 * Lädt alle User eines Spiels.
 */
export async function getUsers(
    gameId: string
): Promise<UserData[]> {
    const snapshot = await getDocs(
        collection(db, GAMES_COLLECTION, gameId, USERS_COLLECTION)
    );

    return snapshot.docs.map((doc) => doc.data() as UserData);
}

/**
 * Löscht einen User aus einem Spiel.
 */
export async function deleteUser(
    gameId: string,
    userId: string
): Promise<void> {
    await deleteDoc(
        doc(db, GAMES_COLLECTION, gameId, USERS_COLLECTION, userId)
    );
}

/**
 * Lädt ein komplettes Spiel inklusive aller User.
 */
export async function getGameWithUsers(
    gameId: string
): Promise<(GameData & { users: UserData[] }) | null> {
    const game = await getGame(gameId);

    if (!game) {
        return null;
    }

    const users = await getUsers(gameId);

    return {
        ...game,
        users,
    };
}