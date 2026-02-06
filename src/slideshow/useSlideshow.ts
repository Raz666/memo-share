import type { SpeedMode } from './slideshowTypes';

export type SlideshowState = {
  index: number;
  pausedByUser: boolean;
  hudVisible: boolean;
  speed: SpeedMode;
};

export const DEFAULT_SPEED: SpeedMode = 'fast';

export const createInitialSlideshowState = (): SlideshowState => ({
  index: 0,
  pausedByUser: false,
  hudVisible: false,
  speed: DEFAULT_SPEED,
});

export const getEffectivePaused = (state: SlideshowState) =>
  state.pausedByUser || state.hudVisible;
