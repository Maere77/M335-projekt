import { Image } from 'expo-image';
import { Platform, ScrollView, StyleSheet, Text } from 'react-native';

import { ExternalLink } from '@/components/external-link';
import { AppCard, AppScreen, AppSectionTitle, useAppTheme } from '@/components/ui/app-shell';

export default function TabTwoScreen() {
  const colors = useAppTheme();
  return (
    <AppScreen>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <AppCard style={styles.hero}>
          <Text style={[styles.kicker, { color: colors.primary }]}>Overview</Text>
          <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
          <Text style={[styles.text, { color: colors.muted }]}>A cleaner starting point for the app.</Text>
        </AppCard>

        <AppCard>
          <AppSectionTitle title="File-based routing" subtitle="How navigation is wired" />
          <Text style={[styles.text, { color: colors.muted }]}>
            This app has two screens: <Text style={[styles.bold, { color: colors.text }]}>app/(tabs)/index.tsx</Text> and{' '}
            <Text style={[styles.bold, { color: colors.text }]}>app/(tabs)/explore.tsx</Text>.
          </Text>
          <Text style={[styles.text, { color: colors.muted }]}>
            The layout file in <Text style={[styles.bold, { color: colors.text }]}>app/(tabs)/_layout.tsx</Text> sets up the
            tab navigator.
          </Text>
          <ExternalLink href="https://docs.expo.dev/router/introduction">
            <Text style={[styles.link, { color: colors.primary }]}>Learn more</Text>
          </ExternalLink>
        </AppCard>

        <AppCard>
          <AppSectionTitle title="Images" subtitle="Static assets" />
          <Text style={[styles.text, { color: colors.muted }]}>
            For static images, you can use the <Text style={[styles.bold, { color: colors.text }]}>@2x</Text> and{' '}
            <Text style={[styles.bold, { color: colors.text }]}>@3x</Text> suffixes to provide files for different screen
            densities.
          </Text>
          <Image source={require('@/assets/images/react-logo.png')} style={styles.image} />
        </AppCard>

        <AppCard>
          <AppSectionTitle title="Android, iOS, and web support" subtitle="Cross-platform" />
          <Text style={[styles.text, { color: colors.muted }]}>
            You can open this project on Android, iOS, and the web. To open the web version, press{' '}
            <Text style={[styles.bold, { color: colors.text }]}>w</Text> in the terminal running this project.
          </Text>
          {Platform.select({
            ios: <Text style={[styles.text, { color: colors.muted }]}>Native gestures and transitions feel especially smooth on iOS.</Text>,
          })}
        </AppCard>

        <AppCard>
          <AppSectionTitle title="Light and dark mode" subtitle="Theme-aware UI" />
          <Text style={[styles.text, { color: colors.muted }]}>
            The template supports light and dark mode. Use <Text style={[styles.bold, { color: colors.text }]}>useColorScheme()</Text>{' '}
            to adapt colors accordingly.
          </Text>
        </AppCard>

        <AppCard>
          <AppSectionTitle title="Animations" subtitle="Motion" />
          <Text style={[styles.text, { color: colors.muted }]}>
            The template includes animated UI examples like <Text style={[styles.bold, { color: colors.text }]}>ParallaxScrollView</Text>.
          </Text>
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
  bold: {
    fontWeight: '700',
  },
  link: {
    fontSize: 16,
    fontWeight: '700',
  },
  image: {
    width: 104,
    height: 104,
    alignSelf: 'center',
    marginTop: 4,
  },
});
