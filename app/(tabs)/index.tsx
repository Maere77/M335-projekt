import { useRouter } from 'expo-router';
import { Button, StyleSheet, Text, View } from 'react-native';
import {sendNotification} from "@/service/PushService";
import {useEffect} from "react";
import * as Notifications from 'expo-notifications';


export default function HomeScreen() {
  const router = useRouter();

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Titel</Text>
      <Text style={styles.text}>Erklärung</Text>
      <Button title="Start" onPress={() => router.push('/start')} />
      <Button title="Send Notification" onPress={() => sendNotification('Test Title', 'Test Body')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
  },
  text: {
    fontSize: 16,
  },
});
