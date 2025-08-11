import React, { useMemo, useState } from 'react';
import { FlatList, StyleSheet, TextInput } from 'react-native';
import { Text, View } from '@/components/Themed';
import CategoryChips from '@/components/CategoryChips';
import ProviderCard from '@/components/ProviderCard';
import { useMarketplaceStore } from '@/store/useMarketplaceStore';
import { Category } from '@/types/marketplace';

export default function BrowseScreen() {
  const providers = useMarketplaceStore((s) => s.providers);

  const allCategories = useMemo(() => {
    const set = new Set<Category>();
    providers.forEach((p) => p.categories.forEach((c) => set.add(c)));
    return Array.from(set).sort();
  }, [providers]);

  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Category | 'All'>('All');

  const filtered = useMemo(() => {
    return providers.filter((p) => {
      const matchCategory = selected === 'All' || p.categories.includes(selected);
      const q = query.trim().toLowerCase();
      const matchQuery = !q || p.name.toLowerCase().includes(q) || p.city.toLowerCase().includes(q) || p.categories.join(' ').toLowerCase().includes(q);
      return matchCategory && matchQuery;
    });
  }, [providers, query, selected]);

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search for plumber, gardener, city..."
        value={query}
        onChangeText={setQuery}
        style={styles.search}
      />
      <CategoryChips categories={allCategories} selected={selected} onSelect={setSelected} />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <ProviderCard provider={item} />}
        ListEmptyComponent={<Text style={{ padding: 16 }}>No providers found.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  search: {
    margin: 16,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  list: { padding: 16 },
});
