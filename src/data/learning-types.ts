export type Difficulty = "Beginner" | "Intermediate" | "Advanced";

export type LearningPath = {
  slug: string;
  title: string;
  tagline: string;
  duration: string;
  difficulty: Difficulty;
  audience: string;
  skills: string[];
  projects: string[];
  certifications: string[];
  interviewPrep: string[];
  outcomes: string[];
  salary: { region: string; entry: string; mid: string; senior: string };
  companies: string[];
  courses: string[];
  roadmap: { stage: string; title: string; items: string[] }[];
};

export type QuizQuestion =
  | {
      id: string;
      kind: "single" | "code-output" | "sql";
      prompt: string;
      code?: string;
      options: string[];
      answer: number;
      explanation: string;
    }
  | {
      id: string;
      kind: "multi";
      prompt: string;
      code?: string;
      options: string[];
      answers: number[];
      explanation: string;
    }
  | {
      id: string;
      kind: "boolean";
      prompt: string;
      code?: string;
      answer: boolean;
      explanation: string;
    };

export type Lesson = {
  slug: string;
  title: string;
  minutes: number;
  difficulty: Difficulty;
  intro: string;
  outcomes: string[];
  theory: { heading: string; body: string }[];
  diagram?: { title: string; steps: string[] };
  examples: { title: string; language: string; code: string; explanation: string }[];
  keyPoints: string[];
  cheatsheet: { term: string; meaning: string }[];
  flashcards: { q: string; a: string }[];
  tutor: {
    simplify: string;
    beginner: string;
    interview: string;
    analogy: string;
    realWorld: string;
  };
  lab?: {
    language: string;
    instructions: string;
    starter: string;
    solution: string;
    hints: string[];
    tests: string[];
    mistakes: string[];
  };
  quiz: QuizQuestion[];
  assignment: { title: string; brief: string; rubric: string[] };
  careerLink: string;
};

export type Module = {
  slug: string;
  title: string;
  summary: string;
  difficulty: Difficulty;
  objectives: string[];
  lessons: Lesson[];
};

export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  level: Difficulty;
  hours: number;
  pathSlugs: string[];
  overview: string;
  objectives: string[];
  prerequisites: string[];
  modules: Module[];
  capstone: {
    title: string;
    problem: string;
    requirements: string[];
    dataset: string;
    architecture: string[];
    deliverables: string[];
    resumeBullets: string[];
  };
  interviewQuestions: { q: string; a: string }[];
  certificate: { title: string; criteria: string[] };
};