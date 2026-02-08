export type SpeedMode = 'faster' | 'fast' | 'slow' | 'slower';

export const SPEED_DURATIONS_MS = {
  faster: { photo: 2_000, chapter: 1_000 },
  fast: { photo: 10_000, chapter: 4_000 },
  slow: { photo: 60_000, chapter: 6_000 },
  slower: { photo: 600_000, chapter: 6_000 },
} as const;

export const getSpeedDurations = (speed: SpeedMode) =>
  SPEED_DURATIONS_MS[speed];

export type PhotoItem = {
  type: 'photo';
  id: string;
  chapterId: string;
  sourceKey: string;
  caption?: string;
  date?: string;
  details?: string;
};

export type ChapterItem = {
  type: 'chapter';
  id: string;
  title: string;
  subtitle?: string;
  frameKey?: string;
};

export type MemoryItem = PhotoItem | ChapterItem;
