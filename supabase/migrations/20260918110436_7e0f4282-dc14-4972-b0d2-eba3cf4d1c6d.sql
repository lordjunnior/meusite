CREATE TABLE public.internal_search_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  query text NOT NULL,
  normalized_query text NOT NULL,
  results_count integer NOT NULL DEFAULT 0,
  clicked_path text,
  refined boolean NOT NULL DEFAULT false,
  abandoned boolean NOT NULL DEFAULT false,
  intent_cluster text,
  device text,
  origin_path text,
  session_key text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

CREATE INDEX internal_search_events_created_at_idx ON public.internal_search_events (created_at DESC);
CREATE INDEX internal_search_events_normalized_idx ON public.internal_search_events (normalized_query);
CREATE INDEX internal_search_events_cluster_idx ON public.internal_search_events (intent_cluster);

GRANT INSERT ON public.internal_search_events TO anon, authenticated;
GRANT SELECT ON public.internal_search_events TO authenticated;
GRANT ALL ON public.internal_search_events TO service_role;

ALTER TABLE public.internal_search_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can log an internal search"
ON public.internal_search_events
FOR INSERT
TO anon, authenticated
WITH CHECK (
  char_length(query) BETWEEN 1 AND 120
  AND char_length(normalized_query) BETWEEN 1 AND 120
  AND char_length(coalesce(clicked_path, '')) <= 200
  AND char_length(coalesce(origin_path, '')) <= 200
  AND char_length(coalesce(intent_cluster, '')) <= 80
  AND char_length(session_key) <= 40
  AND coalesce(device, '') IN ('', 'mobile', 'desktop')
  AND results_count BETWEEN 0 AND 1000
);

CREATE POLICY "Admins can read internal searches"
ON public.internal_search_events
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Deny update to public roles"
ON public.internal_search_events
AS RESTRICTIVE
FOR UPDATE
TO anon, authenticated
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny delete to public roles"
ON public.internal_search_events
AS RESTRICTIVE
FOR DELETE
TO anon, authenticated
USING (false);