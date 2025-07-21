-- Simple fix for app_clicks table permissions
-- Run this in your Supabase SQL Editor

-- 1. Add platform column if it doesn't exist
ALTER TABLE public.app_clicks 
ADD COLUMN IF NOT EXISTS platform text;

-- 2. Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_app_clicks_platform ON public.app_clicks(platform);
CREATE INDEX IF NOT EXISTS idx_app_clicks_event_name ON public.app_clicks(event_name);

-- 3. Drop existing policies (ignore errors if they don't exist)
DROP POLICY IF EXISTS "Allow public inserts for app_clicks" ON public.app_clicks;
DROP POLICY IF EXISTS "Allow public reads for app_clicks" ON public.app_clicks;
DROP POLICY IF EXISTS "Allow anon reads for app_clicks" ON public.app_clicks;

-- 4. Create new policies that allow anonymous access
CREATE POLICY "Allow public inserts for app_clicks" ON public.app_clicks
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow anon reads for app_clicks" ON public.app_clicks
  FOR SELECT USING (true);

-- 5. Grant permissions to anonymous and authenticated users
GRANT SELECT ON public.app_clicks TO anon;
GRANT INSERT ON public.app_clicks TO anon;
GRANT SELECT ON public.app_clicks TO authenticated;
GRANT INSERT ON public.app_clicks TO authenticated;

-- 6. Update platform values for existing data
UPDATE public.app_clicks 
SET platform = 'ios' 
WHERE platform IS NULL 
AND (event_name LIKE '%_ios_%' OR event_name LIKE '%ios%');

UPDATE public.app_clicks 
SET platform = 'android' 
WHERE platform IS NULL 
AND (event_name LIKE '%_android_%' OR event_name LIKE '%android%');

-- 7. Set remaining NULL platforms to 'ios' (based on your data showing mostly iOS)
UPDATE public.app_clicks 
SET platform = 'ios' 
WHERE platform IS NULL;

-- 8. Test the setup
SELECT 
  platform,
  COUNT(*) as total_clicks
FROM public.app_clicks 
GROUP BY platform
ORDER BY total_clicks DESC; 