# Arsitektur Aplikasi Market Mini

Aplikasi **Market Mini** dirancang untuk menjadi dasar *prototype* e-commerce seluler yang stabil, skalabel, dan ramah-pengembang. Menggunakan **React Native** bersama **Expo Router (SDK 55)**, Market Mini menyajikan antarmuka *marketplace* modern yang sangat tanggap terhadap ekosistem sistem operasi Android maupun iOS.

Dokumen ini merangkum konvensi arsitektur, hierarki Folder, Pola Desain (*Design Patterns*), dan solusi-solusi praktis (*best-practices*) untuk tantangan platform dalam Market Mini.

---

## 🏗️ 1. Tinjauan Stack Teknologi
- **Framework Utama**: React Native + Expo SDK 55
- **Konsep Navigasi**: Expo Router berbasis-file (*File-based Routing*) menyerupai Next.js.
- **Bahasa**: TypeScript (Statik / Cek pengetikan ketat).
- **Manajemen State Global**: React `Context API` (Mengisolasi logika keranjang *Cart* agar bersih dan tidak memadati layar).
- **Styling**: `StyleSheet` bawaan React Native.

---

## 📂 2. Hierarki dan Topologi Folder

Direktori sistem dirancang modular untuk memisahkan tanggung jawab ( *Separation of Concerns* ).
Seluruh kode diletakkan di dalam folder `/src`:

```text
src/
├── app/                  # Rute Halaman (Expo Router)
│   ├── _layout.tsx       # Root Selector & Stack Navigator Utama
│   ├── (tabs)/           # Grup Navigasi Bawah (Bottom Tabs)
│   │   ├── _layout.tsx   # Perantara UI Tab Bar
│   │   ├── index.tsx     # Layar 1 (Beranda Utama / Search / List)
│   │   └── cart.tsx      # Layar 2 (Daftar Keranjang Belanja)
│   └── product/          
│       └── [id].tsx      # Halaman Detail Produk Dinamis (Dynamic Route)
│
├── components/           # Satuan UI (Dapat Digunakan Ulang / Reusable)
│   ├── ProductCard.tsx   # Kartu Representasi Produk (Grid List)
│   ├── CategoryChips.tsx # Komponen Pilihan Kategori Horisontal
│   ├── CartItem.tsx      # Representasi Baris Item Keranjang
│   ├── SearchBar.tsx     # (Internal di dalam index) Input Pencarian
│   └── SkeletonCard.tsx  # Kerangka Animasi Loading
│
├── context/              # Penyimpanan State Tertinggi
│   └── CartContext.tsx   # Tempat menempelkan keranjang barang secara global
│
├── data/                 # Penyedia Informasi Mentah (Placeholder)
│   └── products.ts       # Database statis JSON-like & Katalog Produk Utama
│
├── constants/            # Penampung Nilai Mutlak
│   └── colors.ts         # Palet Tema Warna yang dapat disesuaikan (Customizable)
│
└── utils/                # Fungsi Murni Non-React
    └── currency.ts       # Format Rupiah (Rp)
```

---

## 💡 3. Pola Aliran State (State Flow Patterns)

### A. Manajemen Keranjang (CartContext)
Aplikasi memanfaatkan strategi _Provider Pattern_ murni melalui `CartContext`. Akses logika berbelanja dialihkan dari *Screen* menuju *Hooks*:
- `useCart()` menyediakan akses langsung ke daftar `cartItems`.
- `totalItems` dikalkulasi secara otomatis secara real-time tanpa perlu *prop drilling*.
- Fungsi manipulasi: `addToCart`, `removeFromCart`, `updateQuantity`, dan `clearCart` ditangani tuntas di dalam ruang kerja Konteks.

### B. List Skeletons ke ListData (`/app/(tabs)/index.tsx`)
Pola pemuatan layar utama telah dioptimalkan secara arsitektural. Kami **menghindari menukar Native View Core** dengan FlatList (*Layout Swapping*) guna menjaga kemulusan memori aplikasi:
- **Konsep Tepat**: `<FlatList>` langsung di-*render* dari hitungan milidetik pertama Layar Beranda aktif. 
- **Pemuatan Header**: Sambil menunggu pengiriman produk, daftar kerangka (*Skeletons*) hanya dipasang melalui `ListHeaderComponent`. Setelah pemuatan (*loading*) usai senilai 2 detik, sistem memicu penggantian isi *header* dan memunculkan `data` murni secara halus tanpa mengubah instrumen gulir akar milik Android.

---

## 🔒 4. Keamanan Stabilitas Layout (Anti-Bug / Expo Best Practices)
Kode Market Mini mematuhi kaidah platform tertingkat di React Native untuk menghindari kesalahan aneh *(Android quirks)* yang awam terjadi pada arsitektur E-Commerce:

1. **Uncontrolled Search Input** (Mencegah "Double Character Typing Bug"):
   - *TextInput* untuk formulir Pencarian sengaja dilepas kontrolnya *(uncontrolled via `defaultValue` statis/tanpa `value`)* ATAU menggunakan *value* tanpa `clear()` instruksi eksternal. Kami menghentikan perang antara *predictive/Samsung Keyboard* dengan *Virtual DOM* React Native di milidetik yang sama.

2. **Debouncing Algorithmic Filtering** (Search Lag Fix):
   - Menerapkan siklus perlambatan buatan (`setTimeout` 400ms) saat mengetik kata kunci sebelum memaksa komponen raksasa merevisi diri. Menyaring (*filtering*) tidak memblokir antarmuka saat user sedang aktif mengetik sentuhan cepat.

3. **No-Phantom Focus** (Perbaikan "Keyboard Tiba-Tiba Muncul"):
   - Kami menghilangkan eksekusi destruktif `inputRef.current?.clear()` ketika membersihkan pencarian. Penekanan memori teks cukup diset *empty text* untuk membuang interupsi fokus paksaan yang ditafsir OS Android.

4. **Multi-Tap Screen Locks** (Spam Navigasi):
   - Tombol-tombol kartu produk dan konfirmasi krusial diamankan dengan `React.useRef`. Saat pengguna menekan "Buka Detail Produk", sistem masuk ke mode tidur selama *500ms* secara absolut. Hal ini mencegah *Expo Router* menjebol/mendorong layar navigasi hingga melapis ke 5 tumpukan identik jika diserang sentuhan ganda oleh pengguna.

5. **Kinerja Virtualization Daftar Panjang (`FlatList`)**:
   - Mencegah `removeClippedSubviews` secara mutlak agar tidak merusak penyusunan pergeseran daftar di Android.
   - Pemanfaatkan `useMemo` pada hasil sortir filter, mencegah mesin menyaring ulang *Database JSON Lokal* jika `SelectedCategory` & `SearchQuery` tak berubah sama sekali!

---

Dokumen ini diharapkan menjadi titik mula kokoh bila platform Market Mini hendak disambung dengan layanan antarmuka API eksternal jarak jauh semisal *Node.JS*, *Supabase*, atau *Firebase* di masa mendatang. Pengembang kelak cuma berhak mengubah logika letak fetchings di dalam `useEffect`. Keseluruhan antarmuka E-Commerce dijamin tetap halus.
