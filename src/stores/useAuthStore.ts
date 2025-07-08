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
      setAuth: (role: Role, name: string) => {
        set({ role, name });
        document.cookie = `auth-role=${role}; path=/; max-age=86400`; 
        document.cookie = `auth-name=${name}; path=/; max-age=86400`;
      },
      logout: () => {
        set({ role: 'guest', name: null });
        // Clear cookies when logging out
        document.cookie = 'auth-role=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
        document.cookie = 'auth-name=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
      },
      setHydrated: (value: boolean) => set({ hydrated: value }),
    }),
    {
      name: 'auth-storage',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state?: AuthState, error?: unknown) => {
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