export type ReproductiveEventType = 'proestrus' | 'insemination' | 'gestation' | 'parturition';

export interface ReproductiveEvent {
  id: string;
  type: ReproductiveEventType;
  date: string;
  notes?: string;
  treatments?: string[];
  testResults?: {
    name: string;
    value: string;
    unit?: string;
  }[];
  inseminationMethod?: 'artificial' | 'natural';
  fatherName?: string;
}

export interface CattleReproduction {
  id: string;
  name: string;
  events: ReproductiveEvent[];
}

