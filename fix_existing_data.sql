-- Fix existing app_clicks data to assign platform values
-- Run this in your Supabase SQL Editor after running the android_tracking_setup.sql

-- 1. Update existing clicks to assign platform based on event names
UPDATE public.app_clicks 
SET platform = 'ios' 
WHERE platform IS NULL 
AND (event_name LIKE '%_ios_clicked' OR event_name LIKE '%ios%');

UPDATE public.app_clicks 
SET platform = 'android' 
WHERE platform IS NULL 
AND (event_name LIKE '%_android_clicked' OR event_name LIKE '%android%');

-- 2. For remaining clicks without platform info, assign a default
-- (This preserves your existing data while making it visible in analytics)
UPDATE public.app_clicks 
SET platform = 'ios' 
WHERE platform IS NULL;

-- 3. Verify the update worked
SELECT 
  platform,
  COUNT(*) as total_clicks
FROM public.app_clicks 
GROUP BY platform
ORDER BY total_clicks DESC;

-- 4. Check a few sample records to confirm
SELECT 
  event_name,
  platform,
  created_at
FROM public.app_clicks 
ORDER BY created_at DESC
LIMIT 10; 