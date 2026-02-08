import React, { useEffect, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import type { MemoryItem } from '../slideshow/slideshowTypes';
import { PHOTO_SOURCES, type PhotoKey } from '../data/photos';
import { theme } from '../theme/theme';

type SlideRendererProps = {
  item: MemoryItem;
};

const FALLBACK_SOURCE = require('../../assets/icon.png');
const TRANSITION_MS = 450;

export default function SlideRenderer({ item }: SlideRendererProps) {
  const [slotAItem, setSlotAItem] = useState(item);
  const [slotBItem, setSlotBItem] = useState<MemoryItem | null>(null);
  const activeSlotRef = useRef<'A' | 'B'>('A');
  const isTransitioningRef = useRef(false);

  const opacityA = useRef(new Animated.Value(1)).current;
  const opacityB = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const activeSlot = activeSlotRef.current;
    const activeItem = activeSlot === 'A' ? slotAItem : slotBItem;

    if (activeItem?.id === item.id) {
      return;
    }

    const incomingSlot = activeSlot === 'A' ? 'B' : 'A';
    const incomingOpacity = incomingSlot === 'A' ? opacityA : opacityB;
    const outgoingOpacity = incomingSlot === 'A' ? opacityB : opacityA;
    if (incomingSlot === 'A') {
      setSlotAItem(item);
    } else {
      setSlotBItem(item);
    }

    isTransitioningRef.current = true;
    outgoingOpacity.stopAnimation();
    incomingOpacity.stopAnimation();

    incomingOpacity.setValue(0);

    Animated.parallel([
      Animated.timing(outgoingOpacity, {
        toValue: 0,
        duration: TRANSITION_MS,
        useNativeDriver: true,
      }),
      Animated.timing(incomingOpacity, {
        toValue: 1,
        duration: TRANSITION_MS,
        useNativeDriver: true,
      }),
    ]).start(() => {
      activeSlotRef.current = incomingSlot;
      isTransitioningRef.current = false;
    });
  }, [item, slotAItem, slotBItem, opacityA, opacityB]);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.layer, { opacity: opacityA }]}
        renderToHardwareTextureAndroid
        needsOffscreenAlphaCompositing
      >
        {slotAItem ? <SlideContent item={slotAItem} /> : null}
      </Animated.View>
      <Animated.View
        style={[styles.layer, { opacity: opacityB }]}
        renderToHardwareTextureAndroid
        needsOffscreenAlphaCompositing
      >
        {slotBItem ? <SlideContent item={slotBItem} /> : null}
      </Animated.View>
    </View>
  );
}

type SlideContentProps = {
  item: MemoryItem;
};

function SlideContent({ item }: SlideContentProps) {
  if (item.type === 'chapter') {
    return (
      <View style={styles.container}>
        <View style={styles.chapterCard}>
          <View style={styles.chapterAccent} />
          <Text style={styles.chapterTitle}>{item.title}</Text>
          {item.subtitle ? (
            <Text style={styles.chapterSubtitle}>{item.subtitle}</Text>
          ) : null}
        </View>
      </View>
    );
  }

  const photoSource =
    PHOTO_SOURCES[item.sourceKey as PhotoKey] ?? FALLBACK_SOURCE;

  return (
    <View style={styles.container}>
      <Image
        source={photoSource}
        style={styles.photoBackground}
        contentFit="cover"
        blurRadius={28}
        cachePolicy="memory-disk"
        transition={0}
      />
      <View style={styles.photoDim} />
      <View style={styles.photoForegroundWrap}>
        <Image
          source={photoSource}
          style={styles.photoForeground}
          contentFit="contain"
          cachePolicy="memory-disk"
          transition={0}
        />
      </View>
      {(item.caption || item.date) && (
        <View style={styles.photoMeta}>
          {item.caption ? (
            <Text style={styles.photoCaption}>{item.caption}</Text>
          ) : null}
          {item.date ? <Text style={styles.photoDate}>{item.date}</Text> : null}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.colors.background,
  },
  layer: {
    ...StyleSheet.absoluteFillObject,
  },
  chapterCard: {
    minWidth: 520,
    maxWidth: 760,
    paddingHorizontal: theme.spacing.xxl,
    paddingVertical: theme.spacing.xl,
    borderRadius: theme.radii.lg,
    backgroundColor: theme.colors.card,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chapterAccent: {
    width: 68,
    height: 3,
    borderRadius: theme.radii.pill,
    backgroundColor: theme.colors.accent,
    marginBottom: theme.spacing.md,
  },
  chapterTitle: {
    color: theme.colors.text,
    fontSize: theme.typography.size.xl,
    fontWeight: theme.typography.weight.bold,
    textAlign: 'center',
  },
  chapterSubtitle: {
    color: theme.colors.textMuted,
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.size.md,
    textAlign: 'center',
  },
  photoBackground: {
    ...StyleSheet.absoluteFillObject,
  },
  photoDim: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
  },
  photoForegroundWrap: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  photoForeground: {
    width: '100%',
    height: '100%',
  },
  photoMeta: {
    position: 'absolute',
    left: theme.spacing.xl,
    bottom: theme.spacing.xl,
    maxWidth: '70%',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.radii.md,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  photoCaption: {
    color: theme.colors.text,
    fontSize: theme.typography.size.md,
    fontWeight: theme.typography.weight.medium,
  },
  photoDate: {
    color: theme.colors.textMuted,
    marginTop: 2,
    fontSize: theme.typography.size.sm,
  },
});
