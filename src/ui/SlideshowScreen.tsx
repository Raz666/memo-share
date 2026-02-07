import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { MEMORIES } from '../data/memories';
import useSlideshow from '../slideshow/useSlideshow';
import { theme } from '../theme/theme';
import SlideRenderer from './SlideRenderer';

export default function SlideshowScreen() {
  const { currentItem, currentDurationMs, hudVisible, setHudVisible } =
    useSlideshow(MEMORIES);
  const slideItem = currentItem ?? MEMORIES[0];

  const handleToggleHud = () => {
    setHudVisible(!hudVisible);
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={handleToggleHud}>
        {slideItem ? (
          <SlideRenderer item={slideItem} durationMs={currentDurationMs} />
        ) : null}
        {hudVisible ? <View style={styles.hudOverlay} /> : null}
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
  },
  pressable: {
    flex: 1,
    alignSelf: 'stretch',
  },
  hudOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.06)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
  },
});
