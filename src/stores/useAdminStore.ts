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
};

export const useAdminStore = create<AdminStore>((set) => {
  const storedAdmin = localStorage.getItem("admin");

  return {
    admin: storedAdmin ? JSON.parse(storedAdmin) : null,
    loading: false,

    setAdmin: (admin) => {
      localStorage.setItem("admin", JSON.stringify(admin));
      set({ admin });
    },

    clearAdmin: () => {
      localStorage.removeItem("admin");
      set({ admin: null });
    },
  };
});
