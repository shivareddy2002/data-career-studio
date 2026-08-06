-- ============================================================
-- SHARED CONVENTIONS
-- ============================================================
CREATE EXTENSION IF NOT EXISTS pgcrypto;

DO $$ BEGIN
  CREATE TYPE public.app_role AS ENUM ('admin','moderator','instructor','learner');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.org_role AS ENUM ('owner','admin','instructor','member');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.record_status AS ENUM ('draft','active','published','archived','suspended');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE public.difficulty_level AS ENUM ('Beginner','Intermediate','Advanced');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- Stamps updated_at / updated_by and bumps the optimistic-locking version.
CREATE OR REPLACE FUNCTION public.tg_row_audit()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    NEW.created_at := COALESCE(NEW.created_at, now());
    NEW.created_by := COALESCE(NEW.created_by, auth.uid());
    NEW.updated_at := now();
    NEW.updated_by := COALESCE(NEW.updated_by, auth.uid());
    NEW.version := COALESCE(NEW.version, 1);
  ELSE
    NEW.created_at := OLD.created_at;
    NEW.created_by := OLD.created_by;
    NEW.updated_at := now();
    NEW.updated_by := COALESCE(auth.uid(), NEW.updated_by);
    NEW.version := COALESCE(OLD.version, 1) + 1;
  END IF;
  RETURN NEW;
END $$;

-- ============================================================
-- ORGANIZATIONS (multi-tenancy)
-- ============================================================
CREATE TABLE public.organizations (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         text NOT NULL UNIQUE,
  name         text NOT NULL,
  legal_name   text,
  plan         text NOT NULL DEFAULT 'free',
  email_domain text,
  logo_url     text,
  branding     jsonb NOT NULL DEFAULT '{}'::jsonb,
  settings     jsonb NOT NULL DEFAULT '{}'::jsonb,
  seat_limit   integer,
  status       public.record_status NOT NULL DEFAULT 'active',
  version      integer NOT NULL DEFAULT 1,
  deleted_at   timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  created_by   uuid,
  updated_by   uuid
);
CREATE INDEX idx_organizations_status ON public.organizations (status) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_organizations_audit BEFORE INSERT OR UPDATE ON public.organizations
  FOR EACH ROW EXECUTE FUNCTION public.tg_row_audit();

CREATE TABLE public.organization_members (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES public.organizations(id) ON DELETE CASCADE,
  user_id         uuid NOT NULL,
  role            public.org_role NOT NULL DEFAULT 'member',
  job_title       text,
  department      text,
  invited_by      uuid,
  joined_at       timestamptz,
  status          public.record_status NOT NULL DEFAULT 'active',
  version         integer NOT NULL DEFAULT 1,
  deleted_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  created_by      uuid,
  updated_by      uuid,
  UNIQUE (organization_id, user_id)
);
CREATE INDEX idx_org_members_user ON public.organization_members (user_id) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_org_members_audit BEFORE INSERT OR UPDATE ON public.organization_members
  FOR EACH ROW EXECUTE FUNCTION public.tg_row_audit();

-- ============================================================
-- IDENTITY
-- ============================================================
CREATE TABLE public.profiles (
  id                 uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id            uuid NOT NULL UNIQUE,
  organization_id    uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  username           text UNIQUE,
  display_name       text,
  headline           text,
  bio                text,
  avatar_url         text,
  country            text,
  timezone           text,
  current_role_title text,
  target_role_title  text,
  years_experience   integer,
  links              jsonb NOT NULL DEFAULT '{}'::jsonb,
  onboarding_stage   text NOT NULL DEFAULT 'new',
  onboarded_at       timestamptz,
  status             public.record_status NOT NULL DEFAULT 'active',
  version            integer NOT NULL DEFAULT 1,
  deleted_at         timestamptz,
  created_at         timestamptz NOT NULL DEFAULT now(),
  updated_at         timestamptz NOT NULL DEFAULT now(),
  created_by         uuid,
  updated_by         uuid
);
CREATE INDEX idx_profiles_org ON public.profiles (organization_id) WHERE deleted_at IS NULL;
CREATE TRIGGER trg_profiles_audit BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.tg_row_audit();

CREATE TABLE public.user_roles (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL,
  role       public.app_role NOT NULL,
  granted_by uuid,
  status     public.record_status NOT NULL DEFAULT 'active',
  version    integer NOT NULL DEFAULT 1,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  updated_by uuid,
  UNIQUE (user_id, role)
);
CREATE TRIGGER trg_user_roles_audit BEFORE INSERT OR UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.tg_row_audit();

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role AND deleted_at IS NULL
  )
$$;

CREATE OR REPLACE FUNCTION public.is_org_member(_org_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = _org_id AND user_id = _user_id AND deleted_at IS NULL
  )
$$;

CREATE OR REPLACE FUNCTION public.is_org_manager(_org_id uuid, _user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.organization_members
    WHERE organization_id = _org_id AND user_id = _user_id
      AND role IN ('owner','admin') AND deleted_at IS NULL
  )
