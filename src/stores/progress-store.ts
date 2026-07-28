import { create } from "zustand";
import { persist } from "zustand/middleware";

export type LessonKey = string; // `${courseSlug}/${lessonSlug}`

type ProgressState = {
  completed: Record<LessonKey, number>; // key -> completedAt timestamp
  quizScores: Record<LessonKey, { correct: number; total: number }>;
  xp: number;
  goalPathSlug?: string;
  completeLesson: (key: LessonKey) => void;
  uncompleteLesson: (key: LessonKey) => void;
  recordQuiz: (key: LessonKey, correct: number, total: number) => void;
  setGoalPath: (slug: string) => void;
  reset: () => void;
};

export const lessonKey = (courseSlug: string, lessonSlug: string): LessonKey =>
  `${courseSlug}/${lessonSlug}`;

export const useProgressStore = create<ProgressState>()(
  persist(
    (set) => ({
      completed: {},
      quizScores: {},
      xp: 0,
      completeLesson: (key) =>
        set((s) =>
          s.completed[key]
            ? s
            : { completed: { ...s.completed, [key]: Date.now() }, xp: s.xp + 50 },
        ),
      uncompleteLesson: (key) =>
        set((s) => {
          const { [key]: removed, ...rest } = s.completed;
          return { completed: rest, xp: removed ? Math.max(0, s.xp - 50) : s.xp };
        }),
      recordQuiz: (key, correct, total) =>
        set((s) => ({
          quizScores: { ...s.quizScores, [key]: { correct, total } },
          xp: s.xp + correct * 10,
        })),
      setGoalPath: (goalPathSlug) => set({ goalPathSlug }),
      reset: () => set({ completed: {}, quizScores: {}, xp: 0, goalPathSlug: undefined }),
    }),
    { name: "dcs-progress" },
  ),
);

export const levelForXp = (xp: number) => Math.floor(xp / 250) + 1;
export const xpIntoLevel = (xp: number) => xp % 250;