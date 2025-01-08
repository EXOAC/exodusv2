/*
  # Fix RLS Policies

  1. Changes
    - Add insert policy for product_status table
    - Update existing policies to be more specific
    - Add policies for upsert operations
  
  2. Security
    - Maintain read access for public
    - Allow authenticated users to perform updates
    - Enable service role to manage all operations
*/

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Enable read access for all users" ON product_status;
DROP POLICY IF EXISTS "Enable all operations for service role" ON product_status;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON product_status;

-- Create new policies for product_status
CREATE POLICY "Allow public read access" ON product_status
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert" ON product_status
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update" ON product_status
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON product_status
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Update status_history policies
DROP POLICY IF EXISTS "Enable read access for all users" ON status_history;
DROP POLICY IF EXISTS "Enable all operations for service role" ON status_history;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON status_history;

CREATE POLICY "Allow public read access" ON status_history
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow authenticated users to insert" ON status_history
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Allow service role full access" ON status_history
  FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);