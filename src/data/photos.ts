// Placeholder assets until real photos are added to assets/photos.
export const PHOTO_SOURCES = {
  '001': require('../../assets/photos/DJI_20250412184502_0037_D.jpg'),
  '002': require('../../assets/photos/DJI_20250420152615_0082_D.jpg'),
  '003': require('../../assets/photos/DJI_20250514142520_0003_D.jpg'),
} as const;

export type PhotoKey = keyof typeof PHOTO_SOURCES;
