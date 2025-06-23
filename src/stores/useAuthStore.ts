import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type Role = 'admin' | 'pengawas' | 'approver' | 'guest';

interface AuthState {
  token: string | null;
  role: Role;
  name: string | null;
  setAuth: (token: string, role: Role, name: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      token: null,
      role: 'guest',
      name: null,
      setAuth: (token, role, name) => set({ token, role, name }),
      logout: () => set({ token: null, role: 'guest', name: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
