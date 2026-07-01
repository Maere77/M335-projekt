import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View, type StyleProp, type TextStyle, type ViewStyle } from 'react-native';

import { useColorScheme } from '@/hooks/use-color-scheme';

const theme = {
  light: {
    background: '#f4f7fb',
    surface: '#ffffff',
    surfaceAlt: '#eef2ff',
    border: '#dbe4f0',
    text: '#0f172a',
    muted: '#64748b',
    primary: '#2563eb',
    primarySoft: '#dbeafe',
    secondary: '#e2e8f0',
  },
  dark: {
    background: '#07111f',
    surface: '#0f172a',
    surfaceAlt: '#111827',
    border: '#1f2a3d',
    text: '#f8fafc',
    muted: '#94a3b8',
    primary: '#60a5fa',
    primarySoft: '#172554',
    secondary: '#1e293b',
  },
} as const;

function useTheme() {
  const scheme = useColorScheme() ?? 'light';
  return theme[scheme];
}

export function useAppTheme() {
  return useTheme();
}

type AppScreenProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AppScreen({ children, style }: AppScreenProps) {
  const colors = useTheme();

  return <View style={[styles.screen, { backgroundColor: colors.background }, style]}>{children}</View>;
}

type AppCardProps = {
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function AppCard({ children, style }: AppCardProps) {
  const colors = useTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          shadowColor: colors.text,
        },
        style,
      ]}>
      {children}
    </View>
  );
}

type AppButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}: AppButtonProps) {
  const colors = useTheme();
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: isPrimary ? colors.primary : colors.secondary,
          borderColor: isPrimary ? colors.primary : colors.border,
          opacity: pressed ? 0.88 : 1,
          transform: [{ scale: pressed ? 0.98 : 1 }],
        },
        style,
      ]}>
      <Text
        style={[
          styles.buttonText,
          { color: isPrimary ? '#ffffff' : colors.text },
          textStyle,
        ]}>
        {title}
      </Text>
    </Pressable>
  );
}

type AppSectionTitleProps = {
  title: string;
  subtitle?: string;
};

export function AppSectionTitle({ title, subtitle }: AppSectionTitleProps) {
  const colors = useTheme();

  return (
    <View style={styles.sectionTitle}>
      <Text style={[styles.sectionLabel, { color: colors.muted }]}>{subtitle}</Text>
      <Text style={[styles.sectionHeading, { color: colors.text }]}>{title}</Text>
    </View>
  );
}

type AppStatProps = {
  label: string;
  value: string;
};

export function AppStat({ label, value }: AppStatProps) {
  const colors = useTheme();

  return (
    <View
      style={[
        styles.stat,
        {
          backgroundColor: colors.surfaceAlt,
          borderColor: colors.border,
        },
      ]}>
      <Text style={[styles.statLabel, { color: colors.muted }]}>{label}</Text>
      <Text style={[styles.statValue, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  card: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 20,
    shadowOpacity: 0.12,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 3,
    gap: 16,
  },
  button: {
    minHeight: 48,
    paddingHorizontal: 18,
    borderRadius: 999,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
  },
  sectionTitle: {
    gap: 4,
  },
  sectionLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
  },
  sectionHeading: {
    fontSize: 24,
    fontWeight: '800',
    lineHeight: 30,
  },
  stat: {
    minWidth: 130,
    flex: 1,
    borderRadius: 18,
    borderWidth: 1,
    padding: 16,
    gap: 8,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1.1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: '800',
  },
});
