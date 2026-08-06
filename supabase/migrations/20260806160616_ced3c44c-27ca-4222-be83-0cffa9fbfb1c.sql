-- ============================================================
-- CONTENT VISIBILITY HELPER
-- ============================================================
CREATE OR REPLACE FUNCTION public.can_read_content(_org_id uuid, _status public.record_status, _deleted_at timestamptz)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT _deleted_at IS NULL AND (
    (_org_id IS NULL AND _status = 'published')
    OR (_org_id IS NOT NULL AND public.is_org_member(_org_id, auth.uid()))
    OR public.has_role(auth.uid(),'admin')
    OR public.has_role(auth.uid(),'instructor')
  )
$$;

CREATE OR REPLACE FUNCTION public.can_author_content()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT public.has_role(auth.uid(),'admin') OR public.has_role(auth.uid(),'instructor')
$$;

-- ============================================================
-- CONTENT TABLES
-- ============================================================
CREATE TABLE public.course_categories (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  slug            text NOT NULL,
  name            text NOT NULL,
  description     text,
  icon            text,
  position        integer NOT NULL DEFAULT 0,
  status          public.record_status NOT NULL DEFAULT 'published',
  version         integer NOT NULL DEFAULT 1,
  deleted_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  created_by      uuid,
  updated_by      uuid,
  UNIQUE (organization_id, slug)
);

CREATE TABLE public.learning_paths (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  category_id     uuid REFERENCES public.course_categories(id) ON DELETE SET NULL,
  slug            text NOT NULL,
  title           text NOT NULL,
  tagline         text,
  duration        text,
  difficulty      public.difficulty_level NOT NULL DEFAULT 'Beginner',
  audience        text,
  skills          text[] NOT NULL DEFAULT '{}',
  projects        text[] NOT NULL DEFAULT '{}',
  certifications  text[] NOT NULL DEFAULT '{}',
  interview_prep  text[] NOT NULL DEFAULT '{}',
  outcomes        text[] NOT NULL DEFAULT '{}',
  companies       text[] NOT NULL DEFAULT '{}',
  salary          jsonb NOT NULL DEFAULT '{}'::jsonb,
  roadmap         jsonb NOT NULL DEFAULT '[]'::jsonb,
  position        integer NOT NULL DEFAULT 0,
  status          public.record_status NOT NULL DEFAULT 'published',
  version         integer NOT NULL DEFAULT 1,
  deleted_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  created_by      uuid,
  updated_by      uuid,
  UNIQUE (organization_id, slug)
);

CREATE TABLE public.courses (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id     uuid REFERENCES public.organizations(id) ON DELETE CASCADE,
  category_id         uuid REFERENCES public.course_categories(id) ON DELETE SET NULL,
  slug                text NOT NULL,
  title               text NOT NULL,
  subtitle            text,
  level               public.difficulty_level NOT NULL DEFAULT 'Beginner',
  hours               numeric(6,2) NOT NULL DEFAULT 0,
  overview            text,
  objectives          text[] NOT NULL DEFAULT '{}',
  prerequisites       text[] NOT NULL DEFAULT '{}',
  tags                text[] NOT NULL DEFAULT '{}',
  capstone            jsonb NOT NULL DEFAULT '{}'::jsonb,
  interview_questions jsonb NOT NULL DEFAULT '[]'::jsonb,
  certificate         jsonb NOT NULL DEFAULT '{}'::jsonb,
  position            integer NOT NULL DEFAULT 0,
  status              public.record_status NOT NULL DEFAULT 'published',
  version             integer NOT NULL DEFAULT 1,
  deleted_at          timestamptz,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now(),
  created_by          uuid,
  updated_by          uuid,
  UNIQUE (organization_id, slug)
);

CREATE TABLE public.learning_path_courses (
  id               uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  learning_path_id uuid NOT NULL REFERENCES public.learning_paths(id) ON DELETE CASCADE,
  course_id        uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  position         integer NOT NULL DEFAULT 0,
  is_required      boolean NOT NULL DEFAULT true,
  status           public.record_status NOT NULL DEFAULT 'published',
  version          integer NOT NULL DEFAULT 1,
  deleted_at       timestamptz,
  created_at       timestamptz NOT NULL DEFAULT now(),
  updated_at       timestamptz NOT NULL DEFAULT now(),
  created_by       uuid,
  updated_by       uuid,
  UNIQUE (learning_path_id, course_id)
);

