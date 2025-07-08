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
        // Force rerender after state change
        setTimeout(() => {
          set({}); // Trigger subscriptions
        }, 0);
      },
      logout: () => {
        set({ role: 'guest', name: null });
        // Force rerender after logout
        setTimeout(() => {
          set({}); // Trigger subscriptions
        }, 0);
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
          // Force rerender after hydration
          setTimeout(() => {
            state.setHydrated(true); // Trigger again to force update
          }, 0);
        }
      },
    }
  )
);