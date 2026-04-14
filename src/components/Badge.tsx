// components/Badge.tsx
// Badge label untuk produk: Terlaris, Diskon, Baru

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import { BadgeType } from '../data/products';

interface BadgeProps {
  type: BadgeType;
  discountPercent?: number;
}

export default function Badge({ type, discountPercent }: BadgeProps) {
  if (!type) return null;

  const config = {
    Terlaris: { bg: Colors.badgeTerlaris, label: '🔥 Terlaris' },
    Diskon: {
      bg: Colors.badgeDiskon,
      label: discountPercent ? `-${discountPercent}%` : 'Diskon',
    },
    Baru: { bg: Colors.badgeNew, label: '✨ Baru' },
  };

  const { bg, label } = config[type];

  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  label: {
    color: Colors.textInverse,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
