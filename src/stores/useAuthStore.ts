import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Role = 'admin' | 'pengawas' | 'approver' | 'guest';

interface AuthState {
  role: Role;
  name: string | null;
  hydrated: boolean;
  setAuth: (role: Role, name: string) => void;
  logout: () => void;
  setHydrated: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'guest',
      name: null,
      hydrated: false,
      setAuth: (role, name) => set({ role, name }),
      logout: () => set({ role: 'guest', name: null }),
      setHydrated: (value) => set({ hydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHydrated(true);
      },
    }
  )
);

// Initialize hydration on client side
if (typeof window !== 'undefined') {
  useAuthStore.persist.rehydrate();
}