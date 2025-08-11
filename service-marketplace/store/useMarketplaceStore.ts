import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

import PROVIDERS from '@/data/providers';
import { Provider, ServiceRequest, Category } from '@/types/marketplace';

interface AddRequestInput {
  providerId: string;
  description: string;
  address: string;
  contactName: string;
  contactPhone: string;
  scheduledFor?: string;
}

interface MarketplaceState {
  providers: Provider[];
  requests: ServiceRequest[];
  addRequest: (input: AddRequestInput) => void;
}

export const useMarketplaceStore = create<MarketplaceState>()(
  persist(
    (set, get) => ({
      providers: PROVIDERS,
      requests: [],
      addRequest: ({ providerId, description, address, contactName, contactPhone, scheduledFor }) => {
        const provider = get().providers.find((p) => p.id === providerId);
        if (!provider) return;
        const request: ServiceRequest = {
          id: String(Date.now()),
          providerId,
          providerName: provider.name,
          category: provider.categories[0] as Category,
          createdAt: new Date().toISOString(),
          scheduledFor,
          description,
          address,
          contactName,
          contactPhone,
          status: 'pending',
        };
        set((state) => ({ requests: [request, ...state.requests] }));
      },
    }),
    {
      name: 'marketplace-store',
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ requests: state.requests }),
    }
  )
);