import { ScrollView, StyleSheet, Text } from 'react-native';

import { useRouter } from 'expo-router';

import { AppButton, AppCard, AppScreen, useAppTheme } from '@/components/ui/app-shell';

export default function MaxHeightScreen() {
  const colors = useAppTheme();
  const router = useRouter();
  return (
      // AppScreen ist gekommen, als ich copilot gefragt habe, ob er CSS machen kann.
    <AppScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.hero}>
          <Text style={[styles.kicker, { color: colors.primary }]}>Summary</Text>
          <Text style={[styles.title, { color: colors.text }]}>Max Height</Text>
          <Text style={[styles.text, { color: colors.muted }]}>This is the Max Height screen.</Text>
          <AppButton title="Back to Start" variant="secondary" onPress={() => router.back()} />
        </AppCard>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  hero: {
    gap: 12,
  },
  kicker: {
    fontSize: 12,
    fontWeight: '800',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  title: {
    fontSize: 34,
    fontWeight: '800',
    lineHeight: 38,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
  },
});