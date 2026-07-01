import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

// 1. Verhalten im Vordergrund festlegen (Fehlerbehebung für neuere Versionen)
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

// 2. Registrierung, Android-Channel & Interaktive Buttons
export async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    console.log('Berechtigung abgelehnt!');
    return false;
  }

  // Registriere die interaktiven Knöpfe für das Zweierteam-Projekt
  await Notifications.setNotificationCategoryAsync('budget-action-category', [
    {
      identifier: 'view_details',
      buttonTitle: 'Details anzeigen',
      options: { opensAppToForeground: true }
    },
    {
      identifier: 'dismiss',
      buttonTitle: 'Schliessen',
      options: { opensAppToForeground: false }
    }
  ]);

  // Android Channel Setup
  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('budget-alerts', {
      name: 'Budget Warnungen',
      importance: Notifications.AndroidImportance.HIGH,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return true;
}

export async function triggerAdvancedNotification(title: string, body: string) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      sound: true,
      data: { screenToOpen: '/report' },
      categoryIdentifier: 'budget-action-category',
    },
    trigger: null,
  });
}