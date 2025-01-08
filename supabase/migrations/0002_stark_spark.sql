/*
  # Seed Initial Product Data

  1. New Data
    - Initial product status records
    - Status history entries

  2. Changes
    - Inserts initial product data with proper status enum values
    - Creates initial history records with proper status casting
*/

-- Insert initial product data
INSERT INTO product_status (name, status, active_users, last_updated, count_updated)
VALUES
  ('HWID Spoofer', 'undetected'::product_status_type, 892, NOW(), NOW()),
  ('Apex External', 'undetected'::product_status_type, 78, NOW(), NOW()),
  ('EFT External', 'closed'::product_status_type, 1247, NOW(), NOW()),
  ('EFT Chams', 'undetected'::product_status_type, 534, NOW(), NOW()),
  ('Rust External', 'undetected'::product_status_type, 156, NOW(), NOW()),
  ('FN External', 'testing'::product_status_type, 3, NOW(), NOW()),
  ('PUBG External', 'closed'::product_status_type, 0, NOW(), NOW()),
  ('DayZ External', 'closed'::product_status_type, 0, NOW(), NOW())
ON CONFLICT (name) 
DO UPDATE SET
  status = EXCLUDED.status,
  active_users = EXCLUDED.active_users,
  last_updated = EXCLUDED.last_updated,
  count_updated = EXCLUDED.count_updated;

-- Add initial history entries
INSERT INTO status_history (product_id, old_status, new_status)
SELECT 
  id,
  CASE status
    WHEN 'undetected'::product_status_type THEN 'testing'::product_status_type
    WHEN 'detected'::product_status_type THEN 'undetected'::product_status_type
    WHEN 'testing'::product_status_type THEN 'undetected'::product_status_type
    WHEN 'updating'::product_status_type THEN 'detected'::product_status_type
    WHEN 'closed'::product_status_type THEN 'detected'::product_status_type
  END as old_status,
  status as new_status
FROM product_status;