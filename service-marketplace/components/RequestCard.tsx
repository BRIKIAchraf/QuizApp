import React from 'react';
import { StyleSheet } from 'react-native';
import { formatDistanceToNow } from 'date-fns';
import { Text, View } from '@/components/Themed';
import { ServiceRequest } from '@/types/marketplace';

interface Props {
  request: ServiceRequest;
}

export default function RequestCard({ request }: Props) {
  const createdLabel = formatDistanceToNow(new Date(request.createdAt), { addSuffix: true });
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{request.providerName}</Text>
      <Text style={styles.meta}>{request.category} · {request.status.toUpperCase()}</Text>
      <Text style={styles.meta}>Created {createdLabel}{request.scheduledFor ? ` · Scheduled ${new Date(request.scheduledFor).toLocaleString()}` : ''}</Text>
      <Text style={styles.desc} numberOfLines={3}>{request.description}</Text>
      <Text style={styles.meta}>Address: {request.address}</Text>
      <Text style={styles.meta}>Contact: {request.contactName} · {request.contactPhone}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e5e5e5',
    padding: 12,
    gap: 6,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
  },
  meta: {
    color: '#6b7280',
    fontSize: 12,
  },
  desc: {
    color: '#374151',
  },
});