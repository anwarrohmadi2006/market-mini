# 📱 Market Mini — Marketplace App

> React Native + Expo SDK 55 | Praktikum Mobile Programming

---

## 🚀 Cara Menjalankan

```bash
# Masuk ke folder project
cd "Market mini/market-mini"

# Install dependencies (jika belum)
npm install

# Jalankan dev server
npx expo start

# Scan QR code dengan Expo Go di HP Android/iOS
```

---

## 📁 Struktur Folder

```
market-mini/
└── src/
    ├── app/
    │   ├── _layout.tsx           # Root layout + CartProvider
    │   ├── (tabs)/
    │   │   ├── _layout.tsx       # Bottom tab navigator
    │   │   ├── index.tsx         # 🏪 Halaman Beranda
    │   │   └── cart.tsx          # 🛒 Halaman Keranjang
    │   └── product/
    │       └── [id].tsx          # 📦 Detail Produk
    ├── components/
    │   ├── PromoBanner.tsx       # Horizontal promo FlatList
    │   ├── CategoryChips.tsx     # Horizontal category chips
    │   ├── ProductCard.tsx       # Kartu produk 2-column
    │   ├── SkeletonCard.tsx      # Shimmer skeleton loading
    │   ├── CartItem.tsx          # Item baris keranjang
    │   ├── StarRating.tsx        # Bintang rating
    │   └── Badge.tsx             # Badge Terlaris/Diskon/Baru
    ├── context/
    │   └── CartContext.tsx       # Global cart state (Context API)
    ├── data/
    │   └── products.ts           # Dummy data realistis
    ├── constants/
    │   └── colors.ts             # Design tokens warna
    └── utils/
        └── currency.ts           # Format Rupiah
```

---

## ✅ Feature Checklist (Poin Praktikum)

| # | Requirement | Implementasi | File |
|---|-------------|-------------|------|
| 1 | FlatList horizontal promo banner | ✅ | `PromoBanner.tsx` |
| 2 | FlatList horizontal category chips | ✅ | `CategoryChips.tsx` |
| 3 | 2-column product FlatList grid | ✅ `numColumns={2}` | `index.tsx` |
| 4 | Loading state 2 detik | ✅ `setTimeout(2000)` | `index.tsx` |
| 5 | ActivityIndicator saat loading | ✅ | `index.tsx` |
| 6 | Skeleton shimmer loading | ✅ Animated.loop | `SkeletonCard.tsx` |
| 7 | Product card lengkap | ✅ img+nama+harga+bintang+badge | `ProductCard.tsx` |
| 8 | Tap produk buka Detail screen | ✅ `router.push('/product/id')` | `index.tsx` |
| 9 | Detail screen lengkap | ✅ hero+info+tags+deskripsi | `[id].tsx` |
| 10 | Alert "Tambah ke Keranjang" | ✅ `Alert.alert()` | `[id].tsx` |
| 11 | Cart sebagai tab terpisah | ✅ Bottom tab | `(tabs)/_layout.tsx` |
| 12 | FlatList cart items | ✅ dengan qty controls | `cart.tsx` |
| 13 | Subtotal + ongkir + total | ✅ | `cart.tsx` |
| 14 | Sticky checkout button | ✅ `position: absolute` | `cart.tsx` |
| 15 | Global cart (Context API) | ✅ | `CartContext.tsx` |
| 16 | Infinite scroll `onEndReached` | ✅ append extraProducts | `index.tsx` |
| 17 | keyExtractor dengan ID unik | ✅ tidak pakai index | semua FlatList |
| 18 | Format Rupiah Indonesia | ✅ `Rp129.000` | `currency.ts` |
| 19 | Badge cart tab (jumlah item) | ✅ | `(tabs)/_layout.tsx` |
| 20 | Wishlist icon per produk | ✅ toggle ❤️/🤍 | `ProductCard.tsx` |

---

## 📚 Jawaban Pertanyaan Analitis

### 1. Virtualisasi FlatList vs ScrollView + map()

**FlatList** menggunakan teknik virtualisasi: hanya merender komponen yang **tampak di layar** (visible window). Elemen di luar viewport dibuang dari memori dan dibuat ulang saat scroll kembali ke sana.

**ScrollView + map()** merender **semua elemen sekaligus** ke dalam DOM native, meski belum terlihat. Untuk 1000+ item, ini menyebabkan:
- Penggunaan memori tinggi
- Render awal lambat
- Jank saat scrolling

FlatList lebih efisien karena:
- Hanya `initialNumToRender` elemen aktif di awal
- `windowSize` mengontrol berapa "layar" yang dirender di sekitar viewport
- `removeClippedSubviews` membebaskan memori elemen jauh

### 2. keyExtractor dengan ID Unik vs Index Array

Jika menggunakan **index array** sebagai key, React Native tidak bisa membedakan elemen saat data berubah (filter, sort, delete). Contoh masalah:

```
Data: [A, B, C]  → keys: 0, 1, 2
Filter hapus B: [A, C] → keys: 0, 1
```

React akan mengira C adalah B (karena key="1"), sehingga state internal komponen (misal: input text, animasi) mengikut ke elemen yang salah. Dengan **ID unik** (`prod-001`, `prod-002`), React selalu tahu elemen mana yang mana, sehingga update dan animasi berjalan benar.

### 3. SectionList vs FlatList

**SectionList** tepat dipakai saat data memiliki **pengelompokan dengan header per grup**:

1. **Aplikasi marketplace** — Halaman keranjang dikelompokkan per toko (toko A: [item1, item2], toko B: [item3])
2. **Aplikasi kontak** — Daftar kontak dikelompokkan per huruf awal nama (A: [Andi, Ayu], B: [Budi, Bona])

FlatList lebih cocok untuk data homogen tanpa pengelompokan (grid produk, feed timeline).

### 4. Pentingnya Loading State untuk UX

Loading state penting karena:
- **Feedback visual** — pengguna tahu app tidak hang/freeze
- **Ekspektasi terkelola** — pengguna sabar menunggu karena tahu sedang proses
- **Kepercayaan** — app terasa profesional dan responsif

Tanpa loading state:
- Layar tampak kosong, pengguna mengira app crash
- Pengguna menekan tombol berulang (menyebabkan multiple request)
- Bounce rate meningkat karena frustasi
- Persepsi kualitas app menurun drastis

---

## 🎨 Design System

| Token | Nilai |
|-------|-------|
| Primary (accent) | `#FF4B2B` — Orange-red |
| Secondary | `#4B9EFF` — Light Blue |
| Background | `#F5F6FA` — Soft Gray |
| Surface/Card | `#FFFFFF` — White |
| Text Primary | `#1A1A2E` |
| Text Secondary | `#6B7280` |
| Star Rating | `#FBBF24` — Amber |
