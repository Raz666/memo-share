import React, { useMemo, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { GestureResponderEvent } from 'react-native';

import { MEMORIES } from '../data/memories';
import type { ChapterItem } from '../slideshow/slideshowTypes';
import useSlideshow from '../slideshow/useSlideshow';
import { theme } from '../theme/theme';
import InfoBubble from './InfoBubble';
import InfoModal from './InfoModal';
import SlideRenderer from './SlideRenderer';

export default function SlideshowScreen() {
  const { currentItem, hudVisible, setHudVisible } = useSlideshow(MEMORIES);
  const slideItem = currentItem ?? MEMORIES[0];
  const [infoVisible, setInfoVisible] = useState(false);
  const chapterMap = useMemo(() => {
    return MEMORIES.reduce<Record<string, ChapterItem>>((acc, item) => {
      if (item.type === 'chapter') {
        acc[item.id] = item;
      }
      return acc;
    }, {});
  }, []);

  const handleCloseInfo = () => {
    setInfoVisible(false);
    setHudVisible(false);
  };

  const handleToggleHud = () => {
    if (infoVisible) {
      handleCloseInfo();
      return;
    }

    setHudVisible(!hudVisible);
  };

  const handleInfoPress = (event: GestureResponderEvent) => {
    event.stopPropagation();
    if (infoVisible) {
      handleCloseInfo();
      return;
    }

    setHudVisible(true);
    setInfoVisible(true);
  };

  const detailsText =
    slideItem?.type === 'photo' ? slideItem.details ?? '' : '';
  const bubbleVisible = Boolean(
    slideItem?.type === 'photo' && slideItem.details,
  );

  return (
    <View style={styles.container}>
      <Pressable style={styles.pressable} onPress={handleToggleHud}>
        {slideItem ? (
          <SlideRenderer item={slideItem} chapterMap={chapterMap} />
        ) : null}
        <InfoBubble
          visible={bubbleVisible}
          hudVisible={hudVisible}
          onPress={handleInfoPress}
        />
        {hudVisible ? (
          <View style={styles.hudOverlay} pointerEvents="none" />
        ) : null}
      </Pressable>
      <InfoModal
        visible={infoVisible}
        details={detailsText}
        onClose={handleCloseInfo}
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
