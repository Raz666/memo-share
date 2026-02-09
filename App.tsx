import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { theme } from './src/theme/theme';
import CoverScreen from './src/ui/CoverScreen';
import SlideshowScreen from './src/ui/SlideshowScreen';

type Screen = 'cover' | 'slideshow';

export default function App() {
  const [screen, setScreen] = useState<Screen>('cover');

  return (
    <View style={styles.app}>
      {screen === 'cover' ? (
        <CoverScreen onStart={() => setScreen('slideshow')} />
      ) : (
        <SlideshowScreen onExit={() => setScreen('cover')} />
      )}
      <StatusBar hidden />
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
});
