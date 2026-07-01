import {
    doc,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";

export interface GameData {
    username: string;
    steps: number;
    updatedAt?: any;
}

const COLLECTION = "GameData";

/**
 * Erstellt einen neuen Datensatz oder überschreibt ihn.
 */
export async function saveGameData(
    uid: string,
    data: GameData
): Promise<void> {
    await setDoc(doc(db, COLLECTION, uid), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

/**
 * Aktualisiert nur einzelne Felder.
 */
export async function updateGameData(
    uid: string,
    data: Partial<GameData>
): Promise<void> {
    await updateDoc(doc(db, COLLECTION, uid), {
        ...data,
        updatedAt: serverTimestamp(),
    });
}

/**
 * Lädt die Daten eines Users.
 */
export async function getGameData(
    uid: string
): Promise<GameData | null> {
    const snapshot = await getDoc(doc(db, COLLECTION, uid));

    if (!snapshot.exists()) {
        return null;
    }

    return snapshot.data() as GameData;
}

/**
 * Löscht den Datensatz.
 */
export async function deleteGameData(uid: string): Promise<void> {
    await deleteDoc(doc(db, COLLECTION, uid));
}