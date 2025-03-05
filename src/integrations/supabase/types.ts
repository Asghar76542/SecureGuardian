export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          changes: Json | null
          created_at: string | null
          entity_id: string
          entity_type: string
          id: string
          ip_address: string | null
          org_id: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          changes?: Json | null
          created_at?: string | null
          entity_id: string
          entity_type: string
          id?: string
          ip_address?: string | null
          org_id?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          changes?: Json | null
          created_at?: string | null
          entity_id?: string
          entity_type?: string
          id?: string
          ip_address?: string | null
          org_id?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "pending_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "audit_logs_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      client_tiers: {
        Row: {
          created_at: string | null
          description: string | null
          features: Json
          id: string
          is_popular: boolean | null
          order: number
          price: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          is_popular?: boolean | null
          order: number
          price: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          is_popular?: boolean | null
          order?: number
          price?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      device_configurations: {
        Row: {
          created_at: string | null
          id: string
          name: string
          security_level: Database["public"]["Enums"]["security_level"]
          settings: Json | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          security_level?: Database["public"]["Enums"]["security_level"]
          settings?: Json | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          security_level?: Database["public"]["Enums"]["security_level"]
          settings?: Json | null
          updated_at?: string | null
        }
        Relationships: []
      }
      devices: {
        Row: {
          assigned_to: string | null
          configuration_id: string | null
          created_at: string | null
          id: string
          org_id: string
          serial_number: string
          status: Database["public"]["Enums"]["device_status"]
          type: Database["public"]["Enums"]["device_type"]
          updated_at: string | null
        }
        Insert: {
          assigned_to?: string | null
          configuration_id?: string | null
          created_at?: string | null
          id?: string
          org_id: string
          serial_number: string
          status?: Database["public"]["Enums"]["device_status"]
          type: Database["public"]["Enums"]["device_type"]
          updated_at?: string | null
        }
        Update: {
          assigned_to?: string | null
          configuration_id?: string | null
          created_at?: string | null
          id?: string
          org_id?: string
          serial_number?: string
          status?: Database["public"]["Enums"]["device_status"]
          type?: Database["public"]["Enums"]["device_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "devices_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "pending_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devices_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devices_configuration_id_fkey"
            columns: ["configuration_id"]
            isOneToOne: false
            referencedRelation: "device_configurations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "devices_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      features: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          order: number
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          order: number
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          order?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      hero_content: {
        Row: {
          created_at: string | null
          description: string
          id: string
          restricted_banner: string
          subtitle: string
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          restricted_banner: string
          subtitle: string
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          restricted_banner?: string
          subtitle?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      invoices: {
        Row: {
          amount: number
          created_at: string | null
          due_date: string
          id: string
          org_id: string
          paid_date: string | null
          status: Database["public"]["Enums"]["invoice_status"]
          subscription_id: string
          updated_at: string | null
        }
        Insert: {
          amount: number
          created_at?: string | null
          due_date: string
          id?: string
          org_id: string
          paid_date?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subscription_id: string
          updated_at?: string | null
        }
        Update: {
          amount?: number
          created_at?: string | null
          due_date?: string
          id?: string
          org_id?: string
          paid_date?: string | null
          status?: Database["public"]["Enums"]["invoice_status"]
          subscription_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "invoices_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "invoices_subscription_id_fkey"
            columns: ["subscription_id"]
            isOneToOne: false
            referencedRelation: "subscriptions"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          created_at: string | null
          id: string
          industry: string | null
          name: string
          status: string | null
          type: Database["public"]["Enums"]["org_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          industry?: string | null
          name: string
          status?: string | null
          type: Database["public"]["Enums"]["org_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          industry?: string | null
          name?: string
          status?: string | null
          type?: Database["public"]["Enums"]["org_type"]
          updated_at?: string | null
        }
        Relationships: []
      }
      partnerships: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          name: string
          order: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          name: string
          order: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          name?: string
          order?: number
          updated_at?: string | null
        }
        Relationships: []
      }
      product_plans: {
        Row: {
          billing_cycle: string
          created_at: string | null
          description: string | null
          features: Json
          id: string
          is_active: boolean
          is_popular: boolean | null
          name: string
          price: number
          product_id: string
          updated_at: string | null
        }
        Insert: {
          billing_cycle?: string
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean
          is_popular?: boolean | null
          name: string
          price: number
          product_id: string
          updated_at?: string | null
        }
        Update: {
          billing_cycle?: string
          created_at?: string | null
          description?: string | null
          features?: Json
          id?: string
          is_active?: boolean
          is_popular?: boolean | null
          name?: string
          price?: number
          product_id?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "product_plans_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      products: {
        Row: {
          created_at: string | null
          description: string
          features: Json
          id: string
          is_active: boolean
          name: string
          type: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          features?: Json
          id?: string
          is_active?: boolean
          name: string
          type: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          features?: Json
          id?: string
          is_active?: boolean
          name?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      purchase_order_items: {
        Row: {
          created_at: string | null
          id: string
          product_id: string
          product_plan_id: string
          purchase_order_id: string
          quantity: number
          total_price: number
          unit_price: number
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          product_id: string
          product_plan_id: string
          purchase_order_id: string
          quantity?: number
          total_price: number
          unit_price: number
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          product_id?: string
          product_plan_id?: string
          purchase_order_id?: string
          quantity?: number
          total_price?: number
          unit_price?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "purchase_order_items_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_product_plan_id_fkey"
            columns: ["product_plan_id"]
            isOneToOne: false
            referencedRelation: "product_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "pending_purchase_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_order_items_purchase_order_id_fkey"
            columns: ["purchase_order_id"]
            isOneToOne: false
            referencedRelation: "purchase_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      purchase_orders: {
        Row: {
          amount: number
          approval_date: string | null
          approved_by: string | null
          billing_cycle: string
          created_at: string | null
          id: string
          notes: string | null
          org_id: string | null
          payment_status: string
          product_plan_id: string
          rejection_reason: string | null
          status: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          approval_date?: string | null
          approved_by?: string | null
          billing_cycle: string
          created_at?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          payment_status?: string
          product_plan_id: string
          rejection_reason?: string | null
          status?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          approval_date?: string | null
          approved_by?: string | null
          billing_cycle?: string
          created_at?: string | null
          id?: string
          notes?: string | null
          org_id?: string | null
          payment_status?: string
          product_plan_id?: string
          rejection_reason?: string | null
          status?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "purchase_orders_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "pending_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_approved_by_fkey"
            columns: ["approved_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_product_plan_id_fkey"
            columns: ["product_plan_id"]
            isOneToOne: false
            referencedRelation: "product_plans"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "pending_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "purchase_orders_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      security_incidents: {
        Row: {
          created_at: string | null
          description: string
          device_id: string | null
          id: string
          org_id: string
          resolution: string | null
          severity: Database["public"]["Enums"]["incident_severity"]
          status: Database["public"]["Enums"]["incident_status"]
          type: Database["public"]["Enums"]["incident_type"]
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          device_id?: string | null
          id?: string
          org_id: string
          resolution?: string | null
          severity?: Database["public"]["Enums"]["incident_severity"]
          status?: Database["public"]["Enums"]["incident_status"]
          type: Database["public"]["Enums"]["incident_type"]
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          device_id?: string | null
          id?: string
          org_id?: string
          resolution?: string | null
          severity?: Database["public"]["Enums"]["incident_severity"]
          status?: Database["public"]["Enums"]["incident_status"]
          type?: Database["public"]["Enums"]["incident_type"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "security_incidents_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "security_incidents_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      security_standards: {
        Row: {
          created_at: string | null
          description: string
          icon: string
          id: string
          order: number
          specifications: Json | null
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          icon: string
          id?: string
          order: number
          specifications?: Json | null
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          icon?: string
          id?: string
          order?: number
          specifications?: Json | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subscriptions: {
        Row: {
          billing_cycle: Database["public"]["Enums"]["billing_cycle"]
          created_at: string | null
          end_date: string | null
          id: string
          org_id: string
          plan_type: Database["public"]["Enums"]["plan_type"]
          start_date: string
          status: Database["public"]["Enums"]["subscription_status"]
          updated_at: string | null
        }
        Insert: {
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"]
          created_at?: string | null
          end_date?: string | null
          id?: string
          org_id: string
          plan_type?: Database["public"]["Enums"]["plan_type"]
          start_date: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string | null
        }
        Update: {
          billing_cycle?: Database["public"]["Enums"]["billing_cycle"]
          created_at?: string | null
          end_date?: string | null
          id?: string
          org_id?: string
          plan_type?: Database["public"]["Enums"]["plan_type"]
          start_date?: string
          status?: Database["public"]["Enums"]["subscription_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "subscriptions_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      support_tickets: {
        Row: {
          created_at: string | null
          customer_id: string | null
          description: string
          device_id: string | null
          id: string
          org_id: string
          priority: Database["public"]["Enums"]["ticket_priority"]
          resolution: string | null
          status: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          customer_id?: string | null
          description: string
          device_id?: string | null
          id?: string
          org_id: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          customer_id?: string | null
          description?: string
          device_id?: string | null
          id?: string
          org_id?: string
          priority?: Database["public"]["Enums"]["ticket_priority"]
          resolution?: string | null
          status?: Database["public"]["Enums"]["ticket_status"]
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "support_tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "pending_user_profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_customer_id_fkey"
            columns: ["customer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_device_id_fkey"
            columns: ["device_id"]
            isOneToOne: false
            referencedRelation: "devices"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "support_tickets_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      users: {
        Row: {
          approval_status: string
          created_at: string | null
          email: string
          full_name: string
          id: string
          last_login: string | null
          org_id: string | null
          phone: string | null
          role: Database["public"]["Enums"]["user_role"]
          status: Database["public"]["Enums"]["user_status"]
          updated_at: string | null
        }
        Insert: {
          approval_status?: string
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          last_login?: string | null
          org_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string | null
        }
        Update: {
          approval_status?: string
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          last_login?: string | null
          org_id?: string | null
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          status?: Database["public"]["Enums"]["user_status"]
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "users_org_id_fkey"
            columns: ["org_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      pending_purchase_orders: {
        Row: {
          amount: number | null
          billing_cycle: string | null
          created_at: string | null
          customer_email: string | null
          customer_name: string | null
          id: string | null
          organization_name: string | null
          plan_name: string | null
          product_name: string | null
          status: string | null
        }
        Relationships: []
      }
      pending_user_profiles: {
        Row: {
          approval_status: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string | null
          role: Database["public"]["Enums"]["user_role"] | null
        }
        Insert: {
          approval_status?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Update: {
          approval_status?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
        }
        Relationships: []
      }
    }
    Functions: {
      approve_purchase_order: {
        Args: {
          order_id: string
          admin_id: string
        }
        Returns: boolean
      }
      approve_user: {
        Args: {
          user_uuid: string
        }
        Returns: boolean
      }
      check_rls_status: {
        Args: Record<PropertyKey, never>
        Returns: undefined
      }
      create_user_profile: {
        Args: {
          user_id: string
          user_email: string
          user_full_name?: string
          user_role?: string
        }
        Returns: boolean
      }
      get_user_org_id: {
        Args: {
          user_id: string
        }
        Returns: string
      }
      get_user_role:
        | {
            Args: Record<PropertyKey, never>
            Returns: string
          }
        | {
            Args: {
              user_id: string
            }
            Returns: Database["public"]["Enums"]["user_role"]
          }
      has_role: {
        Args: {
          user_id: string
          role_name: string
        }
        Returns: boolean
      }
      is_admin: {
        Args: {
          user_id: string
        }
        Returns: boolean
      }
      is_user_approved:
        | {
            Args: Record<PropertyKey, never>
            Returns: boolean
          }
        | {
            Args: {
              user_uuid: string
            }
            Returns: boolean
          }
      reject_purchase_order: {
        Args: {
          order_id: string
          admin_id: string
          reason: string
        }
        Returns: boolean
      }
      reject_user: {
        Args: {
          user_uuid: string
        }
        Returns: boolean
      }
      users_in_same_org: {
        Args: {
          user_id: string
          target_user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      approval_status: "pending" | "approved" | "rejected"
      billing_cycle: "monthly" | "annually"
      device_status: "active" | "inactive" | "pending" | "maintenance"
      device_type: "ios" | "android" | "macbook" | "imac" | "tablet"
      incident_severity: "low" | "medium" | "high" | "critical"
      incident_status: "open" | "investigating" | "resolved" | "closed"
      incident_type: "breach" | "attempt" | "loss" | "other"
      invoice_status: "paid" | "pending" | "overdue"
      org_type: "enterprise" | "government" | "small_business"
      plan_type: "basic" | "professional" | "enterprise"
      security_level: "standard" | "enhanced" | "maximum"
      subscription_status: "active" | "cancelled" | "pending"
      ticket_priority: "low" | "medium" | "high" | "urgent"
      ticket_status: "open" | "in_progress" | "resolved" | "closed"
      user_role: "admin" | "user" | "manager"
      user_status: "active" | "inactive" | "pending"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
