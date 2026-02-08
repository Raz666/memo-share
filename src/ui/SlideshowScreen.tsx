import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import type { GestureResponderEvent } from 'react-native';

import { MEMORIES } from '../data/memories';
import type { ChapterItem } from '../slideshow/slideshowTypes';
import useSlideshow from '../slideshow/useSlideshow';
import { theme } from '../theme/theme';
import InfoBubble from './InfoBubble';
import InfoModal from './InfoModal';
import HudOverlay from './HudOverlay';
import SlideRenderer from './SlideRenderer';

export default function SlideshowScreen() {
  const {
    currentChapterProgress,
    currentItem,
    hudVisible,
    next,
    pausedByUser,
    prev,
    setHudVisible,
    setSpeedMode,
    speedMode,
    toggleUserPaused,
  } = useSlideshow(MEMORIES);
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

  const playHideRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const prevPausedRef = useRef(pausedByUser);

  useEffect(() => {
    if (playHideRef.current) {
      clearTimeout(playHideRef.current);
      playHideRef.current = null;
    }

    if (hudVisible && prevPausedRef.current && !pausedByUser) {
      playHideRef.current = setTimeout(() => {
        setHudVisible(false);
      }, 500);
    }

    prevPausedRef.current = pausedByUser;
    return () => {
      if (playHideRef.current) {
        clearTimeout(playHideRef.current);
        playHideRef.current = null;
      }
    };
  }, [hudVisible, pausedByUser, setHudVisible]);

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
      </Pressable>
      <HudOverlay
        visible={hudVisible}
        pausedByUser={pausedByUser}
        speedMode={speedMode}
        onHide={handleCloseInfo}
        onPrev={prev}
        onNext={next}
        onTogglePause={toggleUserPaused}
        onSpeedChange={setSpeedMode}
        progress={currentChapterProgress}
      />
      <InfoBubble
        visible={bubbleVisible}
        hudVisible={hudVisible}
        onPress={handleInfoPress}
      />
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
});
