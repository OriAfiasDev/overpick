export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      abilities: {
        Row: {
          button: string;
          cooldown: number | null;
          description: string | null;
          id: string;
          image_url: string | null;
          name: string;
          type: string;
        };
        Insert: {
          button: string;
          cooldown?: number | null;
          description?: string | null;
          id: string;
          image_url?: string | null;
          name: string;
          type: string;
        };
        Update: {
          button?: string;
          cooldown?: number | null;
          description?: string | null;
          id?: string;
          image_url?: string | null;
          name?: string;
          type?: string;
        };
      };
      counters: {
        Row: {
          countered_hero_id: string | null;
          hero_id: string | null;
          id: string;
          match: number | null;
        };
        Insert: {
          countered_hero_id?: string | null;
          hero_id?: string | null;
          id: string;
          match?: number | null;
        };
        Update: {
          countered_hero_id?: string | null;
          hero_id?: string | null;
          id?: string;
          match?: number | null;
        };
      };
      hero_abilities: {
        Row: {
          ability_id: string | null;
          hero_id: string | null;
          id: number;
        };
        Insert: {
          ability_id?: string | null;
          hero_id?: string | null;
          id?: number;
        };
        Update: {
          ability_id?: string | null;
          hero_id?: string | null;
          id?: number;
        };
      };
      heroes: {
        Row: {
          avatar_url: string | null;
          description: string | null;
          health: number | null;
          id: string;
          name: string;
          role: string;
        };
        Insert: {
          avatar_url?: string | null;
          description?: string | null;
          health?: number | null;
          id: string;
          name: string;
          role: string;
        };
        Update: {
          avatar_url?: string | null;
          description?: string | null;
          health?: number | null;
          id?: string;
          name?: string;
          role?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
}
