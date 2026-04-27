// components/SkeletonCard.tsx
// Shimmer skeleton loading placeholder untuk ProductCard

import React, { useEffect, useRef } from 'react';
import { View, Animated, StyleSheet, useWindowDimensions, Platform } from 'react-native';
import Colors from '../constants/colors';


export default function SkeletonCard() {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [shimmerAnim]);

  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.4, 0.9],
  });

  return (
    <Animated.View style={[styles.card, { width: cardWidth, opacity }]}>
      {/* Image placeholder */}
      <View style={styles.imagePlaceholder} />
      {/* Badge placeholder */}
      <View style={[styles.line, { width: 60, height: 14, marginTop: 10 }]} />
      {/* Title placeholder */}
      <View style={[styles.line, { width: '90%', height: 12, marginTop: 8 }]} />
      <View style={[styles.line, { width: '70%', height: 12, marginTop: 4 }]} />
      {/* Price placeholder */}
      <View style={[styles.line, { width: '55%', height: 16, marginTop: 8 }]} />
      {/* Rating placeholder */}
      <View style={[styles.line, { width: '80%', height: 10, marginTop: 6 }]} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 6px rgba(0,0,0,0.08)',
      },
      default: {
        shadowColor: Colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 1,
        shadowRadius: 6,
        elevation: 3,
      },
    }),
  },
  imagePlaceholder: {
    width: '100%',
    height: 130,
    backgroundColor: Colors.skeletonBase,
    borderRadius: 8,
  },
  line: {
    backgroundColor: Colors.skeletonBase,
    borderRadius: 4,
  },
});
