import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import {
  Rewind,
  FastForward,
  Pause,
  Play,
  Settings,
} from 'lucide-react-native';

import { theme } from '../theme/theme';
import ProgressDots from './ProgressDots';
import type { SpeedMode } from '../slideshow/slideshowTypes';

type HudOverlayProps = {
  visible: boolean;
  pausedByUser: boolean;
  speedMode: SpeedMode;
  onHide: () => void;
  onPrev: () => void;
  onNext: () => void;
  onTogglePause: () => void;
  onSpeedChange: (mode: SpeedMode) => void;
  onOpenCover?: () => void;
  onSettings?: () => void;
  progress: {
    total: number;
    activeIndex: number;
  };
};

const AUTO_HIDE_MS = 8000;
const ICON_COLOR = 'rgba(255, 255, 255, 0.85)';

const SPEED_OPTIONS: Array<{
  mode: SpeedMode;
  title: string;
  description: string;
}> = [
  { mode: 'faster', title: 'Faster', description: '2s' },
  { mode: 'fast', title: 'Fast', description: '10s' },
  { mode: 'slow', title: 'Slow', description: '60s' },
  { mode: 'slower', title: 'Slower', description: '10m' },
];

export default function HudOverlay({
  visible,
  pausedByUser,
  speedMode,
  onHide,
  onPrev,
  onNext,
  onTogglePause,
  onSpeedChange,
  onOpenCover,
  onSettings,
  progress,
}: HudOverlayProps) {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  const startTimer = useCallback(() => {
    clearTimer();
    timerRef.current = setTimeout(() => {
      onHide();
    }, AUTO_HIDE_MS);
  }, [clearTimer, onHide]);

  useEffect(() => {
    if (!visible) {
      clearTimer();
      setMenuOpen(false);
      return;
    }

    startTimer();

    return clearTimer;
  }, [visible, startTimer, clearTimer]);

  if (!visible) {
    return null;
  }

  const handleAction = (action: () => void) => () => {
    startTimer();
    action();
  };

  const handlePlayPause = () => {
    startTimer();
    onTogglePause();
  };

  const handleSettingsToggle = () => {
    startTimer();
    setMenuOpen((current) => !current);
  };

  const handleSpeedSelect = (mode: SpeedMode) => {
    onSpeedChange(mode);
    setMenuOpen(false);
    startTimer();
  };

  const handleOpenCover = () => {
    if (!onOpenCover) return;
    setMenuOpen(false);
    onOpenCover();
  };

  const handleBackdropPress = () => {
    if (menuOpen) {
      setMenuOpen(false);
      startTimer();
      return;
    }
    onHide();
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={styles.backdrop} onPress={handleBackdropPress} />
      <View style={styles.centerRow} pointerEvents="box-none">
        <Pressable style={styles.sideButton} onPress={handleAction(onPrev)}>
          <Rewind size={36} color={ICON_COLOR} />
        </Pressable>
        <Pressable style={styles.playButton} onPress={handlePlayPause}>
          {pausedByUser ? (
            <Play size={40} color={ICON_COLOR} />
          ) : (
            <Pause size={40} color={ICON_COLOR} />
          )}
        </Pressable>
        <Pressable style={styles.sideButton} onPress={handleAction(onNext)}>
          <FastForward size={36} color={ICON_COLOR} />
        </Pressable>
      </View>
      <View style={styles.topRight} pointerEvents="box-none">
        <Pressable
          style={styles.iconButton}
          onPress={onSettings ? handleAction(onSettings) : handleSettingsToggle}
        >
          <Settings size={22} color={ICON_COLOR} />
        </Pressable>
        {menuOpen ? (
          <View style={styles.menu}>
            <Text style={styles.menuHeader}>Slideshow speed</Text>
            {SPEED_OPTIONS.map((option) => {
              const isActive = option.mode === speedMode;
              return (
                <Pressable
                  key={option.mode}
                  style={styles.menuItem}
                  onPress={() => handleSpeedSelect(option.mode)}
                >
                  <View style={styles.menuRow}>
                    <View
                      style={[
                        styles.menuDot,
                        isActive ? styles.menuDotActive : null,
                      ]}
                    />
                    <View style={styles.menuTextGroup}>
                      <Text style={styles.menuTitle}>{option.title}</Text>
                      <Text style={styles.menuDescription}>
                        ({option.description})
                      </Text>
                    </View>
                  </View>
                </Pressable>
              );
            })}
            {onOpenCover ? <View style={styles.menuDivider} /> : null}
            {onOpenCover ? (
              <Pressable style={styles.menuItem} onPress={handleOpenCover}>
                <View style={styles.menuRow}>
                  <View style={styles.menuTextGroup}>
                    <Text style={styles.menuTitle}>Open Cover</Text>
                  </View>
                </View>
              </Pressable>
            ) : null}
          </View>
        ) : null}
      </View>
      <View style={styles.bottomRow} pointerEvents="box-none">
        <View style={styles.bottomCenter}>
          <ProgressDots
            total={progress.total}
            activeIndex={progress.activeIndex}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  centerRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: -36,
  },
  sideButton: {
    width: 140,
    height: 140,
    alignItems: 'center',
    justifyContent: 'center',
  },
  playButton: {
    width: 130,
    height: 130,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.xl,
  },
  topRight: {
    position: 'absolute',
    top: theme.spacing.xl,
    right: theme.spacing.xl,
    alignItems: 'flex-end',
  },
  bottomRow: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: theme.spacing.xxl,
  },
  bottomCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  menu: {
    position: 'absolute',
    top: 44 + theme.spacing.sm,
    backgroundColor: theme.colors.card,
    borderRadius: theme.radii.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    minWidth: 200,
  },
  menuHeader: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: theme.typography.size.xs,
    letterSpacing: theme.typography.tracking.wide,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.sm,
  },
  menuItem: {
    paddingVertical: theme.spacing.sm,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
    marginRight: theme.spacing.sm,
  },
  menuDotActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
  },
  menuTextGroup: {
    flex: 1,
    flexDirection: 'row',
    gap: theme.spacing.xs,
  },
  menuTitle: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: theme.typography.size.sm,
    fontWeight: theme.typography.weight.semibold,
  },
  menuDescription: {
    marginTop: 2,
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: theme.typography.size.xs,
  },
  menuDivider: {
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.12)',
    marginVertical: theme.spacing.sm,
  },
});
