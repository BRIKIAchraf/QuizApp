import React, { useMemo } from 'react';
import { StyleSheet, Pressable, Alert } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { useMarketplaceStore } from '@/store/useMarketplaceStore';

export default function ProviderDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const provider = useMarketplaceStore((s) => s.providers.find((p) => p.id === id));

  if (!provider) {
    return (
      <View style={styles.container}>
        <Text>Provider not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar} />
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{provider.name}</Text>
          <Text style={styles.sub}>{provider.categories.join(' • ')} · {provider.city}</Text>
          <Text style={styles.sub}>⭐ {provider.rating.toFixed(1)} ({provider.numReviews}) · €{provider.hourlyRate}/hr</Text>
        </View>
      </View>
      {provider.bio ? <Text style={styles.bio}>{provider.bio}</Text> : null}

      <Pressable style={styles.cta} onPress={() => router.push({ pathname: '/modal', params: { providerId: provider.id } })}>
        <Text style={styles.ctaText}>Request Service</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  header: { flexDirection: 'row', gap: 12, alignItems: 'center' },
  avatar: { width: 64, height: 64, borderRadius: 32, backgroundColor: '#d1d5db' },
  name: { fontSize: 20, fontWeight: '800' },
  sub: { color: '#6b7280' },
  bio: { color: '#374151', marginTop: 8 },
  cta: { backgroundColor: '#0a7ea4', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 12 },
  ctaText: { color: 'white', fontWeight: '700' },
});