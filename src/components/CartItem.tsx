// components/CartItem.tsx
// Satu baris item di halaman Keranjang

import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import Colors from '../constants/colors';
import { CartItem as CartItemType } from '../context/CartContext';
import { formatRupiah } from '../utils/currency';

interface Props {
  item: CartItemType;
  onIncrease: () => void;
  onDecrease: () => void;
  onRemove: () => void;
}

export default function CartItem({ item, onIncrease, onDecrease, onRemove }: Props) {
  const { product, quantity } = item;

  return (
    <View style={styles.container}>
      {/* Colored image placeholder */}
      <View style={[styles.image, { backgroundColor: product.color }]}>
        <Text style={styles.imageText}>{product.brand.slice(0, 2).toUpperCase()}</Text>
      </View>

      {/* Product info */}
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {product.name}
        </Text>
        <Text style={styles.price}>{formatRupiah(product.price)}</Text>

        {/* Qty controls */}
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease}>
            <Text style={styles.qtyBtnText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{quantity}</Text>
          <TouchableOpacity style={[styles.qtyBtn, styles.qtyBtnAdd]} onPress={onIncrease}>
            <Text style={[styles.qtyBtnText, { color: Colors.white }]}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Remove button */}
      <TouchableOpacity style={styles.removeBtn} onPress={onRemove} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
        <Text style={styles.removeIcon}>✕</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.card,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 16,
    marginBottom: 10,
    ...Platform.select({
      web: {
        boxShadow: '0px 1px 4px rgba(0,0,0,0.06)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.06,
        shadowRadius: 4,
        elevation: 2,
      },
    }),
    alignItems: 'flex-start',
  },
  image: {
    width: 72,
    height: 72,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  imageText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 20,
  },
  info: {
    flex: 1,
    marginLeft: 12,
    gap: 4,
  },
  name: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textPrimary,
    lineHeight: 18,
  },
  price: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primary,
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 4,
  },
  qtyBtn: {
    width: 28,
    height: 28,
    borderRadius: 8,
    backgroundColor: Colors.borderLight,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  qtyBtnAdd: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.textPrimary,
    lineHeight: 20,
  },
  qty: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.textPrimary,
    minWidth: 20,
    textAlign: 'center',
  },
  removeBtn: {
    paddingLeft: 8,
    paddingTop: 2,
  },
  removeIcon: {
    fontSize: 14,
    color: Colors.textMuted,
    fontWeight: '600',
  },
});
