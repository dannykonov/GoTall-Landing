-- Creator attribution setup for query param links (e.g. ?c=dobbin)
-- Run this in your Supabase SQL Editor.

-- 1) Add creator attribution columns to visits and app_clicks.
ALTER TABLE public.visits
ADD COLUMN IF NOT EXISTS creator_slug text;

ALTER TABLE public.visits
ADD COLUMN IF NOT EXISTS creator_first_touch text;

ALTER TABLE public.visits
ADD COLUMN IF NOT EXISTS creator_last_touch text;

ALTER TABLE public.app_clicks
ADD COLUMN IF NOT EXISTS creator_slug text;

ALTER TABLE public.app_clicks
ADD COLUMN IF NOT EXISTS creator_first_touch text;

ALTER TABLE public.app_clicks
ADD COLUMN IF NOT EXISTS creator_last_touch text;

-- 2) Backfill creator columns from app_clicks metadata if present.
UPDATE public.app_clicks
SET
  creator_slug = COALESCE(creator_slug, NULLIF(metadata->>'creator_slug', '')),
  creator_first_touch = COALESCE(creator_first_touch, NULLIF(metadata->>'creator_first_touch', '')),
  creator_last_touch = COALESCE(creator_last_touch, NULLIF(metadata->>'creator_last_touch', ''))
WHERE metadata IS NOT NULL
  AND (
    creator_slug IS NULL
    OR creator_first_touch IS NULL
    OR creator_last_touch IS NULL
  );

-- 3) Indexes for creator + time based reporting queries.
CREATE INDEX IF NOT EXISTS idx_visits_creator_slug_created_at
  ON public.visits (creator_slug, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_app_clicks_creator_slug_created_at
  ON public.app_clicks (creator_slug, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_visits_creator_first_touch
  ON public.visits (creator_first_touch);

CREATE INDEX IF NOT EXISTS idx_app_clicks_creator_first_touch
  ON public.app_clicks (creator_first_touch);

-- 4) Daily funnel view by creator: opens, clicks, and CTR.
CREATE OR REPLACE VIEW public.creator_attribution_daily_funnel AS
WITH visit_metrics AS (
  SELECT
    DATE(v.created_at) AS date,
    COALESCE(
      NULLIF(v.creator_slug, ''),
      NULLIF(v.creator_last_touch, ''),
      NULLIF(v.creator_first_touch, ''),
      'unattributed'
    ) AS creator_slug,
    COUNT(*) AS opens,
    COUNT(DISTINCT v.session_id) AS open_sessions
  FROM public.visits v
  GROUP BY
    DATE(v.created_at),
    COALESCE(
      NULLIF(v.creator_slug, ''),
      NULLIF(v.creator_last_touch, ''),
      NULLIF(v.creator_first_touch, ''),
      'unattributed'
    )
),
click_metrics AS (
  SELECT
    DATE(c.created_at) AS date,
    COALESCE(
      NULLIF(c.creator_slug, ''),
      NULLIF(c.creator_last_touch, ''),
      NULLIF(c.creator_first_touch, ''),
      NULLIF(c.metadata->>'creator_slug', ''),
      NULLIF(c.metadata->>'creator_last_touch', ''),
      NULLIF(c.metadata->>'creator_first_touch', ''),
      'unattributed'
    ) AS creator_slug,
    COUNT(*) AS clicks,
    COUNT(DISTINCT NULLIF(c.metadata->>'session_id', '')) AS click_sessions
  FROM public.app_clicks c
  GROUP BY
    DATE(c.created_at),
    COALESCE(
      NULLIF(c.creator_slug, ''),
      NULLIF(c.creator_last_touch, ''),
      NULLIF(c.creator_first_touch, ''),
      NULLIF(c.metadata->>'creator_slug', ''),
      NULLIF(c.metadata->>'creator_last_touch', ''),
      NULLIF(c.metadata->>'creator_first_touch', ''),
      'unattributed'
    )
)
SELECT
  COALESCE(v.date, c.date) AS date,
  COALESCE(v.creator_slug, c.creator_slug) AS creator_slug,
  COALESCE(v.opens, 0) AS opens,
  COALESCE(v.open_sessions, 0) AS open_sessions,
  COALESCE(c.clicks, 0) AS clicks,
  COALESCE(c.click_sessions, 0) AS click_sessions,
  CASE
    WHEN COALESCE(v.opens, 0) = 0 THEN 0
    ELSE ROUND((COALESCE(c.clicks, 0)::numeric / v.opens::numeric) * 100, 2)
  END AS ctr_percent
FROM visit_metrics v
FULL OUTER JOIN click_metrics c
  ON v.date = c.date
 AND v.creator_slug = c.creator_slug
ORDER BY date DESC, creator_slug ASC;

-- 5) Parameterized function for dashboard/reporting queries.
CREATE OR REPLACE FUNCTION public.get_creator_attribution_funnel(
  start_date date DEFAULT CURRENT_DATE - 30,
  end_date date DEFAULT CURRENT_DATE
)
RETURNS TABLE (
  date date,
  creator_slug text,
  opens bigint,
  open_sessions bigint,
  clicks bigint,
  click_sessions bigint,
  ctr_percent numeric
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    f.date,
    f.creator_slug,
    f.opens,
    f.open_sessions,
    f.clicks,
    f.click_sessions,
    f.ctr_percent
  FROM public.creator_attribution_daily_funnel f
  WHERE f.date BETWEEN start_date AND end_date
  ORDER BY f.date DESC, f.creator_slug ASC;
END;
$$ LANGUAGE plpgsql;

-- 6) Grant read/execute access for client-side analytics dashboards.
GRANT SELECT ON public.creator_attribution_daily_funnel TO anon;
GRANT SELECT ON public.creator_attribution_daily_funnel TO authenticated;

GRANT EXECUTE ON FUNCTION public.get_creator_attribution_funnel(date, date) TO anon;
GRANT EXECUTE ON FUNCTION public.get_creator_attribution_funnel(date, date) TO authenticated;

-- Example query:
-- SELECT * FROM public.get_creator_attribution_funnel(CURRENT_DATE - 30, CURRENT_DATE);
