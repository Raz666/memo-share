import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import type { GestureResponderEvent } from 'react-native';
import { Info } from 'lucide-react-native';

import { theme } from '../theme/theme';

type InfoBubbleProps = {
  visible: boolean;
  hudVisible: boolean;
  onPress: (event: GestureResponderEvent) => void;
};

export default function InfoBubble({
  visible,
  hudVisible,
  onPress,
}: InfoBubbleProps) {
  if (!visible) {
    return null;
  }

  return (
    <Pressable
      style={[styles.container, { opacity: hudVisible ? 1 : 0.2 }]}
      onPress={onPress}
      hitSlop={8}
    >
      <Info size={22} color={theme.colors.accent} strokeWidth={2} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: theme.spacing.xl + 12,
    bottom: theme.spacing.xl + 12,
    padding: theme.spacing.sm,
  },
});
