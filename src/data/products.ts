// data/products.ts
// Dummy data realistis untuk marketplace Indonesia

export type BadgeType = 'Terlaris' | 'Diskon' | 'Baru' | null;

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  sold: number;
  stock: number;
  category: string;
  badge: BadgeType;
  color: string; // Warna background placeholder image
  description: string;
  tags: string[];
}

export interface PromoBanner {
  id: string;
  title: string;
  subtitle: string;
  color: string;
  accentColor: string;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
}

// ---------------------
// PROMO BANNERS
// ---------------------
export const promoBanners: PromoBanner[] = [
  {
    id: 'promo-001',
    title: 'FLASH SALE 12.12',
    subtitle: 'Diskon hingga 70% produk pilihan',
    color: '#FF4B2B',
    accentColor: '#FFD700',
  },
  {
    id: 'promo-002',
    title: 'GRATIS ONGKIR',
    subtitle: 'Ke seluruh Indonesia tanpa minimum pembelian',
    color: '#1D4ED8',
    accentColor: '#60A5FA',
  },
  {
    id: 'promo-003',
    title: 'PRODUK LOKAL',
    subtitle: 'Bangga buatan Indonesia, harga terbaik',
    color: '#15803D',
    accentColor: '#86EFAC',
  },
  {
    id: 'promo-004',
    title: 'BAYAR NANTI',
    subtitle: 'Cicilan 0% hingga 24 bulan semua bank',
    color: '#7C3AED',
    accentColor: '#C4B5FD',
  },
];

// ---------------------
// CATEGORIES
// ---------------------
export const categories: Category[] = [
  { id: 'cat-all', name: 'Semua', icon: '🏪' },
  { id: 'cat-electronics', name: 'Elektronik', icon: '📱' },
  { id: 'cat-fashion', name: 'Fashion', icon: '👗' },
  { id: 'cat-food', name: 'Makanan', icon: '🍜' },
  { id: 'cat-sports', name: 'Olahraga', icon: '⚽' },
  { id: 'cat-beauty', name: 'Kecantikan', icon: '💄' },
  { id: 'cat-home', name: 'Rumah Tangga', icon: '🏠' },
];

