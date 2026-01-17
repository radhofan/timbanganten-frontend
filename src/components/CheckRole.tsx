import { useStore } from "zustand";
import { authStore } from "@/stores/useAuthStore";

export const useUserRoles = () => {
  const user = useStore(authStore, (s) => s.user);

  return {
    isAdmin: user?.role === "admin",
    isApprover: user?.role === "approver",
    isPengawas: user?.role === "pengawas",
  };
};
