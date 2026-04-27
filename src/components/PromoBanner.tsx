// components/PromoBanner.tsx
// Horizontal FlatList promo banner

import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  useWindowDimensions,
  TouchableOpacity,
} from 'react-native';
import { PromoBanner as PromoBannerType } from '../data/products';
import Colors from '../constants/colors';


interface Props {
  banners: PromoBannerType[];
}

function BannerItem({ item, bannerWidth }: { item: PromoBannerType; bannerWidth: number }) {
  return (
    <TouchableOpacity
      activeOpacity={0.92}
      style={[styles.banner, { backgroundColor: item.color, width: bannerWidth }]}
    >
      {/* Decorative circles */}
      <View
        style={[
          styles.circle,
          styles.circleTopRight,
          { borderColor: item.accentColor },
        ]}
      />
      <View
        style={[
          styles.circle,
          styles.circleBottomLeft,
          { borderColor: item.accentColor },
        ]}
      />

      <View style={styles.textArea}>
        <Text style={[styles.title, { color: item.accentColor }]}>
          {item.title}
        </Text>
        <Text style={styles.subtitle}>{item.subtitle}</Text>
        <View style={styles.ctaBtn}>
          <Text style={[styles.ctaText, { color: item.color }]}>
            Lihat Sekarang →
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function PromoBannerList({ banners }: Props) {
  const { width } = useWindowDimensions();
  const bannerWidth = width - 32;
  return (
    <FlatList
      data={banners}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <BannerItem item={item} bannerWidth={bannerWidth} />}
      horizontal
      showsHorizontalScrollIndicator={false}
      pagingEnabled
      snapToAlignment="start"
      decelerationRate="fast"
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  banner: {
    height: 140,
    borderRadius: 16,
    padding: 20,
    justifyContent: 'center',
    overflow: 'hidden',
  },
  textArea: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '900',
    letterSpacing: -0.5,
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 14,
  },
  ctaBtn: {
    backgroundColor: Colors.white,
    alignSelf: 'flex-start',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
  },
  ctaText: {
    fontSize: 12,
    fontWeight: '700',
  },
  circle: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 20,
    opacity: 0.2,
  },
  circleTopRight: {
    top: -40,
    right: -40,
  },
  circleBottomLeft: {
    bottom: -60,
    right: 40,
    width: 100,
    height: 100,
    borderRadius: 50,
  },
});
