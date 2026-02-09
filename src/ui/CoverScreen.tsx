import React from 'react';
import { Dimensions, Pressable, StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

import { MEMORIES } from '../data/memories';
import { theme } from '../theme/theme';

type CoverScreenProps = {
  onStart?: () => void;
};

const TITLE_TEXT = 'For My Valentine ❤️';
const HINT_TEXT = 'Tap Start';
const COVER_VARIANT: 'halo' | 'grid' | 'wash' = 'halo';

export default function CoverScreen({ onStart }: CoverScreenProps) {
  const { width, height } = Dimensions.get('window');
  const cardWidth = Math.min(width * 0.74, 820);
  const cardHeight = Math.min(height * 0.62, 460);
  const hasMemories = MEMORIES.length > 0;

  return (
    <View style={styles.container}>
      {COVER_VARIANT === 'halo' ? <HaloBackground /> : null}
      {COVER_VARIANT === 'grid' ? <GridBackground /> : null}
      {COVER_VARIANT === 'wash' ? <WashBackground /> : null}
      <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
        <LinearGradient
          colors={['rgba(255, 45, 45, 0.22)', 'rgba(24, 25, 27, 0.9)']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.cardGlow}
        />
        <LinearGradient
          colors={['rgba(255, 45, 45, 0)', 'rgba(24, 25, 27, 0.7)']}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={styles.cardBlend}
        />
        <View style={styles.cardEdge} />
        <View style={styles.cardInnerEdge} />
        <View style={styles.ribbon} />
        <View style={styles.cornerCut} />
        <Text style={styles.kicker}>A small night gift</Text>
        <Text style={styles.title}>{TITLE_TEXT}</Text>
        <Text style={styles.subtitle}>a memory loop for us</Text>
        {hasMemories ? (
          <Pressable
            onPress={onStart}
            style={styles.button}
            accessibilityRole="button"
            accessibilityLabel="Start slideshow"
          >
            <Text style={styles.buttonText}>Begin</Text>
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

function HaloBackground() {
  return (
    <View style={styles.backgroundLayer} pointerEvents="none">
      <View style={styles.haloLarge} />
      <View style={styles.haloMedium} />
      <View style={styles.haloSmall} />
    </View>
  );
}

function GridBackground() {
  const lines = Array.from({ length: 10 });

  return (
    <View style={styles.backgroundLayer} pointerEvents="none">
      <View style={styles.gridLines}>
        {lines.map((_, index) => (
          <View
            key={`grid-line-${index}`}
            style={[styles.gridLine, { top: 80 + index * 60 }]}
          />
        ))}
      </View>
      <View style={styles.cornerTopLeft} />
      <View style={styles.cornerTopRight} />
      <View style={styles.cornerBottomLeft} />
      <View style={styles.cornerBottomRight} />
    </View>
  );
}

function WashBackground() {
  return (
    <View style={styles.backgroundLayer} pointerEvents="none">
      <LinearGradient
        colors={['rgba(255, 45, 45, 0.25)', 'rgba(24, 25, 27, 0)']}
        start={{ x: 0.1, y: 0.1 }}
        end={{ x: 0.9, y: 0.9 }}
        style={styles.washOne}
      />
      <LinearGradient
        colors={['rgba(255, 90, 90, 0)', 'rgba(255, 90, 90, 0.12)']}
        start={{ x: 0.8, y: 0.1 }}
        end={{ x: 0.1, y: 0.9 }}
        style={styles.washTwo}
      />
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
  backgroundLayer: {
    ...StyleSheet.absoluteFillObject,
  },
  card: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    backgroundColor: 'rgba(41, 43, 46, 0.86)',
    borderRadius: theme.radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.04)',
    paddingHorizontal: theme.spacing.xxxl,
    paddingVertical: theme.spacing.xxl,
    overflow: 'hidden',
    shadowColor: 'rgba(255, 45, 45, 0.35)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 18,
    elevation: 6,
  },
  cardGlow: {
    ...StyleSheet.absoluteFillObject,
  },
  cardBlend: {
    ...StyleSheet.absoluteFillObject,
  },
  cardEdge: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: theme.radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 45, 45, 0.28)',
  },
  cardInnerEdge: {
    position: 'absolute',
    top: 6,
    right: 6,
    bottom: 6,
    left: 6,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.06)',
  },
  ribbon: {
    position: 'absolute',
    top: 0,
    right: theme.spacing.xxl,
    width: 2,
    height: '100%',
    backgroundColor: 'rgba(255, 45, 45, 0.5)',
  },
  cornerCut: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 90,
    height: 90,
    backgroundColor: 'rgba(255, 45, 45, 0.12)',
    borderBottomLeftRadius: 90,
  },
  kicker: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.sm,
  },
  title: {
    color: theme.colors.text,
    fontSize: 48,
    fontWeight: theme.typography.weight.bold,
    letterSpacing: -0.8,
    textShadowColor: 'rgba(255, 45, 45, 0.25)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 10,
  },
  subtitle: {
    marginTop: theme.spacing.sm,
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 18,
    letterSpacing: 0.3,
  },
  button: {
    marginTop: theme.spacing.xxl,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.radii.pill,
    backgroundColor: 'rgba(255, 45, 45, 0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255, 45, 45, 0.7)',
  },
  buttonText: {
    color: theme.colors.text,
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.semibold,
    letterSpacing: 0.6,
    textTransform: 'uppercase',
  },
  placeholder: {
    marginTop: theme.spacing.xl,
    alignItems: 'flex-start',
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
  },
  hint: {
    marginTop: theme.spacing.lg,
    color: theme.colors.textMuted,
    fontSize: theme.typography.size.sm,
    letterSpacing: theme.typography.tracking.wide,
    textTransform: 'uppercase',
  },
  haloLarge: {
    position: 'absolute',
    width: 520,
    height: 520,
    borderRadius: 260,
    backgroundColor: 'rgba(255, 45, 45, 0.15)',
    top: -120,
    left: 80,
  },
  haloMedium: {
    position: 'absolute',
    width: 420,
    height: 420,
    borderRadius: 210,
    backgroundColor: 'rgba(255, 60, 60, 0.12)',
    bottom: -160,
    right: 40,
  },
  haloSmall: {
    position: 'absolute',
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(255, 90, 90, 0.1)',
    top: 120,
    right: 140,
  },
  gridLines: {
    ...StyleSheet.absoluteFillObject,
  },
  gridLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 40,
    left: 40,
    width: 32,
    height: 32,
    borderLeftWidth: 2,
    borderTopWidth: 2,
    borderColor: 'rgba(255, 45, 45, 0.3)',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 40,
    right: 40,
    width: 32,
    height: 32,
    borderRightWidth: 2,
    borderTopWidth: 2,
    borderColor: 'rgba(255, 45, 45, 0.3)',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 40,
    left: 40,
    width: 32,
    height: 32,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 45, 45, 0.3)',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    width: 32,
    height: 32,
    borderRightWidth: 2,
    borderBottomWidth: 2,
    borderColor: 'rgba(255, 45, 45, 0.3)',
  },
  washOne: {
    ...StyleSheet.absoluteFillObject,
  },
  washTwo: {
    ...StyleSheet.absoluteFillObject,
  },
});
