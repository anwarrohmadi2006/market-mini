// src/app/(tabs)/cart.tsx
// Halaman Keranjang Belanja

import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import Colors from '../../constants/colors';
import { useCart } from '../../context/CartContext';
import CartItem from '../../components/CartItem';
import { formatRupiah } from '../../utils/currency';
import ConfirmModal from '../../components/ConfirmModal';

const SHIPPING_FEE = 15_000;
const SERVICE_FEE = 2_000;

export default function CartScreen() {
  const { cartItems, removeFromCart, increaseQty, decreaseQty, clearCart, totalPrice, totalItems } =
    useCart();

  const [checkoutModalVisible, setCheckoutModalVisible] = useState(false);

  const grandTotal = totalPrice + (cartItems.length > 0 ? SHIPPING_FEE + SERVICE_FEE : 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    setCheckoutModalVisible(true);
  };

  // ---------------------
  // Empty state
  // ---------------------
  if (cartItems.length === 0) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
        <View style={styles.topBar}>
          <Text style={styles.screenTitle}>Keranjang Saya 🛒</Text>
        </View>
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Keranjang Kosong</Text>
          <Text style={styles.emptySubtitle}>
            Belum ada produk ditambahkan.{'\n'}Yuk mulai belanja!
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  // ---------------------
  // Summary rows
  // ---------------------
  const SummaryRow = ({
    label,
    value,
    bold,
    accent,
  }: {
    label: string;
    value: string;
    bold?: boolean;
    accent?: boolean;
  }) => (
    <View style={styles.summaryRow}>
      <Text style={[styles.summaryLabel, bold && styles.summaryBold]}>{label}</Text>
      <Text
        style={[
          styles.summaryValue,
          bold && styles.summaryBold,
          accent && styles.summaryAccent,
        ]}
      >
        {value}
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />

      {/* Top Bar */}
      <View style={styles.topBar}>
        <Text style={styles.screenTitle}>Keranjang Saya 🛒</Text>
        <TouchableOpacity onPress={clearCart} hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
          <Text style={styles.clearBtn}>Kosongkan</Text>
        </TouchableOpacity>
      </View>

      {/* Cart Items FlatList */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.product.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onIncrease={() => increaseQty(item.product.id)}
            onDecrease={() => decreaseQty(item.product.id)}
            onRemove={() => removeFromCart(item.product.id)}
          />
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <Text style={styles.itemCount}>{totalItems} produk dipilih</Text>
        }
        ListFooterComponent={
          <View style={styles.summaryCard}>
            <Text style={styles.summaryTitle}>Ringkasan Belanja</Text>
            <View style={styles.divider} />
            <SummaryRow
              label="Subtotal"
              value={formatRupiah(totalPrice)}
            />
            <SummaryRow label="Ongkos Kirim" value={formatRupiah(SHIPPING_FEE)} />
            <SummaryRow label="Biaya Layanan" value={formatRupiah(SERVICE_FEE)} />
            <View style={styles.divider} />
            <SummaryRow
              label="Total Pembayaran"
              value={formatRupiah(grandTotal)}
              bold
              accent
            />
          </View>
        }
      />

      {/* Sticky Checkout Button */}
      <View style={styles.checkoutBar}>
        <View style={styles.checkoutTotal}>
          <Text style={styles.checkoutTotalLabel}>Total</Text>
          <Text style={styles.checkoutTotalValue}>{formatRupiah(grandTotal)}</Text>
        </View>
        <TouchableOpacity
          style={styles.checkoutBtn}
          activeOpacity={0.85}
          onPress={handleCheckout}
        >
          <Text style={styles.checkoutBtnText}>Beli Sekarang ({totalItems})</Text>
        </TouchableOpacity>
      </View>

      {/* Modal: Konfirmasi Checkout */}
      <ConfirmModal
        visible={checkoutModalVisible}
        title="✅ Konfirmasi Pesanan"
        message={`Total pembayaran: ${formatRupiah(grandTotal)}\n\nLanjutkan checkout?`}
        onDismiss={() => setCheckoutModalVisible(false)}
        buttons={[
          {
            text: 'Batal',
            style: 'cancel',
            onPress: () => setCheckoutModalVisible(false),
          },
          {
            text: 'Bayar Sekarang',
            style: 'default',
            onPress: () => {
              setCheckoutModalVisible(false);
              clearCart();
            },
          },
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  screenTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  clearBtn: {
    fontSize: 13,
    color: Colors.error,
    fontWeight: '600',
  },
  itemCount: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  listContent: {
    paddingTop: 4,
    paddingBottom: 120,
  },
  // Summary
  summaryCard: {
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 14,
    padding: 16,
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
  },
  summaryTitle: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.textPrimary,
    marginBottom: 12,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: Colors.textPrimary,
    fontWeight: '600',
  },
  summaryBold: {
    fontWeight: '800',
    fontSize: 15,
    color: Colors.textPrimary,
  },
  summaryAccent: {
    color: Colors.primary,
    fontSize: 16,
  },
  // Checkout bar (sticky)
  checkoutBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: Colors.white,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    paddingBottom: 20,
    gap: 12,
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
  checkoutTotal: {
    flex: 1,
  },
  checkoutTotalLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  checkoutTotalValue: {
    fontSize: 17,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: -0.3,
  },
  checkoutBtn: {
    backgroundColor: Colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  checkoutBtnText: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: '800',
    letterSpacing: -0.2,
  },
  // Empty state
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
  },
  emptyEmoji: {
    fontSize: 64,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.textPrimary,
  },
  emptySubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 22,
  },
});
