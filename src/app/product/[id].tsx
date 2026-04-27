// src/app/product/[id].tsx
// Halaman Detail Produk

import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';

import Colors from '../../constants/colors';
import { initialProducts, extraProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';
import { formatRupiah, discountPercent } from '../../utils/currency';
import StarRating from '../../components/StarRating';
import Badge from '../../components/Badge';
import ConfirmModal from '../../components/ConfirmModal';

const allProducts = [...initialProducts, ...extraProducts];

export default function ProductDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { addToCart } = useCart();

  // Modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const product = useMemo(
    () => allProducts.find((p) => p.id === id),
    [id]
  );

  if (!product) {
    return (
      <SafeAreaView style={styles.notFoundContainer}>
        <Text style={styles.notFoundText}>Produk tidak ditemukan</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={styles.backBtnText}>← Kembali</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  const discount = discountPercent(product.originalPrice, product.price);
  const isInteracting = React.useRef(false);

  const handleAddToCart = () => {
    if (isInteracting.current) return;
    isInteracting.current = true;
    setModalVisible(true);
  };

  const handleBuyNow = () => {
    if (isInteracting.current) return;
    isInteracting.current = true;
    addToCart(product);
    router.push('/cart');
    setTimeout(() => { isInteracting.current = false; }, 500);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Hero Image Placeholder */}
        <View style={[styles.heroImage, { backgroundColor: product.color }]}>
          <View style={styles.heroBrandCircle}>
            <Text style={styles.heroBrandText}>
              {product.brand.slice(0, 2).toUpperCase()}
            </Text>
          </View>
          {/* Discount badge overlay */}
          {discount > 0 && (
            <View style={styles.discountOverlay}>
              <Text style={styles.discountOverlayText}>-{discount}%</Text>
            </View>
          )}
        </View>

        {/* Content */}
        <View style={styles.content}>
          {/* Badge + Brand */}
          <View style={styles.topRow}>
            <Badge type={product.badge} discountPercent={discount} />
            <Text style={styles.brand}>{product.brand}</Text>
          </View>

          {/* Product Name */}
          <Text style={styles.name}>{product.name}</Text>

          {/* Price */}
          <View style={styles.priceRow}>
            <Text style={styles.price}>{formatRupiah(product.price)}</Text>
            {discount > 0 && (
              <Text style={styles.originalPrice}>
                {formatRupiah(product.originalPrice)}
              </Text>
            )}
          </View>

          {/* Rating + Sold */}
          <View style={styles.statsRow}>
            <StarRating rating={product.rating} reviewCount={product.reviewCount} size={13} />
            <Text style={styles.statsDivider}>·</Text>
            <Text style={styles.sold}>
              {product.sold.toLocaleString('id-ID')} terjual
            </Text>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Info Grid */}
          <View style={styles.infoGrid}>
            <InfoBox label="Stok" value={product.stock > 0 ? `${product.stock} tersedia` : 'Habis'} valueColor={product.stock > 0 ? Colors.success : Colors.error} />
            <InfoBox label="Kategori" value={product.category.replace('cat-', '').toUpperCase()} />
            <InfoBox label="Rating" value={`${product.rating}/5.0`} />
            <InfoBox label="Ulasan" value={product.reviewCount.toLocaleString('id-ID')} />
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Feature Tags */}
          <Text style={styles.sectionLabel}>Keunggulan Produk</Text>
          <View style={styles.tagsWrap}>
            {product.tags.map((tag) => (
              <View key={tag} style={styles.tag}>
                <Text style={styles.tagText}>✓ {tag}</Text>
              </View>
            ))}
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <Text style={styles.sectionLabel}>Deskripsi Produk</Text>
          <Text style={styles.description}>{product.description}</Text>

          {/* Spacer for sticky buttons */}
          <View style={{ height: 100 }} />
        </View>
      </ScrollView>

      {/* Sticky CTA Buttons */}
      <View style={styles.ctaBar}>
        <TouchableOpacity
          style={styles.addToCartBtn}
          activeOpacity={0.85}
          onPress={handleAddToCart}
        >
          <Text style={styles.addToCartText}>🛒 Tambah ke Keranjang</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buyNowBtn}
          activeOpacity={0.85}
          onPress={handleBuyNow}
        >
          <Text style={styles.buyNowText}>Beli Sekarang</Text>
        </TouchableOpacity>
      </View>

      {/* Modal: Konfirmasi Tambah ke Keranjang */}
      <ConfirmModal
        visible={modalVisible}
        title="🛒 Tambah ke Keranjang?"
        message={`${product.name}\n${formatRupiah(product.price)}`}
        onDismiss={() => {
          setModalVisible(false);
          isInteracting.current = false;
        }}
        buttons={[
          {
            text: 'Batal',
            style: 'cancel',
            onPress: () => {
              setModalVisible(false);
              isInteracting.current = false;
            },
          },
          {
            text: 'Tambahkan',
            style: 'default',
            onPress: () => {
              setModalVisible(false);
              addToCart(product);
              // Tampilkan modal sukses
              setTimeout(() => setSuccessModalVisible(true), 150);
            },
          },
        ]}
      />

      {/* Modal: Berhasil Ditambahkan */}
      <ConfirmModal
        visible={successModalVisible}
        title="✅ Berhasil!"
        message={`${product.name} sudah ditambahkan ke keranjang.`}
        onDismiss={() => {
          setSuccessModalVisible(false);
          isInteracting.current = false;
        }}
        buttons={[
          {
            text: 'Lanjut Belanja',
            style: 'cancel',
            onPress: () => {
              setSuccessModalVisible(false);
              isInteracting.current = false;
            },
          },
          {
            text: 'Lihat Keranjang',
            style: 'default',
            onPress: () => {
              setSuccessModalVisible(false);
              isInteracting.current = false;
              router.push('/cart');
            },
          },
        ]}
      />
    </SafeAreaView>
  );
}

