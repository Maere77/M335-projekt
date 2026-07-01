import { useRouter } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { triggerAdvancedNotification } from '@/app/service/PushService';
import PedometerComponent from '@/components/PedometerComponent';
import { AppButton, AppCard, AppScreen, AppSectionTitle, AppStat, useAppTheme } from '@/components/ui/app-shell';

export default function HomeScreen() {
  const colors = useAppTheme();
  const router = useRouter();
  return (
    <AppScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.hero}>
          <Text style={[styles.title, { color: colors.text }]}>Thirty dash</Text>
          <Text style={[styles.text, { color: colors.muted }]}>Erklärung</Text>
          <View style={styles.actions}>
            <AppButton title="Start" onPress={() => router.push('/start')} style={styles.primaryButton} />
            <AppButton
              title="Notify to Start Challange"
              variant="secondary"
              onPress={() => triggerAdvancedNotification('Game Starting', '10 Seconds')}
              style={styles.secondaryButton}
            />
          </View>
        </AppCard>
      </ScrollView>
    </AppScreen>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 16,
    paddingBottom: 24,
  },
  hero: {
    marginTop: 8,
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
  actions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 8,
  },
  primaryButton: {
    flexGrow: 1,
  },
  secondaryButton: {
    flexGrow: 1,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
  },
});
