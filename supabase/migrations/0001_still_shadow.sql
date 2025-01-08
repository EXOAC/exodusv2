/*
  # Initial Schema Setup with RLS Policies

  1. New Tables
    - product_status: Stores current status for each product
    - status_history: Tracks status changes over time
  
  2. Security
    - Enable RLS on both tables
    - Create policies for authenticated and anonymous access
    - Add function for status updates
*/

-- Create enum for product status
CREATE TYPE product_status_type AS ENUM (
  'undetected',
  'detected', 
  'testing',
  'updating',
  'closed'
);

-- Create product_status table
CREATE TABLE IF NOT EXISTS product_status (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  status product_status_type NOT NULL DEFAULT 'undetected',
  last_updated timestamptz DEFAULT now(),
  active_users integer DEFAULT 0,
  count_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create status_history table
CREATE TABLE IF NOT EXISTS status_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid REFERENCES product_status(id) ON DELETE CASCADE,
  old_status product_status_type NOT NULL,
  new_status product_status_type NOT NULL,
  changed_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE product_status ENABLE ROW LEVEL SECURITY;
ALTER TABLE status_history ENABLE ROW LEVEL SECURITY;

-- Create policies for product_status
CREATE POLICY "Enable read access for all users" ON product_status
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Enable all operations for service role" ON product_status
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON product_status
  FOR UPDATE TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create policies for status_history
CREATE POLICY "Enable read access for all users" ON status_history
  FOR SELECT TO public
  USING (true);

CREATE POLICY "Enable all operations for service role" ON status_history
  FOR ALL TO service_role
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Enable insert for authenticated users" ON status_history
  FOR INSERT TO authenticated
  WITH CHECK (true);

-- Create function to update status and record history
CREATE OR REPLACE FUNCTION update_product_status(
  product_name text,
  new_status product_status_type
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  product_id uuid;
  old_status product_status_type;
BEGIN
  -- Get product info
  SELECT id, status INTO product_id, old_status
  FROM product_status
  WHERE name = product_name;

  -- Update status if different
  IF old_status IS DISTINCT FROM new_status THEN
    UPDATE product_status
    SET 
      status = new_status,
      last_updated = now()
    WHERE id = product_id;

    -- Record in history
    INSERT INTO status_history (product_id, old_status, new_status)
    VALUES (product_id, old_status, new_status);
  END IF;

  RETURN product_id;
END;
$$;