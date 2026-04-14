// src/app/(tabs)/_layout.tsx
// Bottom tab navigation: Beranda & Keranjang

import { Tabs } from 'expo-router';
import { View, Text, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import { useCart } from '../../context/CartContext';

function TabBarIcon({ emoji, focused }: { emoji: string; focused: boolean }) {
  return (
    <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.65 }}>
      {emoji}
    </Text>
  );
}

function CartTabIcon({ focused }: { focused: boolean }) {
  const { totalItems } = useCart();
  return (
    <View style={styles.iconWrapper}>
      <Text style={{ fontSize: focused ? 22 : 20, opacity: focused ? 1 : 0.65 }}>
        🛒
      </Text>
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>
            {totalItems > 99 ? '99+' : totalItems}
          </Text>
        </View>
      )}
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarStyle: {
          backgroundColor: Colors.white,
          borderTopColor: Colors.border,
          borderTopWidth: 1,
          height: 60,
          paddingBottom: 8,
          paddingTop: 4,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Beranda',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon emoji="🏪" focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Keranjang',
          tabBarIcon: ({ focused }) => <CartTabIcon focused={focused} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  iconWrapper: {
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -6,
    right: -10,
    backgroundColor: Colors.cartBadge,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '800',
  },
});
