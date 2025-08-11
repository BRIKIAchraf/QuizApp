import React from 'react';
import { ScrollView, StyleSheet, Pressable } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Category } from '@/types/marketplace';

interface Props {
  categories: Category[];
  selected: Category | 'All';
  onSelect: (category: Category | 'All') => void;
}

export default function CategoryChips({ categories, selected, onSelect }: Props) {
  const all = ['All', ...categories] as const;
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.row}>
      {all.map((cat) => {
        const isActive = selected === cat;
        return (
          <Pressable key={cat} onPress={() => onSelect(cat as Category | 'All')} style={[styles.chip, isActive && styles.activeChip]}>
            <Text style={[styles.chipText, isActive && styles.activeText]}>{cat}</Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: {
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  chip: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 16,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'transparent',
  },
  activeChip: {
    backgroundColor: '#0a7ea4',
    borderColor: '#0a7ea4',
  },
  chipText: {
    fontSize: 14,
  },
  activeText: {
    color: 'white',
    fontWeight: '600',
  },
});