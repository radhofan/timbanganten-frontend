import { createStore } from "zustand/vanilla";
import { CurrentUser } from "../lib/types";

type AuthState = {
  user: CurrentUser | null;
  setUser: (user: CurrentUser | null) => void;
  logout: () => void;
};

export const authStore = createStore<AuthState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));
