import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fqbyjviqzcgrokozakpy.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZxYnlqdmlxemNncm9rb3pha3B5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA4NzE3MDUsImV4cCI6MjA2NjQ0NzcwNX0.kLf9JZ1NBB3-0HeSsfZn8bGpRWNyR3s1qjJW2OJYNTs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
