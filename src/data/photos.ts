// Naming scheme: assets/photos/001.jpg ... 100.jpg (zero-padded).
// Add new entries here when you add images to assets/photos.
export const PHOTO_SOURCES = {
  '001': require('../../assets/photos/DJI_20250412184502_0037_D.jpg'),
  '002': require('../../assets/photos/DJI_20250420152615_0082_D.jpg'),
  '003': require('../../assets/photos/DJI_20250514142520_0003_D.jpg'),
} as const;

export type PhotoKey = keyof typeof PHOTO_SOURCES;
