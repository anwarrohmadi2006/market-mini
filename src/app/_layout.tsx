// app/_layout.tsx
// Root layout dengan CartProvider

import { Stack } from 'expo-router';
import { CartProvider } from '../context/CartContext';

export default function RootLayout() {
  return (
    <CartProvider>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen
          name="product/[id]"
          options={{
            headerShown: true,
            headerTitle: 'Detail Produk',
            headerTintColor: '#FF4B2B',
            headerBackTitle: 'Kembali',
            headerStyle: { backgroundColor: '#fff' },
            headerShadowVisible: false,
            presentation: 'card',
          }}
        />
      </Stack>
    </CartProvider>
  );
}
