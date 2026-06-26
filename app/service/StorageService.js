import AsyncStorage from "@react-native-async-storage/async-storage";

export const setItem = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
        console.log('Gespeichert');
    } catch (e) {
        console.error('Fehler beim Speichern:', e);
    }
}

export const getItem = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        console.log('Wert abgerufen:', value);
        return value;
    } catch (e) {
        console.error('Fehler beim Abrufen:', e);
    }
};

export const clearItem = async (key) => {
    try {
        await AsyncStorage.removeItem(key);
        console.log('Gelöscht');
    } catch (e) {
        console.error('Fehler beim Löschen:', e);
    }
};