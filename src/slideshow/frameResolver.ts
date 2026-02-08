import type { ChapterItem, MemoryItem } from './slideshowTypes';
import { theme } from '../theme/theme';

export type ChapterMap = Record<string, ChapterItem>;

export const resolveFrameKeyForItem = (
  item: MemoryItem,
  chapterMap?: ChapterMap,
) => {
  let candidate = 'default';

  if (item.type === 'chapter') {
    candidate = item.frameKey ?? item.id ?? 'default';
  } else {
    const chapter = chapterMap?.[item.chapterId];
    candidate = chapter?.frameKey ?? chapter?.id ?? 'default';
  }

  return theme.frames[candidate] ? candidate : 'default';
};
