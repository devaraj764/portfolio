import data from "./experiences.json";

export type Experience = {
  title: string;
  description: string;
  role: string;
  worked_with: string[];
  visit_link?: string;
  duration: string;
};

export const experiences: Experience[] = data;
