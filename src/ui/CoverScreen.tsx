import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';

import { MEMORIES } from '../data/memories';
import { theme } from '../theme/theme';

type CoverScreenProps = {
  onStart?: () => void;
};

const TITLE_TEXT = 'For My Valentine ❤️';
const HINT_TEXT = 'Tap Start';

export default function CoverScreen({ onStart }: CoverScreenProps) {
  const { width, height } = Dimensions.get('window');
  const cardWidth = Math.min(width * 0.7, 760);
  const cardHeight = Math.min(height * 0.6, 420);
  const hasMemories = MEMORIES.length > 0;

  return (
    <View style={styles.container}>
      <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        <View style={styles.infoBubble}>
          <Text style={styles.infoBubbleText}>i</Text>
        </View>
        <Text style={styles.title}>{TITLE_TEXT}</Text>
        {hasMemories ? (
          <Pressable
            onPress={onStart}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Start slideshow"
          >
            <Text style={styles.buttonText}>Start</Text>
          </Pressable>
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderTitle}>No memories yet</Text>
            <Text style={styles.placeholderText}>
              Add photos to assets/photos and update MEMORIES to begin.
            </Text>
          </View>
        )}
        {hasMemories ? <Text style={styles.hint}>{HINT_TEXT}</Text> : null}
      </View>
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
  card: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.lg,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xl,
  },
  infoBubble: {
    position: 'absolute',
    top: theme.spacing.lg,
    right: theme.spacing.lg,
    width: 26,
    height: 26,
    borderRadius: theme.radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(255, 45, 45, 0.55)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  infoBubbleText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 14,
    fontWeight: theme.typography.weight.medium,
  },
  title: {
    color: theme.colors.text,
    fontSize: theme.typography.size.xxl,
    fontWeight: theme.typography.weight.bold,
    letterSpacing: theme.typography.tracking.tight,
    textAlign: 'center',
  },
  button: {
    marginTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radii.lg,
    backgroundColor: 'rgba(255, 45, 45, 0.18)',
    borderWidth: 1,
    borderColor: 'rgba(255, 45, 45, 0.65)',
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
  },
  placeholder: {
    marginTop: theme.spacing.xl,
    alignItems: 'center',
  },
  placeholderTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
  },
  placeholderText: {
    marginTop: theme.spacing.sm,
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.sm,
    textAlign: 'center',
  },
  hint: {
    marginTop: theme.spacing.md,
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.sm,
    letterSpacing: theme.typography.tracking.wide,
    textTransform: 'uppercase',
  },
});
