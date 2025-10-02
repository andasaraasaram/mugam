import { Injectable } from '@angular/core';
import { createClient, SupabaseClient, User } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://YOUR_PROJECT_ID.supabase.co',   // replace with your Supabase URL
      'YOUR_PUBLIC_ANON_KEY'                   // replace with your anon key
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
