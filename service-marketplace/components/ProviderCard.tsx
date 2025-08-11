import React from 'react';
import { Image, Pressable, StyleSheet } from 'react-native';
import { Link } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { Provider } from '@/types/marketplace';

interface Props {
  provider: Provider;
}

export default function ProviderCard({ provider }: Props) {
  return (
    <Link href={{ pathname: '/provider/[id]', params: { id: provider.id } }} asChild>
      <Pressable style={styles.card}>
        <View style={styles.row}>
          <View style={styles.avatar} />
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{provider.name}</Text>
            <Text style={styles.sub}>{provider.categories.join(' • ')} · {provider.city}</Text>
            <Text style={styles.sub}>⭐ {provider.rating.toFixed(1)} ({provider.numReviews}) · €{provider.hourlyRate}/hr</Text>
          </View>
        </View>
        {provider.bio ? <Text style={styles.bio} numberOfLines={2}>{provider.bio}</Text> : null}
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    padding: 12,
    gap: 8,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#d1d5db',
  },
  name: {
    fontSize: 16,
    fontWeight: '700',
  },
  sub: {
    color: '#6b7280',
  },
  bio: {
    color: '#374151',
  },
});