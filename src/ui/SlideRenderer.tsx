import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, StyleSheet, Text, View } from 'react-native';
import { Image } from 'expo-image';

import type { MemoryItem } from '../slideshow/slideshowTypes';
import { PHOTO_SOURCES, type PhotoKey } from '../data/photos';
import { theme } from '../theme/theme';

type SlideRendererProps = {
  item: MemoryItem;
  durationMs?: number;
};

const FALLBACK_SOURCE = require('../../assets/icon.png');
const TRANSITION_MS = 450;

export default function SlideRenderer({
  item,
  durationMs,
}: SlideRendererProps) {
  const [currentItem, setCurrentItem] = useState(item);
  const [prevItem, setPrevItem] = useState<MemoryItem | null>(null);
  const transition = useRef(new Animated.Value(1)).current;
  const zoom = useRef(new Animated.Value(1)).current;
  const zoomAnimation = useRef<Animated.CompositeAnimation | null>(null);

  const incomingOpacity = transition;
  const outgoingOpacity = useMemo(
    () =>
      transition.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 0],
      }),
    [transition],
  );

  useEffect(() => {
    if (item.id === currentItem.id) {
      return;
    }

    setPrevItem(currentItem);
    setCurrentItem(item);
    transition.stopAnimation();
    transition.setValue(0);
    Animated.timing(transition, {
      toValue: 1,
      duration: TRANSITION_MS,
      useNativeDriver: true,
    }).start(({ finished }) => {
      if (finished) {
        setPrevItem(null);
      }
    });
  }, [item, currentItem, transition]);

  useEffect(() => {
    zoomAnimation.current?.stop();
    zoom.setValue(1);

    if (currentItem.type !== 'photo') {
      return;
    }

    const targetDuration = Math.max(2000, durationMs ?? 10_000);
    zoomAnimation.current = Animated.timing(zoom, {
      toValue: 1.05,
      duration: targetDuration,
      useNativeDriver: true,
    });
    zoomAnimation.current.start();

    return () => {
      zoomAnimation.current?.stop();
    };
  }, [currentItem, durationMs, zoom]);

  return (
    <View style={styles.container}>
      {prevItem ? (
        <Animated.View style={[styles.layer, { opacity: outgoingOpacity }]}>
          <SlideContent item={prevItem} />
        </Animated.View>
      ) : null}
      <Animated.View style={[styles.layer, { opacity: incomingOpacity }]}>
        <SlideContent
          item={currentItem}
          zoomScale={currentItem.type === 'photo' ? zoom : undefined}
        />
      </Animated.View>
    </View>
  );
}

type SlideContentProps = {
  item: MemoryItem;
  zoomScale?: Animated.Value;
};

function SlideContent({ item, zoomScale }: SlideContentProps) {
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
      />
      <View style={styles.photoDim} />
      <Animated.View
        style={[
          styles.photoForegroundWrap,
          zoomScale ? { transform: [{ scale: zoomScale }] } : null,
        ]}
      >
        <Image
          source={photoSource}
          style={styles.photoForeground}
          contentFit="contain"
        />
      </Animated.View>
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
    width: '92%',
    height: '92%',
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