// ---------------------
// PRODUCTS
// ---------------------
export const initialProducts: Product[] = [
  {
    id: 'prod-001',
    name: 'Xiaomi Redmi Note 13 Pro 8/256GB',
    brand: 'Xiaomi',
    price: 2_899_000,
    originalPrice: 3_499_000,
    rating: 4.8,
    reviewCount: 2341,
    sold: 15200,
    stock: 87,
    category: 'cat-electronics',
    badge: 'Terlaris',
    color: '#1D4ED8',
    description:
      'Smartphone terlaris dengan kamera 200MP, layar AMOLED 120Hz, dan baterai 5000mAh. Performa gahar untuk harga terjangkau.',
    tags: ['5G', 'AMOLED', '200MP', 'Fast Charge 67W'],
  },
  {
    id: 'prod-002',
    name: 'Batik Pria Premium Motif Mega Mendung',
    brand: 'Batik Keris',
    price: 189_000,
    originalPrice: 250_000,
    rating: 4.6,
    reviewCount: 892,
    sold: 4320,
    stock: 150,
    category: 'cat-fashion',
    badge: 'Diskon',
    color: '#7C3AED',
    description:
      'Kemeja batik premium bahan katun halus, motif Mega Mendung khas Cirebon. Cocok untuk acara formal dan semi-formal.',
    tags: ['Katun Premium', 'Anti Kusut', 'Slim Fit'],
  },
  {
    id: 'prod-003',
    name: 'Indomie Goreng Special 40 Pack',
    brand: 'Indomie',
    price: 89_000,
    originalPrice: 95_000,
    rating: 4.9,
    reviewCount: 12500,
    sold: 98700,
    stock: 500,
    category: 'cat-food',
    badge: 'Terlaris',
    color: '#EA580C',
    description:
      'Indomie Goreng rasa spesial, paket isi 40 bungkus. Mi instan legendaris Indonesia favorit semua kalangan.',
    tags: ['Halal', 'Pack Hemat', 'No Pengawet'],
  },
  {
    id: 'prod-004',
    name: 'Sepatu Lari Specs Adrenaline 2025',
    brand: 'Specs',
    price: 449_000,
    originalPrice: 599_000,
    rating: 4.5,
    reviewCount: 678,
    sold: 3200,
    stock: 45,
    category: 'cat-sports',
    badge: 'Diskon',
    color: '#15803D',
    description:
      'Sepatu lari lokal berkualitas internasional. Teknologi CushFoam untuk bantalan maksimal dan grip kuat di berbagai permukaan.',
    tags: ['CushFoam', 'Anti-Slip', 'Breathable', 'Lokal Indonesia'],
  },
  {
    id: 'prod-005',
    name: 'Serum Vitamin C MS Glow 30ml',
    brand: 'MS Glow',
    price: 175_000,
    originalPrice: 175_000,
    rating: 4.7,
    reviewCount: 5432,
    sold: 28900,
    stock: 320,
    category: 'cat-beauty',
    badge: 'Terlaris',
    color: '#F59E0B',
    description:
      'Serum wajah vitamin C konsentrasi tinggi untuk mencerahkan dan meratakan tone kulit. Dermatologically tested.',
    tags: ['Vit C 20%', 'BPOM', 'Halal', 'All Skin Type'],
  },
  {
    id: 'prod-006',
    name: 'Samsung Galaxy A55 5G 8/256GB',
    brand: 'Samsung',
    price: 4_299_000,
    originalPrice: 4_999_000,
    rating: 4.7,
    reviewCount: 1876,
    sold: 9800,
    stock: 134,
    category: 'cat-electronics',
    badge: 'Baru',
    color: '#0891B2',
    description:
      'Samsung Galaxy A55 5G dengan layar Super AMOLED 120Hz, kamera triple 50MP, dan chipset Exynos 1480 terbaru.',
    tags: ['5G', 'Super AMOLED', 'IP67', 'OIS'],
  },
  {
    id: 'prod-007',
    name: 'Tas Ransel Eiger Daypack 25L',
    brand: 'Eiger',
    price: 329_000,
    originalPrice: 420_000,
    rating: 4.6,
    reviewCount: 1234,
    sold: 6700,
    stock: 78,
    category: 'cat-fashion',
    badge: 'Diskon',
    color: '#166534',
    description:
      'Ransel outdoor premium kapasitas 25L, bahan waterproof ripstop nylon, dilengkapi kompartemen laptop 15 inci.',
    tags: ['Waterproof', 'Slot Laptop 15"', 'MOLLE System'],
  },
  {
    id: 'prod-008',
    name: 'Rice Cooker Cosmos CRJ-3301 1.8L',
    brand: 'Cosmos',
    price: 249_000,
    originalPrice: 299_000,
    rating: 4.4,
    reviewCount: 3421,
    sold: 14500,
    stock: 230,
    category: 'cat-home',
    badge: null,
    color: '#DC2626',
    description:
      'Rice cooker kapasitas 1.8L untuk kebutuhan keluarga. Mode memasak, menghangatkan, dan steam otomatis. Hemat listrik.',
    tags: ['Inner Pot Anti Lengket', 'Keep Warm', 'Auto Cook'],
  },
  {
    id: 'prod-009',
    name: 'Teh Botol Sosro 1 Liter 12 Pcs',
    brand: 'Sosro',
    price: 95_000,
    originalPrice: 108_000,
    rating: 4.8,
    reviewCount: 8900,
    sold: 45000,
    stock: 400,
    category: 'cat-food',
    badge: 'Terlaris',
    color: '#92400E',
    description:
      'Teh botol Sosro minuman teh asli rasa original, tanpa pengawet buatan. Paket 12 botol 1 liter lebih hemat.',
    tags: ['No Pengawet', 'Original', 'Pack Hemat'],
  },
  {
    id: 'prod-010',
    name: 'JBL Tune 520BT Wireless Headphone',
    brand: 'JBL',
    price: 599_000,
    originalPrice: 799_000,
    rating: 4.5,
    reviewCount: 2103,
    sold: 7600,
    stock: 56,
    category: 'cat-electronics',
    badge: 'Diskon',
    color: '#4F46E5',
    description:
      'Headphone Bluetooth JBL dengan suara bass powerful, baterai 57 jam, dan fitur hands-free call.',
    tags: ['57 Jam Baterai', 'Foldable', 'JBL Pure Bass', 'Multipoint'],
  },
  {
    id: 'prod-011',
    name: 'Handbody Vaseline Healthy Bright 400ml',
    brand: 'Vaseline',
    price: 42_000,
    originalPrice: 55_000,
    rating: 4.6,
    reviewCount: 9870,
    sold: 62000,
    stock: 800,
    category: 'cat-beauty',
    badge: 'Terlaris',
    color: '#2563EB',
    description:
      'Body lotion Vaseline dengan formula Healthy Bright untuk kulit cerah dan lembab sepanjang hari.',
    tags: ['UV Brightening', 'SPF 10', 'Non-Greasy'],
  },
  {
    id: 'prod-012',
    name: 'Badminton Racket Li-Ning Windstorm 74',
    brand: 'Li-Ning',
    price: 875_000,
    originalPrice: 1_100_000,
    rating: 4.7,
    reviewCount: 445,
    sold: 1800,
    stock: 23,
    category: 'cat-sports',
    badge: 'Baru',
    color: '#B91C1C',
    description:
      'Raket bulutangkis karbon premium Li-Ning, ringan 74 gram dengan shaft kaku untuk smash maksimal.',
    tags: ['Carbon Fiber', '74 Gram', 'Shaft Kaku', 'Pro Level'],
  },
];

