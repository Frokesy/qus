import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import dayjs from "dayjs";

export type CustomUser = {
  id: string;
  email: string;
  name: string;
  total_earnings: string;
  frozen_balance: string;
  user_id: string;
  free_spins: number;
  last_spin_at?: string | null;
  rank: string;
  username: string;
  address: string;
  phone: string;
  tasks: string[];
  member_since: string;
  payment_method: string;
  payment_status: string;
};

type AuthState = {
  session: Session | null;
  user: CustomUser | null;
  loading: boolean;
  fetchSession: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  loading: true,

  fetchSession: async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    const updateFreeSpins = async (user: CustomUser) => {
      const now = dayjs();

      if (!user.last_spin_at) {
        return user;
      }

      const lastSpin = user.last_spin_at ? dayjs(user.last_spin_at) : null;
      const daysPassed = lastSpin ? now.diff(lastSpin, "day") : 1;

      if (daysPassed >= 1) {
        const updatedSpins = user.free_spins + daysPassed;

        const { data: updatedUser, error } = await supabase
          .from("users")
          .update({
            free_spins: updatedSpins,
            last_spin_at: now.toISOString(),
          })
          .eq("user_id", user.user_id)
          .select()
          .single();

        if (error) {
          console.error("Error updating free spins:", error.message);
        }

        return updatedUser || user;
      }

      return user;
    };

    if (session?.user) {
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error("Failed to fetch user from custom table:", error.message);
        set({ session, user: null, loading: false });
        return;
      }

      const checkedUser = await updateFreeSpins(userData);

      set({
        session,
        user: checkedUser,
        loading: false,
      });
    } else {
      set({
        session: null,
        user: null,
        loading: false,
      });
    }

    supabase.auth.onAuthStateChange(async (_event, newSession) => {
      if (newSession?.user) {
        const { data: userData, error } = await supabase
          .from("users")
          .select("*")
          .eq("user_id", newSession.user.id)
          .single();

        if (error) {
          console.error(
            "Auth state change: error fetching user:",
            error.message,
          );
          return;
        }

        const checkedUser = await updateFreeSpins(userData);

        set({
          session: newSession,
          user: checkedUser,
        });
      } else {
        set({
          session: null,
          user: null,
        });
      }
    });
  },
}));
