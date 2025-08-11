import React, { useMemo, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, TextInput, Pressable } from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { useMarketplaceStore } from '@/store/useMarketplaceStore';

export default function NewRequestModal() {
  const { providerId } = useLocalSearchParams<{ providerId?: string }>();
  const providers = useMarketplaceStore((s) => s.providers);
  const addRequest = useMarketplaceStore((s) => s.addRequest);

  const provider = useMemo(() => providers.find((p) => p.id === providerId), [providers, providerId]);

  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [contactName, setContactName] = useState('');
  const [contactPhone, setContactPhone] = useState('');
  const [scheduledFor, setScheduledFor] = useState('');

  const submit = () => {
    const targetId = provider?.id;
    if (!targetId) {
      Alert.alert('Select a provider', 'Please open a provider and tap Request Service.');
      return;
    }
    if (!description || !address || !contactName || !contactPhone) {
      Alert.alert('Missing info', 'Please fill description, address, and contact info.');
      return;
    }
    addRequest({ providerId: targetId, description, address, contactName, contactPhone, scheduledFor: scheduledFor || undefined });
    router.replace('/(tabs)/two');
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.select({ ios: 'padding' })}>
      <View style={styles.container}>
        <Text style={styles.title}>New Request</Text>
        <Text style={styles.subtitle}>{provider ? `To: ${provider.name}` : 'No provider selected'}</Text>

        <TextInput
          placeholder="Describe the job (e.g., leak under sink, garden cleanup)"
          value={description}
          onChangeText={setDescription}
          style={[styles.input, { height: 100 }]}
          multiline
        />
        <TextInput placeholder="Address" value={address} onChangeText={setAddress} style={styles.input} />
        <TextInput placeholder="Preferred date/time (optional)" value={scheduledFor} onChangeText={setScheduledFor} style={styles.input} />
        <TextInput placeholder="Your name" value={contactName} onChangeText={setContactName} style={styles.input} />
        <TextInput placeholder="Phone" value={contactPhone} onChangeText={setContactPhone} style={styles.input} keyboardType="phone-pad" />

        <Pressable style={styles.cta} onPress={submit}>
          <Text style={styles.ctaText}>Submit Request</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, gap: 12 },
  title: { fontSize: 20, fontWeight: '800' },
  subtitle: { color: '#6b7280', marginBottom: 8 },
  input: {
    borderWidth: 1,
    borderColor: '#e5e7eb',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  cta: { backgroundColor: '#0a7ea4', paddingVertical: 12, borderRadius: 8, alignItems: 'center', marginTop: 4 },
  ctaText: { color: 'white', fontWeight: '700' },
});
