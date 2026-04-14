// utils/currency.ts
// Format angka ke format Rupiah Indonesia: Rp129.000

export function formatRupiah(price: number): string {
  return (
    'Rp' +
    price.toLocaleString('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
  );
}

export function formatShortRupiah(price: number): string {
  if (price >= 1_000_000) {
    return 'Rp' + (price / 1_000_000).toFixed(1).replace('.', ',') + 'jt';
  }
  if (price >= 1_000) {
    return 'Rp' + (price / 1_000).toFixed(0) + 'rb';
  }
  return formatRupiah(price);
}

export function discountPercent(original: number, sale: number): number {
  if (original <= sale) return 0;
  return Math.round(((original - sale) / original) * 100);
}
