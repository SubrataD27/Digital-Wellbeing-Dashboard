export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      metrics: {
        Row: {
          id: string
          user_id: string
          focus_time: number
          screen_breaks: number
          activity_score: number
          sleep_quality: 'Poor' | 'Fair' | 'Good' | 'Excellent'
          mindful_minutes: number
          daylight_exposure: number
          date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          focus_time?: number
          screen_breaks?: number
          activity_score?: number
          sleep_quality?: 'Poor' | 'Fair' | 'Good' | 'Excellent'
          mindful_minutes?: number
          daylight_exposure?: number
          date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          focus_time?: number
          screen_breaks?: number
          activity_score?: number
          sleep_quality?: 'Poor' | 'Fair' | 'Good' | 'Excellent'
          mindful_minutes?: number
          daylight_exposure?: number
          date?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}