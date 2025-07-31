import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type { Session } from "@supabase/supabase-js";
import dayjs from "dayjs";

export type CustomUser = {
  id: string;
  email: string;
  name: string;
  total_earnings: string;
  todays_earnings: string;
  frozen_balance: string;
  special_bonus: string;
  user_id: string;
  free_spins: number;
  last_spin_at?: string | null;
  rank: string;
  username: string;
  address: string;
  phone: string;
  tasks: string[];
  daily_tasks?: string[];
  last_task_reset?: string;
  member_since: string;
  payment_method: string;
  payment_status: string;
};

type AuthState = {
  session: Session | null;
  user: CustomUser | null;
  loading: boolean;
  fetchSession: () => Promise<void>;
  logout: () => Promise<void>;
};

export const useAuthStore = create<AuthState>((set) => ({
  session: null,
  user: null,
  loading: true,

  fetchSession: async () => {
    const { data: sessionData } = await supabase.auth.getSession();
    const session = sessionData.session;

    const now = dayjs();
    const today = now.format("YYYY-MM-DD");

    const updateFreeSpins = async (user: CustomUser) => {
      if (!user.last_spin_at) return user;

      const lastSpin = dayjs(user.last_spin_at);
      const now = dayjs();
      const hoursPassed = now.diff(lastSpin, "hour");

      if (hoursPassed >= 48) {
        const currentSpins = Number(user.free_spins || 0);
        const updatedSpins = currentSpins + 1;

        const { data: updatedUser, error } = await supabase
          .from("users")
          .update({
            free_spins: updatedSpins,
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

    const resetDailyTasksIfNeeded = async (user: CustomUser) => {
      const lastReset = user.last_task_reset || "";
      const isNewDay = lastReset !== today;

      if (!isNewDay) return user;

      const { data: updatedUser, error } = await supabase
        .from("users")
        .update({
          daily_tasks: [],
          todays_earnings: 0,
          last_task_reset: today,
        })
        .eq("user_id", user.user_id)
        .select()
        .single();

      if (error) {
        console.error("Error resetting daily tasks:", error.message);
      }

      return updatedUser || user;
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

      let updatedUser = await updateFreeSpins(userData);
      updatedUser = await resetDailyTasksIfNeeded(updatedUser);

      set({
        session,
        user: updatedUser,
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

        let updatedUser = await updateFreeSpins(userData);
        updatedUser = await resetDailyTasksIfNeeded(updatedUser);

        set({
          session: newSession,
          user: updatedUser,
        });
      } else {
        set({
          session: null,
          user: null,
        });
      }
    });
  },

  logout: async () => {
    sessionStorage.clear();
    set({ session: null, user: null });

    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.warn("Supabase sign-out failed:", error.message);
      }
    } catch (err) {
      console.error("Unexpected logout error:", err);
    }
  },
}));
