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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      art_items: {
        Row: {
          cover_image: string
          created_at: string
          created_by: string | null
          description: string | null
          dimensions: string | null
          for_sale: boolean
          id: string
          medium: string | null
          price: number | null
          sort_order: number
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          cover_image: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          dimensions?: string | null
          for_sale?: boolean
          id?: string
          medium?: string | null
          price?: number | null
          sort_order?: number
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          cover_image?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          dimensions?: string | null
          for_sale?: boolean
          id?: string
          medium?: string | null
          price?: number | null
          sort_order?: number
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_name: string
          category: string
          content: string
          created_at: string
          created_by: string | null
          excerpt: string
          id: string
          image_url: string
          published_at: string
          slug: string
          status: Database["public"]["Enums"]["blog_status"]
          title: string
          updated_at: string
        }
        Insert: {
          author_name?: string
          category: string
          content: string
          created_at?: string
          created_by?: string | null
          excerpt: string
          id?: string
          image_url: string
          published_at?: string
          slug: string
          status?: Database["public"]["Enums"]["blog_status"]
          title: string
          updated_at?: string
        }
        Update: {
          author_name?: string
          category?: string
          content?: string
          created_at?: string
          created_by?: string | null
          excerpt?: string
          id?: string
          image_url?: string
          published_at?: string
          slug?: string
          status?: Database["public"]["Enums"]["blog_status"]
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      career_positions: {
        Row: {
          apply_url: string | null
          created_at: string
          created_by: string | null
          department: string | null
          description: string | null
          employment_type: string
          id: string
          is_open: boolean
          location: string | null
          sort_order: number
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          apply_url?: string | null
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string
          id?: string
          is_open?: boolean
          location?: string | null
          sort_order?: number
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          apply_url?: string | null
          created_at?: string
          created_by?: string | null
          department?: string | null
          description?: string | null
          employment_type?: string
          id?: string
          is_open?: boolean
          location?: string | null
          sort_order?: number
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          company: string | null
          created_at: string
          email: string
          id: string
          message: string
          name: string
        }
        Insert: {
          company?: string | null
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
        }
        Update: {
          company?: string | null
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
        }
        Relationships: []
      }
      design_items: {
        Row: {
          category: string
          client: string | null
          cover_image: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          project_url: string | null
          sort_order: number
          title: string
          updated_at: string
          year: number | null
        }
        Insert: {
          category?: string
          client?: string | null
          cover_image: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          project_url?: string | null
          sort_order?: number
          title: string
          updated_at?: string
          year?: number | null
        }
        Update: {
          category?: string
          client?: string | null
          cover_image?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          project_url?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
          year?: number | null
        }
        Relationships: []
      }
      event_items: {
        Row: {
          city: string | null
          cover_image: string
          created_at: string
          created_by: string | null
          description: string | null
          ends_at: string | null
          id: string
          rsvp_url: string | null
          sort_order: number
          starts_at: string | null
          status: string
          title: string
          updated_at: string
          venue: string | null
        }
        Insert: {
          city?: string | null
          cover_image: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          rsvp_url?: string | null
          sort_order?: number
          starts_at?: string | null
          status?: string
          title: string
          updated_at?: string
          venue?: string | null
        }
        Update: {
          city?: string | null
          cover_image?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          ends_at?: string | null
          id?: string
          rsvp_url?: string | null
          sort_order?: number
          starts_at?: string | null
          status?: string
          title?: string
          updated_at?: string
          venue?: string | null
        }
        Relationships: []
      }
      it_services: {
        Row: {
          cover_image: string | null
          created_at: string
          created_by: string | null
          description: string | null
          features: Json
          icon: string
          id: string
          sort_order: number
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          features?: Json
          icon?: string
          id?: string
          sort_order?: number
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          cover_image?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          features?: Json
          icon?: string
          id?: string
          sort_order?: number
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      learn_courses: {
        Row: {
          content: string | null
          cover_image: string
          created_at: string
          created_by: string | null
          duration: string | null
          enroll_url: string | null
          id: string
          instructor: string | null
          level: string
          sort_order: number
          summary: string
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          cover_image: string
          created_at?: string
          created_by?: string | null
          duration?: string | null
          enroll_url?: string | null
          id?: string
          instructor?: string | null
          level?: string
          sort_order?: number
          summary: string
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          cover_image?: string
          created_at?: string
          created_by?: string | null
          duration?: string | null
          enroll_url?: string | null
          id?: string
          instructor?: string | null
          level?: string
          sort_order?: number
          summary?: string
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      notifications: {
        Row: {
          body: string | null
          created_at: string
          id: string
          link: string | null
          read: boolean
          title: string
          user_id: string
        }
        Insert: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean
          title: string
          user_id: string
        }
        Update: {
          body?: string | null
          created_at?: string
          id?: string
          link?: string | null
          read?: boolean
          title?: string
          user_id?: string
        }
        Relationships: []
      }
      photography_items: {
        Row: {
          captured_at: string | null
          cover_image: string
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          location: string | null
          sort_order: number
          title: string
          updated_at: string
        }
        Insert: {
          captured_at?: string | null
          cover_image: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          location?: string | null
          sort_order?: number
          title: string
          updated_at?: string
        }
        Update: {
          captured_at?: string | null
          cover_image?: string
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          location?: string | null
          sort_order?: number
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          full_name: string | null
          id: string
          phone: string | null
          specialty: Database["public"]["Enums"]["employee_specialty"] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          phone?: string | null
          specialty?: Database["public"]["Enums"]["employee_specialty"] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          phone?: string | null
          specialty?: Database["public"]["Enums"]["employee_specialty"] | null
          updated_at?: string
        }
        Relationships: []
      }
      projects: {
        Row: {
          client_id: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          name: string
          status: Database["public"]["Enums"]["project_status"]
          updated_at: string
        }
        Insert: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          name: string
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
        }
        Update: {
          client_id?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          name?: string
          status?: Database["public"]["Enums"]["project_status"]
          updated_at?: string
        }
        Relationships: []
      }
      task_logs: {
        Row: {
          actor_id: string | null
          created_at: string
          from_status: Database["public"]["Enums"]["task_status"] | null
          id: string
          note: string | null
          task_id: string
          to_status: Database["public"]["Enums"]["task_status"] | null
        }
        Insert: {
          actor_id?: string | null
          created_at?: string
          from_status?: Database["public"]["Enums"]["task_status"] | null
          id?: string
          note?: string | null
          task_id: string
          to_status?: Database["public"]["Enums"]["task_status"] | null
        }
        Update: {
          actor_id?: string | null
          created_at?: string
          from_status?: Database["public"]["Enums"]["task_status"] | null
          id?: string
          note?: string | null
          task_id?: string
          to_status?: Database["public"]["Enums"]["task_status"] | null
        }
        Relationships: [
          {
            foreignKeyName: "task_logs_task_id_fkey"
            columns: ["task_id"]
            isOneToOne: false
            referencedRelation: "tasks"
            referencedColumns: ["id"]
          },
        ]
      }
      tasks: {
        Row: {
          assigned_to: string | null
          attachments: Json
          completed_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_at: string | null
          expected_completion_at: string | null
          id: string
          notes: string | null
          priority: Database["public"]["Enums"]["task_priority"]
          project_id: string | null
          remark: string | null
          required_specialty:
            | Database["public"]["Enums"]["employee_specialty"]
            | null
          status: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          attachments?: Json
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_at?: string | null
          expected_completion_at?: string | null
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: string | null
          remark?: string | null
          required_specialty?:
            | Database["public"]["Enums"]["employee_specialty"]
            | null
          status?: Database["public"]["Enums"]["task_status"]
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          attachments?: Json
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_at?: string | null
          expected_completion_at?: string | null
          id?: string
          notes?: string | null
          priority?: Database["public"]["Enums"]["task_priority"]
          project_id?: string | null
          remark?: string | null
          required_specialty?:
            | Database["public"]["Enums"]["employee_specialty"]
            | null
          status?: Database["public"]["Enums"]["task_status"]
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "tasks_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "employee" | "client"
      blog_status: "draft" | "published"
      employee_specialty:
        | "graphic_designer"
        | "video_editor"
        | "developer"
        | "photographer"
        | "other"
      project_status:
        | "planning"
        | "active"
        | "on_hold"
        | "completed"
        | "cancelled"
      task_priority: "low" | "medium" | "high"
      task_status:
        | "pending"
        | "working"
        | "done"
        | "completed"
        | "in_progress"
        | "delayed"
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
      app_role: ["admin", "employee", "client"],
      blog_status: ["draft", "published"],
      employee_specialty: [
        "graphic_designer",
        "video_editor",
        "developer",
        "photographer",
        "other",
      ],
      project_status: [
        "planning",
        "active",
        "on_hold",
        "completed",
        "cancelled",
      ],
      task_priority: ["low", "medium", "high"],
      task_status: [
        "pending",
        "working",
        "done",
        "completed",
        "in_progress",
        "delayed",
      ],
    },
  },
} as const
