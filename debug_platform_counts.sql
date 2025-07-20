-- Get exact platform counts from app_clicks table
SELECT 
  CASE 
    WHEN platform IS NULL THEN 'NULL'
    WHEN platform = 'ios' THEN 'ios'
    WHEN platform = 'android' THEN 'android'
    ELSE 'other'
  END as platform_type,
  COUNT(*) as count
FROM app_clicks 
GROUP BY platform_type
ORDER BY count DESC; 