export const colors = {
  background: '#18191b',
  card: '#292b2e',
  text: '#f5f5f5',
  textMuted: 'rgba(245, 245, 245, 0.7)',
  accent: '#ff2d2d',
  accentSoft: '#ff4b4b',
  accentGlow: 'rgba(255, 45, 45, 0.35)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
  xxxl: 40,
};

export const radii = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 24,
  pill: 999,
};

export const typography = {
  size: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 26,
    xxl: 32,
    display: 40,
  },
  weight: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  } as const,
  tracking: {
    tight: -0.5,
    normal: 0,
    wide: 0.6,
  },
  lineHeight: {
    sm: 18,
    md: 22,
    lg: 28,
    xl: 34,
    display: 48,
  },
};

export type FrameSpec = {
  borderColor: string;
  accentColor: string;
  glowOpacity: number;
  cornerStyle: 'sharp' | 'rounded';
  valentineAccents?: boolean;
};

export const frames: Record<string, FrameSpec> = {
  default: {
    borderColor: 'rgba(255, 45, 45, 0.45)',
    accentColor: '#ff2d2d',
    glowOpacity: 0.2,
    cornerStyle: 'rounded',
  },
  'chapter-1': {
    borderColor: 'rgba(255, 45, 45, 0.6)',
    accentColor: '#ff3b3b',
    glowOpacity: 0.3,
    cornerStyle: 'rounded',
    valentineAccents: true,
  },
  'chapter-2': {
    borderColor: 'rgba(255, 45, 45, 0.35)',
    accentColor: '#ff2d2d',
    glowOpacity: 0.15,
    cornerStyle: 'sharp',
  },
};

export const theme = {
  colors,
  frames,
  spacing,
  radii,
  typography,
};

export type Theme = typeof theme;
