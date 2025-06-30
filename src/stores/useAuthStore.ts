import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'admin' | 'pengawas' | 'approver' | 'guest';

interface AuthState {
  role: Role;
  name: string | null;
  setAuth: (role: Role, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      role: 'guest',
      name: null,
      setAuth: (role, name) => set({ role, name }),
      logout: () => set({ role: 'guest', name: null }),
    }),
    {
      name: 'auth-storage',
      skipHydration: false,
    }
  )
);