// ---------------------
// MORE PRODUCTS untuk infinite scroll
// ---------------------
export const extraProducts: Product[] = [
  {
    id: 'prod-013',
    name: 'Laptop ASUS Vivobook 14 Ryzen 5',
    brand: 'ASUS',
    price: 7_299_000,
    originalPrice: 8_499_000,
    rating: 4.6,
    reviewCount: 987,
    sold: 3400,
    stock: 18,
    category: 'cat-electronics',
    badge: 'Diskon',
    color: '#1E3A5F',
    description:
      'Laptop ASUS Vivobook tipis dan ringan dengan AMD Ryzen 5, RAM 8GB, SSD 512GB. Ideal untuk kerja dan kuliah.',
    tags: ['Ryzen 5', 'SSD 512GB', 'Full HD IPS', 'Fingerprint'],
  },
  {
    id: 'prod-014',
    name: 'Celana Chino Panjang Slim Fit',
    brand: 'Nevada',
    price: 159_000,
    originalPrice: 199_000,
    rating: 4.4,
    reviewCount: 2310,
    sold: 8900,
    stock: 200,
    category: 'cat-fashion',
    badge: null,
    color: '#78350F',
    description:
      'Celana chino bahan stretch premium, nyaman dipakai seharian. Tersedia dalam berbagai warna netral.',
    tags: ['Stretch', 'Slim Fit', 'Anti Kusut'],
  },
  {
    id: 'prod-015',
    name: 'Kopi Kapal Api Special 380gr',
    brand: 'Kapal Api',
    price: 32_000,
    originalPrice: 36_000,
    rating: 4.9,
    reviewCount: 15600,
    sold: 120000,
    stock: 1000,
    category: 'cat-food',
    badge: 'Terlaris',
    color: '#44150A',
    description:
      'Kopi bubuk legendaris Indonesia dengan cita rasa khas dan aroma yang kuat. Cocok untuk pagi hari.',
    tags: ['Robusta Pilihan', 'Aroma Kuat', 'Halal'],
  },
  {
    id: 'prod-016',
    name: 'Smartwatch HUAWEI Band 9',
    brand: 'HUAWEI',
    price: 499_000,
    originalPrice: 599_000,
    rating: 4.5,
    reviewCount: 1230,
    sold: 5600,
    stock: 67,
    category: 'cat-electronics',
    badge: 'Baru',
    color: '#083344',
    description:
      'Smartwatch tipis dengan monitor detak jantung, SpO2, dan 100+ mode olahraga. Baterai tahan 14 hari.',
    tags: ['14 Hari Baterai', 'SpO2', 'Waterproof 5ATM'],
  },
];
