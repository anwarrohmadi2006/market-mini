// src/app/(tabs)/index.tsx
// Halaman Beranda utama marketplace

import React, { useState, useEffect, useCallback, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Keyboard,
} from 'react-native';
import { useRouter } from 'expo-router';

import Colors from '../../constants/colors';
import { Product, promoBanners, categories, initialProducts, extraProducts } from '../../data/products';
import { useCart } from '../../context/CartContext';

// Components
import PromoBannerList from '../../components/PromoBanner';
import CategoryChips from '../../components/CategoryChips';
import ProductCard from '../../components/ProductCard';
import SkeletonCard from '../../components/SkeletonCard';

// ---------------------
// Header Component
// ---------------------
function HomeHeader({ itemCount }: { itemCount: number }) {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.headerGreeting}>Halo, Pembeli! 👋</Text>
        <Text style={styles.headerTitle}>Market Mini</Text>
      </View>
      <View style={styles.headerBadgeWrap}>
        <Text style={styles.headerCartIcon}>🛒</Text>
        {itemCount > 0 && (
          <View style={styles.headerBadge}>
            <Text style={styles.headerBadgeText}>{itemCount}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

// ---------------------
// Search Bar (Functional, Memoized, Uncontrolled, Debounced)
// ---------------------
interface SearchBarProps {
  onSearch: (text: string) => void;
  onClear: () => void;
  clearTrigger: number;
}

const SearchBar = ({ onSearch, onClear, clearTrigger }: SearchBarProps) => {
  const [localQuery, setLocalQuery] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<TextInput>(null);

  // Sync state hapus dari luar untuk mereset tanpa memanggil .clear() yang bug
  useEffect(() => {
    if (clearTrigger > 0) {
      setLocalQuery('');
      Keyboard.dismiss();
    }
  }, [clearTrigger]);

  // Debouncing pencarian untuk mencegah lag & double-typing bug Samsung/Android
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(localQuery);
    }, 400); 
    return () => clearTimeout(handler);
  }, [localQuery, onSearch]);

  const handleClear = () => {
    setLocalQuery('');
    onClear();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.searchWrapper}>
      <Text style={styles.searchIcon}>🔍</Text>
      <TextInput
        ref={inputRef}
        style={styles.searchInput}
        placeholder="Cari produk, merek, kategori..."
        placeholderTextColor={Colors.textMuted}
        value={localQuery}
        onChangeText={setLocalQuery}
        onFocus={() => { setFocused(true); }}
        onBlur={() => { setFocused(false); }}
        returnKeyType="search"
        onSubmitEditing={Keyboard.dismiss}
        clearButtonMode="never"
        autoCorrect={false}
        autoCapitalize="none"
        spellCheck={false}
      />
      {localQuery.length > 0 && (
        <TouchableOpacity onPress={handleClear} hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}>
          <View style={{ width: 20, height: 20, borderRadius: 10, backgroundColor: Colors.textMuted, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: '#fff', fontSize: 10, fontWeight: '800' }}>✕</Text>
          </View>
        </TouchableOpacity>
      )}
    </View>
  );
};

// ---------------------
// Section Header
// ---------------------
function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {subtitle && <Text style={styles.sectionSubtitle}>{subtitle}</Text>}
    </View>
  );
}

// ---------------------
// List Header
// ---------------------
function ListHeader({ 
  isSearching, 
  searchQuery, 
  displayedProductsCount, 
  selectedCategory, 
  onSelectCategory 
}: any) {
  return (
    <View>
      {!isSearching && (
        <>
          <SectionTitle title="Promo Hari Ini 🔥" subtitle="Jangan sampai kehabisan!" />
          <PromoBannerList banners={promoBanners} />
          <SectionTitle title="Kategori" />
          <CategoryChips
            categories={categories}
            selectedId={selectedCategory}
            onSelect={onSelectCategory}
          />
        </>
      )}

      <View style={styles.productSectionHeader}>
        {isSearching ? (
          <View style={{ paddingHorizontal: 16, paddingTop: 14, paddingBottom: 8, backgroundColor: Colors.secondaryLight, borderBottomWidth: 1, borderBottomColor: Colors.border, marginBottom: 4 }}>
            <Text style={{ fontSize: 13, color: Colors.textSecondary, fontWeight: '500' }}>
              Hasil pencarian untuk <Text style={{ color: Colors.primary, fontWeight: '800' }}>"{searchQuery}"</Text>
            </Text>
            <Text style={{ fontSize: 12, color: Colors.textMuted, marginTop: 2 }}>{displayedProductsCount} produk ditemukan</Text>
          </View>
        ) : (
          <SectionTitle
            title={selectedCategory === 'cat-all' ? 'Semua Produk' : categories.find((c) => c.id === selectedCategory)?.name ?? 'Produk'}
            subtitle={`${displayedProductsCount} produk ditemukan`}
          />
        )}
      </View>
    </View>
  );
}

