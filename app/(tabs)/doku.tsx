import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {AppScreen} from '@/components/ui/app-shell';

//dieses File ist AI generiert
export default function TabTwoScreen() {
    const styles = StyleSheet.create({
        container: {
            padding: 20,
            paddingBottom: 40,
        },

        title: {
            fontSize: 28,
            fontWeight: 'bold',
            marginBottom: 24,
        },

        section: {
            backgroundColor: '#f5f5f5',
            borderRadius: 12,
            padding: 16,
            marginBottom: 20,
        },

        sectionTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 12,
        },

        text: {
            fontSize: 16,
            lineHeight: 24,
            marginBottom: 10,
        },

        bullet: {
            fontWeight: 'bold',
        },

        hint: {
            fontStyle: 'italic',
        },
    });

    return (
        <AppScreen>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Dokumentation</Text>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Bewegungs- und Sensordaten</Text>

                    <Text style={styles.text}>
                        Die App erfasst wichtige Bewegungs- und Sensordaten wie Schritte,
                        Distanz, Höhe und Beschleunigung in Echtzeit.
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.bullet}>• Step Counter</Text>
                        {'\n'}
                        Funktioniert unter iOS über den Pedometer.
                        {'\n'}
                        <Text style={styles.hint}>
                            Test: Mit dem Telefon in der Hosentasche laufen.
                        </Text>
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.bullet}>• Distance Travelled</Text>
                        {'\n'}
                        Nutzt den GPS-Sensor und ist daher relativ ungenau.
                        {'\n'}
                        <Text style={styles.hint}>
                            Test: Im Freien bewegen.
                        </Text>
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.bullet}>• Elevation Gain</Text>
                        {'\n'}
                        Nutzt den Barometer. Kleine Höhenänderungen werden erkannt und durch
                        einen Buffer geglättet. Für Android wurde eine AI-unterstützte
                        Berechnung implementiert.
                        {'\n'}
                        <Text style={styles.hint}>
                            Test: Das Telefon nach oben halten.
                        </Text>
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.bullet}>• Highest Point</Text>
                        {'\n'}
                        Ermittelt den höchsten erreichten Punkt.
                        {'\n'}
                        <Text style={styles.hint}>
                            Test: Telefon hochhalten.
                        </Text>
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.bullet}>• Acceleration</Text>
                        {'\n'}
                        Erkennt, wie lange sich ein Benutzer kaum bewegt.
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.bullet}>• Multi-User</Text>
                        {'\n'}
                        Ohne Login. Spieler können eine Lobby hosten oder über eine
                        Lobby-ID beitreten. Alle Daten werden in Echtzeit synchronisiert.
                    </Text>

                    <Text style={styles.text}>
                        <Text style={styles.bullet}>• Firebase</Text>
                        {'\n'}
                        Spieler- und Spieldaten werden dauerhaft gespeichert.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>AI</Text>

                    <Text style={styles.text}>
                        • Das Styling der App wurde teilweise mit AI erstellt.
                    </Text>

                    <Text style={styles.text}>• Einsatz von Figma AI.</Text>

                    <Text style={styles.text}>
                        • Unterstützung bei der Implementierung von Distanz-, Elevation-
                        und Highest-Point-Berechnungen.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Mögliche Erweiterungen</Text>

                    <Text style={styles.text}>
                        • Moderneres und übersichtlicheres Design.
                    </Text>

                    <Text style={styles.text}>
                        • Benutzerkonten mit Google Login über Firebase.
                    </Text>

                    <Text style={styles.text}>
                        • Trophäen nach jeder Runde mit dauerhaftem Profil.
                    </Text>

                    <Text style={styles.text}>
                        • Weitere Spielmodi und Statistiken.
                    </Text>
                </View>
            </ScrollView>
        </AppScreen>
    );
}