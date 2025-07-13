import { create } from "zustand";

type Admin = {
  id: string;
  username: string;
  email?: string;
};

type AdminStore = {
  admin: Admin | null;
  loading: boolean;
  setAdmin: (admin: Admin) => void;
  clearAdmin: () => void;
  fetchAdminFromLocal: () => void;
};

export const useAdminStore = create<AdminStore>((set) => ({
  admin: null,
  loading: false,

  setAdmin: (admin) => {
    localStorage.setItem("admin", JSON.stringify(admin));
    set({ admin });
  },

  clearAdmin: () => {
    localStorage.removeItem("admin");
    set({ admin: null });
  },

  fetchAdminFromLocal: () => {
    const stored = localStorage.getItem("admin");
    if (stored) {
      set({ admin: JSON.parse(stored) });
    }
  },
}));
