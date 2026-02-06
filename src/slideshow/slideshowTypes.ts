export type SpeedMode = 'fast' | 'slow' | 'slower';

export type PhotoItem = {
  type: 'photo';
  id: string;
  chapterId: string;
  sourceKey: string;
  caption?: string;
  date?: string;
  details?: string;
  frameKey?: string;
};

export type ChapterItem = {
  type: 'chapter';
  id: string;
  title: string;
  subtitle?: string;
  frameKey?: string;
};

export type MemoryItem = PhotoItem | ChapterItem;