CREATE TABLE public.course_modules (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  slug        text NOT NULL,
  title       text NOT NULL,
  summary     text,
  difficulty  public.difficulty_level NOT NULL DEFAULT 'Beginner',
  objectives  text[] NOT NULL DEFAULT '{}',
  position    integer NOT NULL DEFAULT 0,
  status      public.record_status NOT NULL DEFAULT 'published',
  version     integer NOT NULL DEFAULT 1,
  deleted_at  timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  created_by  uuid,
  updated_by  uuid,
  UNIQUE (course_id, slug)
);

CREATE TABLE public.lessons (
  id           uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id    uuid NOT NULL REFERENCES public.course_modules(id) ON DELETE CASCADE,
  course_id    uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  slug         text NOT NULL,
  title        text NOT NULL,
  minutes      integer NOT NULL DEFAULT 0,
  difficulty   public.difficulty_level NOT NULL DEFAULT 'Beginner',
  intro        text,
  outcomes     text[] NOT NULL DEFAULT '{}',
  key_points   text[] NOT NULL DEFAULT '{}',
  theory       jsonb NOT NULL DEFAULT '[]'::jsonb,
  diagram      jsonb,
  examples     jsonb NOT NULL DEFAULT '[]'::jsonb,
  cheatsheet   jsonb NOT NULL DEFAULT '[]'::jsonb,
  flashcards   jsonb NOT NULL DEFAULT '[]'::jsonb,
  tutor        jsonb NOT NULL DEFAULT '{}'::jsonb,
  lab          jsonb,
  assignment   jsonb NOT NULL DEFAULT '{}'::jsonb,
  career_link  text,
  position     integer NOT NULL DEFAULT 0,
  status       public.record_status NOT NULL DEFAULT 'published',
  version      integer NOT NULL DEFAULT 1,
  deleted_at   timestamptz,
  created_at   timestamptz NOT NULL DEFAULT now(),
  updated_at   timestamptz NOT NULL DEFAULT now(),
  created_by   uuid,
  updated_by   uuid,
  UNIQUE (course_id, slug)
);
CREATE INDEX idx_lessons_module ON public.lessons (module_id, position) WHERE deleted_at IS NULL;

CREATE TABLE public.quiz_questions (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id      uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  external_id    text NOT NULL,
  kind           text NOT NULL,
  prompt         text NOT NULL,
  code           text,
  options        jsonb NOT NULL DEFAULT '[]'::jsonb,
  correct_answer jsonb NOT NULL,
  explanation    text,
  points         integer NOT NULL DEFAULT 1,
  position       integer NOT NULL DEFAULT 0,
  status         public.record_status NOT NULL DEFAULT 'published',
  version        integer NOT NULL DEFAULT 1,
  deleted_at     timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  created_by     uuid,
  updated_by     uuid,
  UNIQUE (lesson_id, external_id)
);

-- ============================================================
-- LEARNER PROGRESS
-- ============================================================
CREATE TABLE public.course_enrollments (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL,
  course_id         uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  learning_path_id  uuid REFERENCES public.learning_paths(id) ON DELETE SET NULL,
  organization_id   uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  progress_percent  numeric(5,2) NOT NULL DEFAULT 0,
  enrolled_at       timestamptz NOT NULL DEFAULT now(),
  started_at        timestamptz,
  completed_at      timestamptz,
  last_activity_at  timestamptz,
  status            public.record_status NOT NULL DEFAULT 'active',
  version           integer NOT NULL DEFAULT 1,
  deleted_at        timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  created_by        uuid,
  updated_by        uuid,
  UNIQUE (user_id, course_id)
);

CREATE TABLE public.lesson_progress (
  id              uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         uuid NOT NULL,
  lesson_id       uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id       uuid NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  state           text NOT NULL DEFAULT 'in_progress',
  seconds_spent   integer NOT NULL DEFAULT 0,
  last_position   integer NOT NULL DEFAULT 0,
  notes           text,
  completed_at    timestamptz,
  status          public.record_status NOT NULL DEFAULT 'active',
  version         integer NOT NULL DEFAULT 1,
  deleted_at      timestamptz,
  created_at      timestamptz NOT NULL DEFAULT now(),
  updated_at      timestamptz NOT NULL DEFAULT now(),
  created_by      uuid,
  updated_by      uuid,
  UNIQUE (user_id, lesson_id)
);
CREATE INDEX idx_lesson_progress_user_course ON public.lesson_progress (user_id, course_id);

