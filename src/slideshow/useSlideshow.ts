import { useCallback, useEffect, useMemo, useRef, useState } from 'react';

import type { MemoryItem, SpeedMode } from './slideshowTypes';
import { getSpeedDurations } from './slideshowTypes';

export type ChapterProgress = {
  total: number;
  activeIndex: number;
};

export type UseSlideshowResult = {
  index: number;
  hudVisible: boolean;
  pausedByUser: boolean;
  speedMode: SpeedMode;
  effectivePaused: boolean;
  currentItem: MemoryItem | undefined;
  currentDurationMs: number;
  currentChapterId: string | null;
  chapterPhotoIds: Record<string, string[]>;
  currentChapterProgress: ChapterProgress;
  next: () => void;
  prev: () => void;
  setHudVisible: (visible: boolean) => void;
  toggleUserPaused: () => void;
  setSpeedMode: (mode: SpeedMode) => void;
};

const DEFAULT_SPEED: SpeedMode = 'fast';

const clampIndex = (value: number, length: number) => {
  if (length <= 0) return 0;
  const normalized = value % length;
  return normalized < 0 ? normalized + length : normalized;
};

export default function useSlideshow(items: MemoryItem[]): UseSlideshowResult {
  const [index, setIndex] = useState(0);
  const [hudVisible, setHudVisible] = useState(false);
  const [pausedByUser, setPausedByUser] = useState(false);
  const [speedMode, setSpeedMode] = useState<SpeedMode>(DEFAULT_SPEED);
  const [navTick, setNavTick] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const itemsLength = items.length;
  const currentItem = items[index];
  const effectivePaused = pausedByUser || hudVisible;

  const currentDurationMs = useMemo(() => {
    const durations = getSpeedDurations(speedMode);
    if (!currentItem) return durations.photo;
    return currentItem.type === 'chapter' ? durations.chapter : durations.photo;
  }, [currentItem, speedMode]);

  useEffect(() => {
    if (itemsLength === 0) {
      setIndex(0);
      return;
    }
    setIndex((current) =>
      current >= itemsLength ? itemsLength - 1 : Math.max(current, 0)
    );
  }, [itemsLength]);

  const next = useCallback(() => {
    setIndex((current) => clampIndex(current + 1, itemsLength));
    setNavTick((tick) => tick + 1);
  }, [itemsLength]);

  const prev = useCallback(() => {
    setIndex((current) => clampIndex(current - 1, itemsLength));
    setNavTick((tick) => tick + 1);
  }, [itemsLength]);

  const toggleUserPaused = useCallback(() => {
    setPausedByUser((current) => !current);
  }, []);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    if (itemsLength === 0 || effectivePaused) {
      return;
    }

    if (currentDurationMs <= 0) {
      return;
    }

    timerRef.current = setTimeout(() => {
      setIndex((current) => clampIndex(current + 1, itemsLength));
    }, currentDurationMs);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [itemsLength, effectivePaused, currentDurationMs, navTick]);

  const chapterPhotoIds = useMemo(() => {
    const map: Record<string, string[]> = {};
    for (const item of items) {
      if (item.type === 'photo') {
        if (!map[item.chapterId]) {
          map[item.chapterId] = [];
        }
        map[item.chapterId].push(item.id);
      }
    }
    return map;
  }, [items]);

  const currentChapterId = useMemo(() => {
    if (!currentItem) return null;
    if (currentItem.type === 'photo') return currentItem.chapterId;
    for (let i = index - 1; i >= 0; i -= 1) {
      const prior = items[i];
      if (prior?.type === 'photo') {
        return prior.chapterId;
      }
    }
    return null;
  }, [currentItem, index, items]);

  const currentChapterProgress = useMemo<ChapterProgress>(() => {
    if (!currentItem || currentItem.type !== 'photo') {
      return { total: 0, activeIndex: -1 };
    }
    const ids = chapterPhotoIds[currentItem.chapterId] ?? [];
    const activeIndex = ids.indexOf(currentItem.id);
    return { total: ids.length, activeIndex };
  }, [chapterPhotoIds, currentItem]);

  return {
    index,
    hudVisible,
    pausedByUser,
    speedMode,
    effectivePaused,
    currentItem,
    currentDurationMs,
    currentChapterId,
    chapterPhotoIds,
    currentChapterProgress,
    next,
    prev,
    setHudVisible,
    toggleUserPaused,
    setSpeedMode,
  };
}
