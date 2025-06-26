import { create } from "zustand";
import { supabase } from "../utils/supabaseClient";
import type { Session } from "@supabase/supabase-js";

export type CustomUser = {
  id: string;
  email: string;
  name: string;
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

    if (session?.user) {
      const { data: userData, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", session.user.id)
        .single();

      if (error) {
        console.error("Failed to fetch user from custom table:", error.message);
      }

      set({
        session,
        user: userData || null,
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
        }

        set({
          session: newSession,
          user: userData || null,
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
