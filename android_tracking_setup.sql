-- Minimal Android Click Tracking Setup for GoTall
-- Run this in your Supabase SQL Editor to add Android tracking

-- 1. Add platform column to existing app_clicks table (if not exists)
ALTER TABLE public.app_clicks 
ADD COLUMN IF NOT EXISTS platform text CHECK (platform in ('ios', 'android'));

-- 2. Create index for better performance
CREATE INDEX IF NOT EXISTS idx_app_clicks_platform ON public.app_clicks(platform);

-- 3. Create a simple view for platform comparison
CREATE OR REPLACE VIEW public.platform_comparison AS
SELECT 
  platform,
  COUNT(*) as total_clicks,
  COUNT(DISTINCT metadata->>'session_id') as unique_sessions,
  DATE(created_at) as date
FROM public.app_clicks 
WHERE platform IS NOT NULL
GROUP BY platform, DATE(created_at)
ORDER BY date DESC, total_clicks DESC;

-- 4. Grant permissions
GRANT SELECT ON public.platform_comparison TO anon;

-- Usage Examples:
-- 
-- 1. Get platform breakdown for last 30 days:
-- SELECT platform, COUNT(*) as clicks 
-- FROM app_clicks 
-- WHERE created_at >= CURRENT_DATE - INTERVAL '30 days' 
-- AND platform IS NOT NULL
-- GROUP BY platform;
-- 
-- 2. Get daily platform comparison:
-- SELECT * FROM platform_comparison 
-- WHERE date >= CURRENT_DATE - INTERVAL '7 days';
-- 
-- 3. Get specific event by platform:
-- SELECT platform, COUNT(*) as clicks 
-- FROM app_clicks 
-- WHERE event_name LIKE '%_ios_clicked' OR event_name LIKE '%_android_clicked'
-- GROUP BY platform; 