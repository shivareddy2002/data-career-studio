export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          actor_id: string | null
          changes: Json
          context: Json
          created_at: string
          created_by: string | null
          deleted_at: string | null
          entity_id: string | null
          entity_type: string
          id: string
          organization_id: string | null
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          action: string
          actor_id?: string | null
          changes?: Json
          context?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          entity_id?: string | null
          entity_type: string
          id?: string
          organization_id?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          action?: string
          actor_id?: string | null
          changes?: Json
          context?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          entity_id?: string | null
          entity_type?: string
          id?: string
          organization_id?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          created_at: string
          created_by: string | null
          deleted_at: string | null
          department: string | null
          id: string
          invited_by: string | null
          job_title: string | null
          joined_at: string | null
          organization_id: string
          role: Database["public"]["Enums"]["org_role"]
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          user_id: string
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          department?: string | null
          id?: string
          invited_by?: string | null
          job_title?: string | null
          joined_at?: string | null
          organization_id: string
          role?: Database["public"]["Enums"]["org_role"]
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          department?: string | null
          id?: string
          invited_by?: string | null
          job_title?: string | null
          joined_at?: string | null
          organization_id?: string
          role?: Database["public"]["Enums"]["org_role"]
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          branding: Json
          created_at: string
          created_by: string | null
          deleted_at: string | null
          email_domain: string | null
          id: string
          legal_name: string | null
          logo_url: string | null
          name: string
          plan: string
          seat_limit: number | null
          settings: Json
          slug: string
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          branding?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          email_domain?: string | null
          id?: string
          legal_name?: string | null
          logo_url?: string | null
          name: string
          plan?: string
          seat_limit?: number | null
          settings?: Json
          slug: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          branding?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          email_domain?: string | null
          id?: string
          legal_name?: string | null
          logo_url?: string | null
          name?: string
          plan?: string
          seat_limit?: number | null
          settings?: Json
          slug?: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          country: string | null
          created_at: string
          created_by: string | null
          current_role_title: string | null
          deleted_at: string | null
          display_name: string | null
          headline: string | null
          id: string
          links: Json
          onboarded_at: string | null
          onboarding_stage: string
          organization_id: string | null
          status: Database["public"]["Enums"]["record_status"]
          target_role_title: string | null
          timezone: string | null
          updated_at: string
          updated_by: string | null
          user_id: string
          username: string | null
          version: number
          years_experience: number | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          current_role_title?: string | null
          deleted_at?: string | null
          display_name?: string | null
          headline?: string | null
          id?: string
          links?: Json
          onboarded_at?: string | null
          onboarding_stage?: string
          organization_id?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          target_role_title?: string | null
          timezone?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id: string
          username?: string | null
          version?: number
          years_experience?: number | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          country?: string | null
          created_at?: string
          created_by?: string | null
          current_role_title?: string | null
          deleted_at?: string | null
          display_name?: string | null
          headline?: string | null
          id?: string
          links?: Json
          onboarded_at?: string | null
          onboarding_stage?: string
          organization_id?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          target_role_title?: string | null
          timezone?: string | null
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          username?: string | null
          version?: number
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_preferences: {
        Row: {
          ai_memory_enabled: boolean
          career_preferences: Json
          created_at: string
          created_by: string | null
          deleted_at: string | null
          email_notifications: boolean
          font_scale: number
          high_contrast: boolean
          id: string
          language: string
          learning_preferences: Json
          notification_settings: Json
          profile_visibility: string
          push_notifications: boolean
          reduced_motion: boolean
          status: Database["public"]["Enums"]["record_status"]
          theme: string
          timezone: string
          updated_at: string
          updated_by: string | null
          user_id: string
          version: number
          weekly_digest: boolean
          weekly_hours_goal: number
        }
        Insert: {
          ai_memory_enabled?: boolean
          career_preferences?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          email_notifications?: boolean
          font_scale?: number
          high_contrast?: boolean
          id?: string
          language?: string
          learning_preferences?: Json
          notification_settings?: Json
          profile_visibility?: string
          push_notifications?: boolean
          reduced_motion?: boolean
          status?: Database["public"]["Enums"]["record_status"]
          theme?: string
          timezone?: string
          updated_at?: string
          updated_by?: string | null
          user_id: string
          version?: number
          weekly_digest?: boolean
          weekly_hours_goal?: number
        }
        Update: {
          ai_memory_enabled?: boolean
          career_preferences?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          email_notifications?: boolean
          font_scale?: number
          high_contrast?: boolean
          id?: string
          language?: string
          learning_preferences?: Json
          notification_settings?: Json
          profile_visibility?: string
          push_notifications?: boolean
          reduced_motion?: boolean
          status?: Database["public"]["Enums"]["record_status"]
          theme?: string
          timezone?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          version?: number
          weekly_digest?: boolean
          weekly_hours_goal?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          created_by: string | null
          deleted_at: string | null
          granted_by: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          user_id: string
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          granted_by?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          granted_by?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          version?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_org_manager: {
        Args: { _org_id: string; _user_id: string }
        Returns: boolean
      }
      is_org_member: {
        Args: { _org_id: string; _user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "instructor" | "learner"
      difficulty_level: "Beginner" | "Intermediate" | "Advanced"
      org_role: "owner" | "admin" | "instructor" | "member"
      record_status: "draft" | "active" | "published" | "archived" | "suspended"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "instructor", "learner"],
      difficulty_level: ["Beginner", "Intermediate", "Advanced"],
      org_role: ["owner", "admin", "instructor", "member"],
      record_status: ["draft", "active", "published", "archived", "suspended"],
    },
  },
} as const