$$;

CREATE TABLE public.user_preferences (
  id                     uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id                uuid NOT NULL UNIQUE,
  theme                  text NOT NULL DEFAULT 'dark',
  language               text NOT NULL DEFAULT 'en',
  timezone               text NOT NULL DEFAULT 'UTC',
  reduced_motion         boolean NOT NULL DEFAULT false,
  high_contrast          boolean NOT NULL DEFAULT false,
  font_scale             numeric(3,2) NOT NULL DEFAULT 1.0,
  email_notifications    boolean NOT NULL DEFAULT true,
  push_notifications     boolean NOT NULL DEFAULT false,
  weekly_digest          boolean NOT NULL DEFAULT true,
  profile_visibility     text NOT NULL DEFAULT 'public',
  ai_memory_enabled      boolean NOT NULL DEFAULT true,
  weekly_hours_goal      integer NOT NULL DEFAULT 5,
  learning_preferences   jsonb NOT NULL DEFAULT '{}'::jsonb,
  career_preferences     jsonb NOT NULL DEFAULT '{}'::jsonb,
  notification_settings  jsonb NOT NULL DEFAULT '{}'::jsonb,
  status                 public.record_status NOT NULL DEFAULT 'active',
  version                integer NOT NULL DEFAULT 1,
  deleted_at             timestamptz,
  created_at             timestamptz NOT NULL DEFAULT now(),
  updated_at             timestamptz NOT NULL DEFAULT now(),
  created_by             uuid,
  updated_by             uuid
);
CREATE TRIGGER trg_user_preferences_audit BEFORE INSERT OR UPDATE ON public.user_preferences
  FOR EACH ROW EXECUTE FUNCTION public.tg_row_audit();

-- ============================================================
-- AUDIT LOG
-- ============================================================
CREATE TABLE public.audit_logs (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  actor_id        uuid,
  action          text NOT NULL,
  entity_type     text NOT NULL,
  entity_id       uuid,
  changes         jsonb NOT NULL DEFAULT '{}'::jsonb,
  context         jsonb NOT NULL DEFAULT '{}'::jsonb,
  status          public.record_status NOT NULL DEFAULT 'active',
  version         integer NOT NULL DEFAULT 1,
  deleted_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  created_by      uuid,
  updated_by      uuid
);
CREATE INDEX idx_audit_logs_entity ON public.audit_logs (entity_type, entity_id);
CREATE INDEX idx_audit_logs_actor ON public.audit_logs (actor_id, created_at DESC);

-- ============================================================
-- GRANTS
-- ============================================================
GRANT SELECT, INSERT, UPDATE, DELETE ON public.organizations TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.organization_members TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT SELECT ON public.user_roles TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_preferences TO authenticated;
GRANT SELECT ON public.audit_logs TO authenticated;
GRANT ALL ON public.organizations, public.organization_members, public.profiles,
             public.user_roles, public.user_preferences, public.audit_logs TO service_role;

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.organizations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.organization_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "orgs_select_members" ON public.organizations FOR SELECT TO authenticated
  USING (deleted_at IS NULL AND (public.is_org_member(id, auth.uid()) OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "orgs_insert_auth" ON public.organizations FOR INSERT TO authenticated
  WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "orgs_update_managers" ON public.organizations FOR UPDATE TO authenticated
  USING (public.is_org_manager(id, auth.uid()) OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.is_org_manager(id, auth.uid()) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "org_members_select" ON public.organization_members FOR SELECT TO authenticated
  USING (deleted_at IS NULL AND (user_id = auth.uid()
     OR public.is_org_member(organization_id, auth.uid())
     OR public.has_role(auth.uid(),'admin')));
CREATE POLICY "org_members_manage" ON public.organization_members FOR ALL TO authenticated
  USING (public.is_org_manager(organization_id, auth.uid()) OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (public.is_org_manager(organization_id, auth.uid()) OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "profiles_select_authenticated" ON public.profiles FOR SELECT TO authenticated
  USING (deleted_at IS NULL);
CREATE POLICY "profiles_insert_own" ON public.profiles FOR INSERT TO authenticated
  WITH CHECK (user_id = auth.uid());
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "user_roles_select_own" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));

CREATE POLICY "user_prefs_own" ON public.user_preferences FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "audit_logs_select_admin" ON public.audit_logs FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(),'admin'));

-- ============================================================
-- SIGNUP BOOTSTRAP
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name, avatar_url, created_by, updated_by)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data ->> 'full_name', NEW.raw_user_meta_data ->> 'name', split_part(NEW.email,'@',1)),
    NEW.raw_user_meta_data ->> 'avatar_url',
    NEW.id, NEW.id
  )
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_preferences (user_id, created_by, updated_by)
  VALUES (NEW.id, NEW.id, NEW.id)
  ON CONFLICT (user_id) DO NOTHING;

  INSERT INTO public.user_roles (user_id, role, created_by, updated_by)
  VALUES (NEW.id, 'learner', NEW.id, NEW.id)
  ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END $$;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();