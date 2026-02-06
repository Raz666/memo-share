import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme/theme';

type SlideshowScreenProps = {
  onExit?: () => void;
};

export default function SlideshowScreen({ onExit }: SlideshowScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SlideshowScreen</Text>
      <Text style={styles.subtitle}>Placeholder slideshow view</Text>
      <Pressable onPress={onExit} style={styles.button}>
        <Text style={styles.buttonText}>Back to cover</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
    padding: theme.spacing.xl,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.size.lg,
    fontWeight: theme.typography.weight.bold,
  },
  subtitle: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.size.md,
  },
  button: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: theme.colors.accent,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.medium,
  },
});