CREATE TABLE public.quiz_attempts (
  id             uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id        uuid NOT NULL,
  lesson_id      uuid NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
  course_id      uuid REFERENCES public.courses(id) ON DELETE CASCADE,
  score          numeric(5,2) NOT NULL DEFAULT 0,
  total_points   integer NOT NULL DEFAULT 0,
  earned_points  integer NOT NULL DEFAULT 0,
  passed         boolean NOT NULL DEFAULT false,
  answers        jsonb NOT NULL DEFAULT '[]'::jsonb,
  seconds_spent  integer NOT NULL DEFAULT 0,
  attempt_number integer NOT NULL DEFAULT 1,
  status         public.record_status NOT NULL DEFAULT 'active',
  version        integer NOT NULL DEFAULT 1,
  deleted_at     timestamptz,
  created_at     timestamptz NOT NULL DEFAULT now(),
  updated_at     timestamptz NOT NULL DEFAULT now(),
  created_by     uuid,
  updated_by     uuid
);
CREATE INDEX idx_quiz_attempts_user ON public.quiz_attempts (user_id, lesson_id, created_at DESC);

CREATE TABLE public.certificates (
  id                uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id           uuid NOT NULL,
  course_id         uuid REFERENCES public.courses(id) ON DELETE SET NULL,
  learning_path_id  uuid REFERENCES public.learning_paths(id) ON DELETE SET NULL,
  organization_id   uuid REFERENCES public.organizations(id) ON DELETE SET NULL,
  title             text NOT NULL,
  recipient_name    text NOT NULL,
  verification_code text NOT NULL UNIQUE,
  score             numeric(5,2),
  issued_at         timestamptz NOT NULL DEFAULT now(),
  expires_at        timestamptz,
  is_public         boolean NOT NULL DEFAULT true,
  metadata          jsonb NOT NULL DEFAULT '{}'::jsonb,
  status            public.record_status NOT NULL DEFAULT 'active',
  version           integer NOT NULL DEFAULT 1,
  deleted_at        timestamptz,
  created_at        timestamptz NOT NULL DEFAULT now(),
  updated_at        timestamptz NOT NULL DEFAULT now(),
  created_by        uuid,
  updated_by        uuid
);

CREATE TABLE public.badges (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        text NOT NULL UNIQUE,
  name        text NOT NULL,
  description text,
  icon        text,
  tier        text NOT NULL DEFAULT 'bronze',
  xp_reward   integer NOT NULL DEFAULT 0,
  criteria    jsonb NOT NULL DEFAULT '{}'::jsonb,
  status      public.record_status NOT NULL DEFAULT 'published',
  version     integer NOT NULL DEFAULT 1,
  deleted_at  timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  created_by  uuid,
  updated_by  uuid
);

CREATE TABLE public.user_badges (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id    uuid NOT NULL,
  badge_id   uuid NOT NULL REFERENCES public.badges(id) ON DELETE CASCADE,
  earned_at  timestamptz NOT NULL DEFAULT now(),
  context    jsonb NOT NULL DEFAULT '{}'::jsonb,
  status     public.record_status NOT NULL DEFAULT 'active',
  version    integer NOT NULL DEFAULT 1,
  deleted_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  created_by uuid,
  updated_by uuid,
  UNIQUE (user_id, badge_id)
);

CREATE TABLE public.xp_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id     uuid NOT NULL,
  amount      integer NOT NULL,
  source      text NOT NULL,
  reason      text,
  entity_type text,
  entity_id   uuid,
  status      public.record_status NOT NULL DEFAULT 'active',
  version     integer NOT NULL DEFAULT 1,
  deleted_at  timestamptz,
  created_at  timestamptz NOT NULL DEFAULT now(),
  updated_at  timestamptz NOT NULL DEFAULT now(),
  created_by  uuid,
  updated_by  uuid
);
CREATE INDEX idx_xp_events_user ON public.xp_events (user_id, created_at DESC);

-- ============================================================
-- AUDIT TRIGGERS
-- ============================================================
DO $$
DECLARE t text;
BEGIN
  FOREACH t IN ARRAY ARRAY[
    'course_categories','learning_paths','courses','learning_path_courses','course_modules',
    'lessons','quiz_questions','course_enrollments','lesson_progress','quiz_attempts',
    'certificates','badges','user_badges','xp_events'
  ] LOOP
    EXECUTE format(
      'CREATE TRIGGER trg_%1$s_audit BEFORE INSERT OR UPDATE ON public.%1$I FOR EACH ROW EXECUTE FUNCTION public.tg_row_audit()', t);
  END LOOP;
END $$;

-- ============================================================
-- GRANTS
-- ============================================================
GRANT SELECT ON public.course_categories, public.learning_paths, public.courses,
  public.learning_path_courses, public.course_modules, public.lessons,
  public.quiz_questions, public.badges, public.certificates TO anon;

GRANT SELECT, INSERT, UPDATE, DELETE ON public.course_categories, public.learning_paths,
  public.courses, public.learning_path_courses, public.course_modules, public.lessons,
  public.quiz_questions, public.badges, public.course_enrollments, public.lesson_progress,
  public.quiz_attempts, public.certificates, public.user_badges, public.xp_events TO authenticated;

