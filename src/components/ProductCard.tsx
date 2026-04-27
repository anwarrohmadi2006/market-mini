// components/ProductCard.tsx
// Kartu produk 2-column untuk grid FlatList

import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useWindowDimensions,
  Platform,
} from 'react-native';
import Colors from '../constants/colors';
import { Product } from '../data/products';
import { formatRupiah, discountPercent } from '../utils/currency';
import Badge from './Badge';
import StarRating from './StarRating';


interface Props {
  product: Product;
  onPress: (product: Product) => void;
}

export default function ProductCard({ product, onPress }: Props) {
  const { width } = useWindowDimensions();
  const cardWidth = (width - 48) / 2;
  const [wished, setWished] = useState(false);
  const discount = discountPercent(product.originalPrice, product.price);

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      activeOpacity={0.88}
      onPress={() => onPress(product)}
    >
      {/* Placeholder image dengan warna produk */}
      <View style={[styles.imagePlaceholder, { backgroundColor: product.color }]}>
        {/* Wishlist button */}
        <TouchableOpacity
          style={styles.wishlistBtn}
          onPress={() => setWished((w) => !w)}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Text style={[styles.wishlistIcon, wished && styles.wishedIcon]}>
            {wished ? '❤️' : '🤍'}
          </Text>
        </TouchableOpacity>

        {/* Product brand initial overlay */}
        <View style={styles.brandOverlay}>
          <Text style={styles.brandText}>{product.brand.slice(0, 2).toUpperCase()}</Text>
        </View>
      </View>

      <View style={styles.info}>
        {/* Badge */}
        <Badge type={product.badge} discountPercent={discount} />

        {/* Product name */}
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>

        {/* Price */}
        <Text style={styles.price}>{formatRupiah(product.price)}</Text>

        {/* Original price if discounted */}
        {discount > 0 && (
          <Text style={styles.originalPrice}>
            {formatRupiah(product.originalPrice)}
          </Text>
        )}

        {/* Rating */}
        <View style={styles.ratingRow}>
          <StarRating rating={product.rating} size={10} showCount={false} />
          <Text style={styles.ratingText}>
            {product.rating} · {product.sold.toLocaleString('id-ID')} terjual
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      web: {
        boxShadow: '0px 2px 8px rgba(0,0,0,0.07)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.07,
        shadowRadius: 8,
        elevation: 3,
      },
    }),
    overflow: 'hidden',
  },
  imagePlaceholder: {
    width: '100%',
    height: 130,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistBtn: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255,255,255,0.85)',
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  wishlistIcon: {
    fontSize: 14,
  },
  wishedIcon: {
    fontSize: 14,
  },
  brandOverlay: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  brandText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 18,
    letterSpacing: -0.5,
  },
  info: {
    padding: 10,
    gap: 4,
  },
  name: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 17,
    marginTop: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
    marginTop: 2,
  },
  originalPrice: {
    fontSize: 11,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  ratingText: {
    fontSize: 10,
    color: Colors.textSecondary,
  },
});
