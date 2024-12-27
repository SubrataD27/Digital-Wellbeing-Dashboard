/*
  # Create metrics table for wellbeing tracking

  1. New Tables
    - `metrics`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `focus_time` (integer)
      - `screen_breaks` (integer)
      - `activity_score` (integer)
      - `sleep_quality` (text)
      - `mindful_minutes` (integer)
      - `daylight_exposure` (integer)
      - `date` (date)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `metrics` table
    - Add policies for authenticated users to manage their own data
*/

CREATE TABLE metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  focus_time integer DEFAULT 0,
  screen_breaks integer DEFAULT 0,
  activity_score integer DEFAULT 0,
  sleep_quality text DEFAULT 'Fair',
  mindful_minutes integer DEFAULT 0,
  daylight_exposure integer DEFAULT 0,
  date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  CONSTRAINT valid_sleep_quality CHECK (sleep_quality IN ('Poor', 'Fair', 'Good', 'Excellent'))
);

ALTER TABLE metrics ENABLE ROW LEVEL SECURITY;

-- Policy to allow users to read their own metrics
CREATE POLICY "Users can read own metrics"
  ON metrics
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

-- Policy to allow users to insert their own metrics
CREATE POLICY "Users can insert own metrics"
  ON metrics
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Policy to allow users to update their own metrics
CREATE POLICY "Users can update own metrics"
  ON metrics
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);