GRANT ALL ON public.course_categories, public.learning_paths, public.courses,
  public.learning_path_courses, public.course_modules, public.lessons, public.quiz_questions,
  public.course_enrollments, public.lesson_progress, public.quiz_attempts, public.certificates,
  public.badges, public.user_badges, public.xp_events TO service_role;

-- ============================================================
-- RLS
-- ============================================================
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_paths ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_path_courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certificates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.xp_events ENABLE ROW LEVEL SECURITY;

-- Public/global published content is readable by everyone (incl. anon)
CREATE POLICY "categories_read" ON public.course_categories FOR SELECT
  USING (deleted_at IS NULL AND (organization_id IS NULL AND status = 'published'
    OR public.is_org_member(organization_id, auth.uid()) OR public.can_author_content()));
CREATE POLICY "categories_write" ON public.course_categories FOR ALL TO authenticated
  USING (public.can_author_content()) WITH CHECK (public.can_author_content());

CREATE POLICY "paths_read" ON public.learning_paths FOR SELECT
  USING (deleted_at IS NULL AND (organization_id IS NULL AND status = 'published'
    OR public.is_org_member(organization_id, auth.uid()) OR public.can_author_content()));
CREATE POLICY "paths_write" ON public.learning_paths FOR ALL TO authenticated
  USING (public.can_author_content()) WITH CHECK (public.can_author_content());

CREATE POLICY "courses_read" ON public.courses FOR SELECT
  USING (deleted_at IS NULL AND (organization_id IS NULL AND status = 'published'
    OR public.is_org_member(organization_id, auth.uid()) OR public.can_author_content()));
CREATE POLICY "courses_write" ON public.courses FOR ALL TO authenticated
  USING (public.can_author_content()) WITH CHECK (public.can_author_content());

CREATE POLICY "path_courses_read" ON public.learning_path_courses FOR SELECT
  USING (deleted_at IS NULL AND EXISTS (
    SELECT 1 FROM public.courses c WHERE c.id = course_id
      AND public.can_read_content(c.organization_id, c.status, c.deleted_at)));
CREATE POLICY "path_courses_write" ON public.learning_path_courses FOR ALL TO authenticated
  USING (public.can_author_content()) WITH CHECK (public.can_author_content());

CREATE POLICY "modules_read" ON public.course_modules FOR SELECT
  USING (deleted_at IS NULL AND EXISTS (
    SELECT 1 FROM public.courses c WHERE c.id = course_id
      AND public.can_read_content(c.organization_id, c.status, c.deleted_at)));
CREATE POLICY "modules_write" ON public.course_modules FOR ALL TO authenticated
  USING (public.can_author_content()) WITH CHECK (public.can_author_content());

CREATE POLICY "lessons_read" ON public.lessons FOR SELECT
  USING (deleted_at IS NULL AND EXISTS (
    SELECT 1 FROM public.courses c WHERE c.id = course_id
      AND public.can_read_content(c.organization_id, c.status, c.deleted_at)));
CREATE POLICY "lessons_write" ON public.lessons FOR ALL TO authenticated
  USING (public.can_author_content()) WITH CHECK (public.can_author_content());

CREATE POLICY "quiz_questions_read" ON public.quiz_questions FOR SELECT
  USING (deleted_at IS NULL AND EXISTS (
    SELECT 1 FROM public.lessons l JOIN public.courses c ON c.id = l.course_id
    WHERE l.id = lesson_id AND public.can_read_content(c.organization_id, c.status, c.deleted_at)));
CREATE POLICY "quiz_questions_write" ON public.quiz_questions FOR ALL TO authenticated
  USING (public.can_author_content()) WITH CHECK (public.can_author_content());

CREATE POLICY "badges_read" ON public.badges FOR SELECT
  USING (deleted_at IS NULL AND status = 'published');
CREATE POLICY "badges_write" ON public.badges FOR ALL TO authenticated
  USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- Learner-owned rows
CREATE POLICY "enrollments_own" ON public.course_enrollments FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "lesson_progress_own" ON public.lesson_progress FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "quiz_attempts_own" ON public.quiz_attempts FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "user_badges_own" ON public.user_badges FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "xp_events_own" ON public.xp_events FOR ALL TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE POLICY "certificates_own" ON public.certificates FOR ALL TO authenticated
  USING (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  WITH CHECK (user_id = auth.uid() OR public.has_role(auth.uid(),'admin'));
CREATE POLICY "certificates_public_verify" ON public.certificates FOR SELECT
  USING (deleted_at IS NULL AND is_public = true AND status = 'active');