function InfoBox({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <View style={styles.infoBox}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={[styles.infoValue, valueColor ? { color: valueColor } : {}]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  // Hero
  heroImage: {
    width: '100%',
    height: 280,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroBrandCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.35)',
  },
  heroBrandText: {
    color: '#fff',
    fontWeight: '900',
    fontSize: 32,
    letterSpacing: -1,
  },
  discountOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.badgeDiskon,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
  },
  discountOverlayText: {
    color: '#fff',
    fontWeight: '800',
    fontSize: 14,
  },
  // Content
  content: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -20,
    padding: 20,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.secondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  name: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    lineHeight: 26,
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 8,
  },
  price: {
    fontSize: 24,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  originalPrice: {
    fontSize: 16,
    color: Colors.textMuted,
    textDecorationLine: 'line-through',
    fontWeight: '500',
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 12,
  },
  statsDivider: {
    color: Colors.textMuted,
    fontSize: 14,
  },
  sold: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 14,
  },
  // Info grid
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  infoBox: {
    backgroundColor: Colors.background,
    borderRadius: 10,
    padding: 10,
    flex: 1,
    minWidth: '44%',
  },
  infoLabel: {
    fontSize: 11,
    color: Colors.textMuted,
    fontWeight: '600',
    marginBottom: 3,
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  infoValue: {
    fontSize: 13,
    color: Colors.textPrimary,
    fontWeight: '700',
  },
  // Tags
  sectionLabel: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 10,
  },
  tagsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  tag: {
    backgroundColor: Colors.secondaryLight,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  tagText: {
    fontSize: 12,
    color: Colors.secondary,
    fontWeight: '600',
  },
  description: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 22,
    fontWeight: '400',
  },
  // CTA
  ctaBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    gap: 10,
    ...Platform.select({
      web: {
        boxShadow: '0px -2px 8px rgba(0,0,0,0.08)',
      },
      default: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.08,
        shadowRadius: 8,
        elevation: 8,
      },
    }),
  },
  addToCartBtn: {
    flex: 1,
    borderWidth: 2,
    borderColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  addToCartText: {
    color: Colors.primary,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  buyNowBtn: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  buyNowText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  // Not found
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
    backgroundColor: Colors.background,
  },
  notFoundText: {
    fontSize: 16,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  backBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
  },
  backBtnText: {
    color: Colors.white,
    fontWeight: '700',
  },
});
