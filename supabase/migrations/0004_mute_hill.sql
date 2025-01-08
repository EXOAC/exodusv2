/*
  # Add Product Icons and Update Timestamps

  1. Changes
    - Add icon column to product_status table
    - Add default icons for products
    - Update timestamp handling
  
  2. Security
    - Maintain existing RLS policies
*/

-- Add icon column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'product_status' AND column_name = 'icon'
  ) THEN
    ALTER TABLE product_status ADD COLUMN icon text NOT NULL DEFAULT 'https://imgur.com/iC4dzF4.png';
  END IF;
END $$;

-- Update existing products with icons
UPDATE product_status 
SET 
  icon = CASE name
    WHEN 'HWID Spoofer' THEN 'https://imgur.com/mKEurLU.jpg'
    WHEN 'Apex External' THEN 'https://imgur.com/UuZHXyo.jpg'
    WHEN 'EFT External' THEN 'https://imgur.com/Ql4jRdx.png'
    WHEN 'EFT Chams' THEN 'https://imgur.com/1oof4SL.jpg'
    WHEN 'Rust External' THEN 'https://imgur.com/nwa5kOy.png'
    WHEN 'FN External' THEN 'https://imgur.com/3tA4SSS.png'
    ELSE 'https://imgur.com/iC4dzF4.png'
  END,
  last_updated = NOW();