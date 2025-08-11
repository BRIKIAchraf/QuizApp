import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useMarketplaceStore } from '@/store/useMarketplaceStore';
import RequestCard from '@/components/RequestCard';

export default function RequestsScreen() {
  const requests = useMarketplaceStore((s) => s.requests);

  return (
    <View style={styles.container}>
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => <RequestCard request={item} />}
        ListEmptyComponent={<Text style={{ padding: 16 }}>No requests yet. Tap + to create one.</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  list: { padding: 16 },
});
