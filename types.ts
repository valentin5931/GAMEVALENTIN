export interface Job {
  id: string;
  title: string;
  company: string;
  period: string;
  details: string[];
  type: 'experience' | 'project';
}

export interface Skill {
  category: string;
  items: string[];
}

export interface ResumeData {
  name: string;
  role: string;
  about: string;
  contact: {
    email: string;
    phone: string;
    location: string;
    linkedin: string;
  };
  jobs: Job[];
  skills: Skill[];
  interests: string[];
}

export enum GameState {
  INTRO,
  OVERWORLD,
  BATTLE,
  MENU,
  IMAGE_EDITOR,
  FLYING,
  ENDING
}

export interface Position {
  x: number;
  y: number;
}
