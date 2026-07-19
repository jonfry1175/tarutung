export type Database = {
  public: {
    Tables: {
      saved_places: {
        Row: {
          user_id: string;
          place_id: string;
          created_at: string;
        };
        Insert: {
          user_id: string;
          place_id: string;
          created_at?: string;
        };
        Update: {
          user_id?: string;
          place_id?: string;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<never, never>;
    Functions: Record<never, never>;
    Enums: Record<never, never>;
    CompositeTypes: Record<never, never>;
  };
};
