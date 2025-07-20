-- Debug Analytics Data
-- Run this in Supabase SQL Editor to see what's actually in your app_clicks table

-- 1. Check total count
SELECT COUNT(*) as total_clicks FROM app_clicks;

-- 2. Check platform breakdown
SELECT 
  platform,
  COUNT(*) as count
FROM app_clicks 
GROUP BY platform
ORDER BY count DESC;

-- 3. Check event breakdown (top 10)
SELECT 
  event_name,
  COUNT(*) as count
FROM app_clicks 
GROUP BY event_name
ORDER BY count DESC
LIMIT 10;

-- 4. Check recent clicks
SELECT 
  event_name,
  platform,
  created_at
FROM app_clicks 
ORDER BY created_at DESC
LIMIT 10;

-- 5. Check for any NULL platforms
SELECT 
  COUNT(*) as null_platforms
FROM app_clicks 
WHERE platform IS NULL;

-- 6. Check for Android clicks specifically
SELECT 
  event_name,
  platform,
  created_at
FROM app_clicks 
WHERE event_name LIKE '%android%' OR platform = 'android'
ORDER BY created_at DESC; 