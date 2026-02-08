import React from 'react';
import { StyleSheet, View } from 'react-native';

type ProgressDotsProps = {
  total: number;
  activeIndex: number;
};

export default function ProgressDots({
  total,
  activeIndex,
}: ProgressDotsProps) {
  if (total <= 0) {
    return null;
  }

  return (
    <View style={styles.row}>
      {Array.from({ length: total }).map((_, index) => {
        const isActive = index === activeIndex;
        return (
          <View
            key={`dot-${index}`}
            style={[styles.dot, isActive ? styles.dotActive : null]}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 4,
  },
  dotActive: {
    width: 9,
    height: 9,
  },
});
