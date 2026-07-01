import { useRouter } from 'expo-router';
import { StyleSheet, Text } from 'react-native';

import { AppButton, AppCard, AppScreen, useAppTheme } from '@/components/ui/app-shell';

export default function ModalScreen() {
  const colors = useAppTheme();
  const router = useRouter();

  return (
    <AppScreen>
      <AppCard style={styles.container}>
        <Text style={[styles.kicker, { color: colors.primary }]}>Modal</Text>
        <Text style={[styles.title, { color: colors.text }]}>This is a modal</Text>
        <AppButton title="Go to home screen" onPress={() => router.replace('/')} />
      </AppCard>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 'auto',
    marginBottom: 'auto',
    gap: 12,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
});
