import React from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from '../theme/theme';

type FrameOverlayProps = {
  frameKey: string;
};

const FRAME_INSET = 20;

export default function FrameOverlay({ frameKey }: FrameOverlayProps) {
  const spec = theme.frames[frameKey] ?? theme.frames.default;
  const cornerRadius =
    spec.cornerStyle === 'rounded' ? theme.radii.md : theme.radii.sm;

  return (
    <View pointerEvents="none" style={styles.overlay}>
      <View
        style={[
          styles.frameBase,
          {
            margin: FRAME_INSET,
            borderColor: spec.borderColor,
            borderRadius: cornerRadius,
          },
        ]}
      />
      {spec.valentineAccents ? (
        <View
          style={[
            styles.innerFrame,
            {
              margin: FRAME_INSET + 10,
              borderColor: spec.borderColor,
              borderRadius: theme.radii.sm,
            },
          ]}
        />
      ) : null}
      <View
        style={[
          styles.corner,
          styles.cornerTopLeft,
          { margin: FRAME_INSET, borderColor: spec.accentColor },
        ]}
      />
      <View
        style={[
          styles.corner,
          styles.cornerTopRight,
          { margin: FRAME_INSET, borderColor: spec.accentColor },
        ]}
      />
      <View
        style={[
          styles.corner,
          styles.cornerBottomLeft,
          { margin: FRAME_INSET, borderColor: spec.accentColor },
        ]}
      />
      <View
        style={[
          styles.corner,
          styles.cornerBottomRight,
          { margin: FRAME_INSET, borderColor: spec.accentColor },
        ]}
      />
      <View
        style={[
          styles.glow,
          {
            margin: FRAME_INSET - 2,
            borderColor: spec.accentColor,
            opacity: spec.glowOpacity,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  frameBase: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
  },
  innerFrame: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
  },
  corner: {
    position: 'absolute',
    width: 18,
    height: 18,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderLeftWidth: 2,
    borderTopWidth: 2,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderRightWidth: 2,
    borderTopWidth: 2,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderRightWidth: 2,
    borderBottomWidth: 2,
  },
  glow: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1,
  },
});
