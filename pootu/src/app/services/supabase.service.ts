import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      "https://jhgrbovufgekgqtveuwx.supabase.co",
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoZ3Jib3Z1Zmdla2dxdHZldXd4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTkwNTA5ODksImV4cCI6MjA3NDYyNjk4OX0.5XlTXTKyiSy1sbhiffUlsQCTre20ST7q0vyVh8iv8zc",
      {
        auth: {
          persistSession: true,
          autoRefreshToken: false
        }
      }
    );
  }

  get client() {
    return this.supabase;
  }

  async signUp(email: string, password: string) {
    return this.supabase.auth.signUp({ email, password });
  }

  async signIn(email: string, password: string) {
    return this.supabase.auth.signInWithPassword({ email, password });
  }

  async getUser(): Promise<User | null> {
    const { data } = await this.supabase.auth.getUser();
    return data.user ?? null;
  }

  async signOut() {
    return this.supabase.auth.signOut();
  }
}
