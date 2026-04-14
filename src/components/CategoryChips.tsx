// components/CategoryChips.tsx
// Horizontal scrollable category filter chips

import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Colors from '../constants/colors';
import { Category } from '../data/products';

interface Props {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
}

function ChipItem({
  item,
  isSelected,
  onPress,
}: {
  item: Category;
  isSelected: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.75}
      style={[styles.chip, isSelected && styles.chipSelected]}
    >
      <Text style={styles.icon}>{item.icon}</Text>
      <Text style={[styles.label, isSelected && styles.labelSelected]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );
}

export default function CategoryChips({ categories, selectedId, onSelect }: Props) {
  return (
    <FlatList
      data={categories}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ChipItem
          item={item}
          isSelected={item.id === selectedId}
          onPress={() => onSelect(item.id)}
        />
      )}
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.listContent}
    />
  );
}

const styles = StyleSheet.create({
  listContent: {
    paddingHorizontal: 16,
    gap: 8,
    paddingVertical: 4,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 8,
    gap: 5,
    borderWidth: 1.5,
    borderColor: Colors.border,
  },
  chipSelected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  icon: {
    fontSize: 14,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  labelSelected: {
    color: Colors.textInverse,
  },
});