// ---------------------
// Main Screen
// ---------------------
export default function HomeScreen() {
  const router = useRouter();
  const { totalItems } = useCart();

  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('cat-all');
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [clearTrigger, setClearTrigger] = useState(0); 
  const extraLoaded = useRef(false);
  const isNavigating = useRef(false);

  // Simulasi loading 2 detik
  useEffect(() => {
    const timer = setTimeout(() => {
      setProducts(initialProducts);
      setIsLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Filter gabungan (kategori + pencarian teks)
  const isSearching = searchQuery.trim().length > 0;
  
  let displayedProducts = products;
  if (selectedCategory !== 'cat-all') {
    displayedProducts = displayedProducts.filter((p) => p.category === selectedCategory);
  }
  if (isSearching) {
    const q = searchQuery.trim().toLowerCase();
    displayedProducts = displayedProducts.filter((p) => {
      const catName = categories.find((c) => c.id === p.category)?.name.toLowerCase() || "";
      return (
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q)) ||
        catName.includes(q)
      );
    });
  }

  // Handler search bar
  const handleSearchChange = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleClearSearch = useCallback(() => {
    setSearchQuery('');
    setClearTrigger(prev => prev + 1);
    Keyboard.dismiss();
  }, []);

  // Infinite scroll
  const handleLoadMore = useCallback(() => {
    if (isLoadingMore || !hasMore || isLoading || isSearching) return;
    if (extraLoaded.current) {
      setHasMore(false);
      return;
    }
    setIsLoadingMore(true);
    setTimeout(() => {
      setProducts((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const newItems = extraProducts.filter((p) => !existingIds.has(p.id));
        return [...prev, ...newItems];
      });
      extraLoaded.current = true;
      setIsLoadingMore(false);
    }, 1200);
  }, [isLoadingMore, hasMore, isLoading, isSearching]);

  // Navigasi produk (terkunci anti-spam/multi-tap)
  const handleProductPress = useCallback(
    (product: Product) => {
      if (isNavigating.current) return;
      isNavigating.current = true;
      router.push(`/product/${product.id}`);
      setTimeout(() => { isNavigating.current = false; }, 500);
    },
    [router]
  );

  // Footer loading indicator
  const ListFooter = isLoadingMore ? (
    <View style={styles.footerLoading}>
      <ActivityIndicator size="small" color={Colors.primary} />
      <Text style={styles.footerText}>Memuat lebih banyak produk...</Text>
    </View>
  ) : !hasMore && !isSearching ? (
    <View style={styles.footerEnd}>
      <Text style={styles.footerEndText}>✓ Semua produk telah ditampilkan</Text>
    </View>
  ) : null;

  // Render utama (Memasang FlatList secara statik selamanya mematikan bug Android Unmount View)
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor={Colors.white} />
      <HomeHeader itemCount={totalItems} />
      <SearchBar onSearch={handleSearchChange} onClear={handleClearSearch} clearTrigger={clearTrigger} />

      <FlatList
        data={isLoading ? [] : displayedProducts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ProductCard product={item} onPress={handleProductPress} />
        )}
        numColumns={2}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContent}
        ListHeaderComponent={
          isLoading ? (
            <View>
              <View style={styles.loadingCenter}>
                <ActivityIndicator size="large" color={Colors.primary} />
                <Text style={styles.loadingText}>Memuat produk terbaik...</Text>
              </View>
              <View style={styles.skeletonGrid}>
                {Array.from({ length: 6 }).map((_, i) => (
                  <SkeletonCard key={`skeleton-${i}`} />
                ))}
              </View>
            </View>
          ) : (
            <ListHeader 
              isSearching={isSearching}
              searchQuery={searchQuery}
              displayedProductsCount={displayedProducts.length}
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          )
        }
        ListFooterComponent={isLoading ? null : ListFooter}
        ListEmptyComponent={
          isLoading ? null : (
            <View style={styles.emptyWrap}>
              {isSearching ? (
                <>
                  <Text style={styles.emptyIcon}>🔍</Text>
                  <Text style={{ fontSize: 16, fontWeight: '800', color: Colors.textPrimary }}>Produk tidak ditemukan</Text>
                  <Text style={styles.emptyText}>Tidak ada hasil untuk "{searchQuery}"</Text>
                  <TouchableOpacity style={{ marginTop: 12, backgroundColor: Colors.primary, paddingHorizontal: 20, paddingVertical: 10, borderRadius: 20 }} onPress={handleClearSearch}>
                    <Text style={{ color: Colors.white, fontSize: 13, fontWeight: '700' }}>Hapus Pencarian</Text>
                  </TouchableOpacity>
                </>
              ) : (
                <>
                  <Text style={styles.emptyIcon}>😔</Text>
                  <Text style={styles.emptyText}>Tidak ada produk di kategori ini</Text>
                </>
              )}
            </View>
          )
        }
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={false} // Aturan absolut untuk menghindari bug geser Native
        initialNumToRender={8}
        maxToRenderPerBatch={6}
        windowSize={5}
        keyboardShouldPersistTaps="handled"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 8,
    backgroundColor: Colors.white,
  },
  headerGreeting: {
    fontSize: 12,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: Colors.primary,
    letterSpacing: -0.5,
  },
  headerBadgeWrap: {
    position: 'relative',
  },
  headerCartIcon: {
    fontSize: 26,
  },
  headerBadge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: Colors.primary,
    borderRadius: 9,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  headerBadgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
  // Search
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    marginHorizontal: 16,
    marginBottom: 8,
    marginTop: 4,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    height: 44,
    gap: 8,
  },
  searchIcon: {
    fontSize: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: Colors.textPrimary,
  },
  // Loading
  loadingCenter: {
    alignItems: 'center',
    paddingVertical: 20,
    gap: 8,
  },
  loadingText: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  skeletonGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 16,
    gap: 12,
    justifyContent: 'space-between',
    paddingTop: 8,
  },
  // List
  listContent: {
    paddingBottom: 24,
  },
  row: {
    paddingHorizontal: 16,
    gap: 12,
    justifyContent: 'space-between',
  },
  // Section
  sectionHeader: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: Colors.textPrimary,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  productSectionHeader: {
    backgroundColor: Colors.background,
    marginTop: 8,
  },
  // Footer
  footerLoading: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  footerText: {
    fontSize: 13,
    color: Colors.textSecondary,
  },
  footerEnd: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  footerEndText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  // Empty
  emptyWrap: {
    alignItems: 'center',
    paddingVertical: 40,
    gap: 10,
  },
  emptyIcon: {
    fontSize: 40,
  },
  emptyText: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
});
