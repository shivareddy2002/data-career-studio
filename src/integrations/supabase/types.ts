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
      badges: {
        Row: {
          created_at: string
          created_by: string | null
          criteria: Json
          deleted_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          slug: string
          status: Database["public"]["Enums"]["record_status"]
          tier: string
          updated_at: string
          updated_by: string | null
          version: number
          xp_reward: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          criteria?: Json
          deleted_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          slug: string
          status?: Database["public"]["Enums"]["record_status"]
          tier?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
          xp_reward?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          criteria?: Json
          deleted_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          slug?: string
          status?: Database["public"]["Enums"]["record_status"]
          tier?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
          xp_reward?: number
        }
        Relationships: []
      }
      certificates: {
        Row: {
          course_id: string | null
          created_at: string
          created_by: string | null
          deleted_at: string | null
          expires_at: string | null
          id: string
          is_public: boolean
          issued_at: string
          learning_path_id: string | null
          metadata: Json
          organization_id: string | null
          recipient_name: string
          score: number | null
          status: Database["public"]["Enums"]["record_status"]
          title: string
          updated_at: string
          updated_by: string | null
          user_id: string
          verification_code: string
          version: number
        }
        Insert: {
          course_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          is_public?: boolean
          issued_at?: string
          learning_path_id?: string | null
          metadata?: Json
          organization_id?: string | null
          recipient_name: string
          score?: number | null
          status?: Database["public"]["Enums"]["record_status"]
          title: string
          updated_at?: string
          updated_by?: string | null
          user_id: string
          verification_code: string
          version?: number
        }
        Update: {
          course_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          expires_at?: string | null
          id?: string
          is_public?: boolean
          issued_at?: string
          learning_path_id?: string | null
          metadata?: Json
          organization_id?: string | null
          recipient_name?: string
          score?: number | null
          status?: Database["public"]["Enums"]["record_status"]
          title?: string
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          verification_code?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "certificates_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "certificates_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      course_categories: {
        Row: {
          created_at: string
          created_by: string | null
          deleted_at: string | null
          description: string | null
          icon: string | null
          id: string
          name: string
          organization_id: string | null
          position: number
          slug: string
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name: string
          organization_id?: string | null
          position?: number
          slug: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          description?: string | null
          icon?: string | null
          id?: string
          name?: string
          organization_id?: string | null
          position?: number
          slug?: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_categories_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      course_enrollments: {
        Row: {
          completed_at: string | null
          course_id: string
          created_at: string
          created_by: string | null
          deleted_at: string | null
          enrolled_at: string
          id: string
          last_activity_at: string | null
          learning_path_id: string | null
          organization_id: string | null
          progress_percent: number
          started_at: string | null
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          user_id: string
          version: number
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          enrolled_at?: string
          id?: string
          last_activity_at?: string | null
          learning_path_id?: string | null
          organization_id?: string | null
          progress_percent?: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
          version?: number
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          enrolled_at?: string
          id?: string
          last_activity_at?: string | null
          learning_path_id?: string | null
          organization_id?: string | null
          progress_percent?: number
          started_at?: string | null
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_enrollments_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_enrollments_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      course_modules: {
        Row: {
          course_id: string
          created_at: string
          created_by: string | null
          deleted_at: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          objectives: string[]
          position: number
          slug: string
          status: Database["public"]["Enums"]["record_status"]
          summary: string | null
          title: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          course_id: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          objectives?: string[]
          position?: number
          slug: string
          status?: Database["public"]["Enums"]["record_status"]
          summary?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          course_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          objectives?: string[]
          position?: number
          slug?: string
          status?: Database["public"]["Enums"]["record_status"]
          summary?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "course_modules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          capstone: Json
          category_id: string | null
          certificate: Json
          created_at: string
          created_by: string | null
          deleted_at: string | null
          hours: number
          id: string
          interview_questions: Json
          level: Database["public"]["Enums"]["difficulty_level"]
          objectives: string[]
          organization_id: string | null
          overview: string | null
          position: number
          prerequisites: string[]
          slug: string
          status: Database["public"]["Enums"]["record_status"]
          subtitle: string | null
          tags: string[]
          title: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          capstone?: Json
          category_id?: string | null
          certificate?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          hours?: number
          id?: string
          interview_questions?: Json
          level?: Database["public"]["Enums"]["difficulty_level"]
          objectives?: string[]
          organization_id?: string | null
          overview?: string | null
          position?: number
          prerequisites?: string[]
          slug: string
          status?: Database["public"]["Enums"]["record_status"]
          subtitle?: string | null
          tags?: string[]
          title: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          capstone?: Json
          category_id?: string | null
          certificate?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          hours?: number
          id?: string
          interview_questions?: Json
          level?: Database["public"]["Enums"]["difficulty_level"]
          objectives?: string[]
          organization_id?: string | null
          overview?: string | null
          position?: number
          prerequisites?: string[]
          slug?: string
          status?: Database["public"]["Enums"]["record_status"]
          subtitle?: string | null
          tags?: string[]
          title?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "courses_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "courses_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_path_courses: {
        Row: {
          course_id: string
          created_at: string
          created_by: string | null
          deleted_at: string | null
          id: string
          is_required: boolean
          learning_path_id: string
          position: number
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          course_id: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          id?: string
          is_required?: boolean
          learning_path_id: string
          position?: number
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          course_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          id?: string
          is_required?: boolean
          learning_path_id?: string
          position?: number
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "learning_path_courses_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_path_courses_learning_path_id_fkey"
            columns: ["learning_path_id"]
            isOneToOne: false
            referencedRelation: "learning_paths"
            referencedColumns: ["id"]
          },
        ]
      }
      learning_paths: {
        Row: {
          audience: string | null
          category_id: string | null
          certifications: string[]
          companies: string[]
          created_at: string
          created_by: string | null
          deleted_at: string | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          duration: string | null
          id: string
          interview_prep: string[]
          organization_id: string | null
          outcomes: string[]
          position: number
          projects: string[]
          roadmap: Json
          salary: Json
          skills: string[]
          slug: string
          status: Database["public"]["Enums"]["record_status"]
          tagline: string | null
          title: string
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          audience?: string | null
          category_id?: string | null
          certifications?: string[]
          companies?: string[]
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration?: string | null
          id?: string
          interview_prep?: string[]
          organization_id?: string | null
          outcomes?: string[]
          position?: number
          projects?: string[]
          roadmap?: Json
          salary?: Json
          skills?: string[]
          slug: string
          status?: Database["public"]["Enums"]["record_status"]
          tagline?: string | null
          title: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          audience?: string | null
          category_id?: string | null
          certifications?: string[]
          companies?: string[]
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          duration?: string | null
          id?: string
          interview_prep?: string[]
          organization_id?: string | null
          outcomes?: string[]
          position?: number
          projects?: string[]
          roadmap?: Json
          salary?: Json
          skills?: string[]
          slug?: string
          status?: Database["public"]["Enums"]["record_status"]
          tagline?: string | null
          title?: string
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "learning_paths_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "course_categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "learning_paths_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      lesson_progress: {
        Row: {
          completed_at: string | null
          course_id: string
          created_at: string
          created_by: string | null
          deleted_at: string | null
          id: string
          last_position: number
          lesson_id: string
          notes: string | null
          seconds_spent: number
          state: string
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          user_id: string
          version: number
        }
        Insert: {
          completed_at?: string | null
          course_id: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          id?: string
          last_position?: number
          lesson_id: string
          notes?: string | null
          seconds_spent?: number
          state?: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
          version?: number
        }
        Update: {
          completed_at?: string | null
          course_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          id?: string
          last_position?: number
          lesson_id?: string
          notes?: string | null
          seconds_spent?: number
          state?: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "lesson_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lesson_progress_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      lessons: {
        Row: {
          assignment: Json
          career_link: string | null
          cheatsheet: Json
          course_id: string
          created_at: string
          created_by: string | null
          deleted_at: string | null
          diagram: Json | null
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          examples: Json
          flashcards: Json
          id: string
          intro: string | null
          key_points: string[]
          lab: Json | null
          minutes: number
          module_id: string
          outcomes: string[]
          position: number
          slug: string
          status: Database["public"]["Enums"]["record_status"]
          theory: Json
          title: string
          tutor: Json
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          assignment?: Json
          career_link?: string | null
          cheatsheet?: Json
          course_id: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          diagram?: Json | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          examples?: Json
          flashcards?: Json
          id?: string
          intro?: string | null
          key_points?: string[]
          lab?: Json | null
          minutes?: number
          module_id: string
          outcomes?: string[]
          position?: number
          slug: string
          status?: Database["public"]["Enums"]["record_status"]
          theory?: Json
          title: string
          tutor?: Json
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          assignment?: Json
          career_link?: string | null
          cheatsheet?: Json
          course_id?: string
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          diagram?: Json | null
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          examples?: Json
          flashcards?: Json
          id?: string
          intro?: string | null
          key_points?: string[]
          lab?: Json | null
          minutes?: number
          module_id?: string
          outcomes?: string[]
          position?: number
          slug?: string
          status?: Database["public"]["Enums"]["record_status"]
          theory?: Json
          title?: string
          tutor?: Json
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lessons_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
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
      quiz_attempts: {
        Row: {
          answers: Json
          attempt_number: number
          course_id: string | null
          created_at: string
          created_by: string | null
          deleted_at: string | null
          earned_points: number
          id: string
          lesson_id: string
          passed: boolean
          score: number
          seconds_spent: number
          status: Database["public"]["Enums"]["record_status"]
          total_points: number
          updated_at: string
          updated_by: string | null
          user_id: string
          version: number
        }
        Insert: {
          answers?: Json
          attempt_number?: number
          course_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          earned_points?: number
          id?: string
          lesson_id: string
          passed?: boolean
          score?: number
          seconds_spent?: number
          status?: Database["public"]["Enums"]["record_status"]
          total_points?: number
          updated_at?: string
          updated_by?: string | null
          user_id: string
          version?: number
        }
        Update: {
          answers?: Json
          attempt_number?: number
          course_id?: string | null
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          earned_points?: number
          id?: string
          lesson_id?: string
          passed?: boolean
          score?: number
          seconds_spent?: number
          status?: Database["public"]["Enums"]["record_status"]
          total_points?: number
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "quiz_attempts_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          code: string | null
          correct_answer: Json
          created_at: string
          created_by: string | null
          deleted_at: string | null
          explanation: string | null
          external_id: string
          id: string
          kind: string
          lesson_id: string
          options: Json
          points: number
          position: number
          prompt: string
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          version: number
        }
        Insert: {
          code?: string | null
          correct_answer: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          explanation?: string | null
          external_id: string
          id?: string
          kind: string
          lesson_id: string
          options?: Json
          points?: number
          position?: number
          prompt: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Update: {
          code?: string | null
          correct_answer?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          explanation?: string | null
          external_id?: string
          id?: string
          kind?: string
          lesson_id?: string
          options?: Json
          points?: number
          position?: number
          prompt?: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      user_badges: {
        Row: {
          badge_id: string
          context: Json
          created_at: string
          created_by: string | null
          deleted_at: string | null
          earned_at: string
          id: string
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          user_id: string
          version: number
        }
        Insert: {
          badge_id: string
          context?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          earned_at?: string
          id?: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
          version?: number
        }
        Update: {
          badge_id?: string
          context?: Json
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          earned_at?: string
          id?: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "user_badges_badge_id_fkey"
            columns: ["badge_id"]
            isOneToOne: false
            referencedRelation: "badges"
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
      xp_events: {
        Row: {
          amount: number
          created_at: string
          created_by: string | null
          deleted_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          reason: string | null
          source: string
          status: Database["public"]["Enums"]["record_status"]
          updated_at: string
          updated_by: string | null
          user_id: string
          version: number
        }
        Insert: {
          amount: number
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          reason?: string | null
          source: string
          status?: Database["public"]["Enums"]["record_status"]
          updated_at?: string
          updated_by?: string | null
          user_id: string
          version?: number
        }
        Update: {
          amount?: number
          created_at?: string
          created_by?: string | null
          deleted_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          reason?: string | null
          source?: string
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
      can_author_content: { Args: never; Returns: boolean }
      can_read_content: {
        Args: {
          _deleted_at: string
          _org_id: string
          _status: Database["public"]["Enums"]["record_status"]
        }
        Returns: boolean
      }
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
