import { queryOptions } from "@tanstack/react-query";
import {
  getCourse,
  getLearningPath,
  getLesson,
  listCourses,
  listLearningPaths,
} from "./learning.functions";

export const learningPathsQuery = () =>
  queryOptions({ queryKey: ["learning-paths"], queryFn: () => listLearningPaths() });

export const learningPathQuery = (slug: string) =>
  queryOptions({
    queryKey: ["learning-path", slug],
    queryFn: () => getLearningPath({ data: { slug } }),
  });

export const coursesQuery = () =>
  queryOptions({ queryKey: ["courses"], queryFn: () => listCourses() });

export const courseQuery = (slug: string) =>
  queryOptions({ queryKey: ["course", slug], queryFn: () => getCourse({ data: { slug } }) });

export const lessonQuery = (courseSlug: string, lessonSlug: string) =>
  queryOptions({
    queryKey: ["lesson", courseSlug, lessonSlug],
    queryFn: () => getLesson({ data: { courseSlug, lessonSlug } }),
  });