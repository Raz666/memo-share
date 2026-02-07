import type { MemoryItem } from '../slideshow/slideshowTypes';

export const MEMORIES: MemoryItem[] = [
  {
    type: 'chapter',
    id: 'chapter-1',
    title: 'Our Story',
    subtitle: 'The beginning',
  },
  {
    type: 'photo',
    id: 'photo-1',
    chapterId: 'chapter-1',
    sourceKey: '001',
    caption: 'First day',
    date: '2024-02-14',
    details: 'A simple walk that started everything.',
  },
  {
    type: 'photo',
    id: 'photo-2',
    chapterId: 'chapter-1',
    sourceKey: '002',
    caption: 'Weekend walk',
    date: '2024-03-02',
  },
  {
    type: 'photo',
    id: 'photo-3',
    chapterId: 'chapter-1',
    sourceKey: '003',
    caption: 'Coffee stop',
    date: '2024-04-10',
  },
  {
    type: 'chapter',
    id: 'chapter-2',
    title: 'More Memories',
    subtitle: 'Little moments',
  },
  {
    type: 'photo',
    id: 'photo-4',
    chapterId: 'chapter-2',
    sourceKey: '001',
    caption: 'Beach day',
    date: '2024-06-21',
  },
  {
    type: 'photo',
    id: 'photo-5',
    chapterId: 'chapter-2',
    sourceKey: '002',
    caption: 'Evening lights',
    date: '2024-09-05',
  },
];
