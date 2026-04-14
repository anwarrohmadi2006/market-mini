// components/StarRating.tsx
// Menampilkan rating bintang dengan ikon

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';

interface StarRatingProps {
  rating: number;
  reviewCount?: number;
  size?: number;
  showCount?: boolean;
}

export default function StarRating({
  rating,
  reviewCount,
  size = 12,
  showCount = true,
}: StarRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalf ? 1 : 0);

  return (
    <View style={styles.container}>
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Text key={`full-${i}`} style={[styles.star, { fontSize: size }]}>
          ★
        </Text>
      ))}
      {/* Half star */}
      {hasHalf && (
        <Text style={[styles.halfStar, { fontSize: size }]}>★</Text>
      )}
      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Text key={`empty-${i}`} style={[styles.emptyStar, { fontSize: size }]}>
          ★
        </Text>
      ))}

      {showCount && reviewCount !== undefined && (
        <Text style={[styles.count, { fontSize: size - 1 }]}>
          {' '}
          ({reviewCount.toLocaleString('id-ID')})
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    color: Colors.star,
    lineHeight: 16,
  },
  halfStar: {
    color: Colors.star,
    opacity: 0.6,
    lineHeight: 16,
  },
  emptyStar: {
    color: Colors.border,
    lineHeight: 16,
  },
  count: {
    color: Colors.textSecondary,
    fontWeight: '400',
  },
});
