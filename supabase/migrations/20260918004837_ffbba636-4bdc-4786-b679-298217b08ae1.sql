-- 1) Roles infrastructure
DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can read their own roles" ON public.user_roles;
CREATE POLICY "Users can read their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- 2) Storage: audiobook uploads restricted to admins
DROP POLICY IF EXISTS "Authenticated users can upload audiobooks" ON storage.objects;

CREATE POLICY "Only admins can upload audiobooks"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'audiobooks' AND public.has_role(auth.uid(), 'admin'));

-- 3) LGPD consent on leads
ALTER TABLE public.leads
  ADD COLUMN IF NOT EXISTS consentimento_lgpd BOOLEAN NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS consentimento_em TIMESTAMP WITH TIME ZONE;

ALTER TABLE public.leads DROP CONSTRAINT IF EXISTS leads_consentimento_obrigatorio;
ALTER TABLE public.leads
  ADD CONSTRAINT leads_consentimento_obrigatorio CHECK (consentimento_lgpd = true) NOT VALID;

-- 4) Anti-spam rate limit at database level
CREATE OR REPLACE FUNCTION public.leads_rate_limit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  recent_count INTEGER;
  last_same INTEGER;
BEGIN
  SELECT count(*) INTO recent_count
  FROM public.leads
  WHERE lower(email) = lower(NEW.email)
    AND created_at > now() - interval '1 hour';

  IF recent_count >= 3 THEN
    RAISE EXCEPTION 'rate_limit_exceeded';
  END IF;

  SELECT count(*) INTO last_same
  FROM public.leads
  WHERE lower(email) = lower(NEW.email)
    AND interesse = NEW.interesse
    AND created_at > now() - interval '1 minute';

  IF last_same >= 1 THEN
    RAISE EXCEPTION 'rate_limit_exceeded';
  END IF;

  NEW.consentimento_em := COALESCE(NEW.consentimento_em, now());
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_rate_limit_trigger ON public.leads;
CREATE TRIGGER leads_rate_limit_trigger
BEFORE INSERT ON public.leads
FOR EACH ROW EXECUTE FUNCTION public.leads_rate_limit();

CREATE INDEX IF NOT EXISTS leads_email_created_at_idx ON public.leads (lower(email), created_at DESC);