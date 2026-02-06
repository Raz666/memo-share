import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme/theme';

type CoverScreenProps = {
  onStart?: () => void;
};

export default function CoverScreen({ onStart }: CoverScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Memory Slideshow</Text>
      <Text style={styles.subtitle}>CoverScreen placeholder</Text>
      <Pressable onPress={onStart} style={styles.button}>
        <Text style={styles.buttonText}>Start</Text>
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
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    letterSpacing: theme.typography.tracking.tight,
  },
  subtitle: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.size.md,
  },
  button: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.accent,
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
  },
});
