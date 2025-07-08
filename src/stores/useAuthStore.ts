import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type Role = 'admin' | 'pengurusan' | 'approver' | 'guest';

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
      onRehydrateStorage: () => (state, error) => {
        if (error) {
          console.log('Rehydration error:', error);
          localStorage.removeItem('auth-storage');
        }
        if (state) {
          state.setHydrated(true);
        }
      },
    }
  )
);

// Remove the manual rehydrate call - let it happen naturally
// This was causing race conditions