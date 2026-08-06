import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const SlugInput = z.object({ slug: z.string() });

/** Published, platform-wide learning paths ordered for display. */
export const listLearningPaths = createServerFn({ method: "GET" }).handler(async () => {
  const { createPublicServerClient } = await import("./supabase-public.server");
  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("learning_paths")
    .select("id,slug,title,tagline,duration,difficulty,audience,skills,outcomes,companies,salary,position")
    .is("organization_id", null)
    .eq("status", "published")
    .is("deleted_at", null)
    .order("position", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

/** A single learning path with the courses attached to it. */
export const getLearningPath = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => SlugInput.parse(input))
  .handler(async ({ data: input }) => {
    const { createPublicServerClient } = await import("./supabase-public.server");
    const supabase = createPublicServerClient();
    const { data, error } = await supabase
      .from("learning_paths")
      .select(
        "*, learning_path_courses(position,is_required,courses(id,slug,title,subtitle,level,hours,overview))",
      )
      .eq("slug", input.slug)
      .is("deleted_at", null)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

/** Published course catalogue. */
export const listCourses = createServerFn({ method: "GET" }).handler(async () => {
  const { createPublicServerClient } = await import("./supabase-public.server");
  const supabase = createPublicServerClient();
  const { data, error } = await supabase
    .from("courses")
    .select("id,slug,title,subtitle,level,hours,overview,objectives,tags,position")
    .is("organization_id", null)
    .eq("status", "published")
    .is("deleted_at", null)
    .order("position", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
});

/** A course with its modules and lesson outlines. */
export const getCourse = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => SlugInput.parse(input))
  .handler(async ({ data: input }) => {
    const { createPublicServerClient } = await import("./supabase-public.server");
    const supabase = createPublicServerClient();
    const { data, error } = await supabase
      .from("courses")
      .select(
        "*, course_modules(id,slug,title,summary,difficulty,objectives,position, lessons(id,slug,title,minutes,difficulty,intro,position))",
      )
      .eq("slug", input.slug)
      .is("deleted_at", null)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data;
  });

/** A full lesson, including its quiz questions. */
export const getLesson = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) =>
    z.object({ courseSlug: z.string(), lessonSlug: z.string() }).parse(input),
  )
  .handler(async ({ data: input }) => {
    const { createPublicServerClient } = await import("./supabase-public.server");
    const supabase = createPublicServerClient();
    const { data: course, error: courseError } = await supabase
      .from("courses")
      .select("id,slug,title")
      .eq("slug", input.courseSlug)
      .is("deleted_at", null)
      .maybeSingle();
    if (courseError) throw new Error(courseError.message);
    if (!course) return null;

    const { data, error } = await supabase
      .from("lessons")
      .select("*, quiz_questions(id,external_id,kind,prompt,code,options,correct_answer,explanation,points,position)")
      .eq("course_id", course.id)
      .eq("slug", input.lessonSlug)
      .is("deleted_at", null)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return data ? { course, lesson: data } : null;
  });