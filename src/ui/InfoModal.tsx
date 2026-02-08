import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { theme } from '../theme/theme';

type InfoModalProps = {
  visible: boolean;
  details: string;
  onClose: () => void;
};

export default function InfoModal({
  visible,
  details,
  onClose,
}: InfoModalProps) {
  if (!visible) {
    return null;
  }

  return (
    <View style={styles.overlay} pointerEvents="box-none">
      <Pressable style={styles.backdrop} onPress={onClose} />
      <Pressable
        style={styles.bubbleWrap}
        onPress={(event) => event.stopPropagation()}
      >
        <View style={styles.bubble}>
          <Text style={styles.text}>{details}</Text>
          <View style={styles.tail} />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
  },
  bubbleWrap: {
    position: 'absolute',
    right: theme.spacing.xl + 4,
    bottom: theme.spacing.xl + 56,
    width: '65%',
    maxWidth: 520,
    alignItems: 'flex-end',
  },
  bubble: {
    backgroundColor: theme.colors.card,
    paddingHorizontal: theme.spacing.xl,
    paddingVertical: theme.spacing.lg,
    borderRadius: theme.radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(255, 45, 45, 0.35)',
  },
  text: {
    color: theme.colors.text,
    fontSize: theme.typography.size.md,
    lineHeight: theme.typography.lineHeight.md,
  },
  tail: {
    position: 'absolute',
    bottom: -8,
    right: 18,
    width: 14,
    height: 14,
    backgroundColor: theme.colors.card,
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: 'rgba(255, 45, 45, 0.35)',
    transform: [{ rotate: '-45deg' }],
  },
});
