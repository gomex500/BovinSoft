export type ReproductiveEventType = 'proestrus' | 'insemination' | 'gestation' | 'parturition';
export type InseminationMethod = 'artificial' | 'natural';

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
  inseminationMethod?: InseminationMethod;
  fatherName?: string;
  reproductiveId?: string;
}

export interface CattleReproduction {
  id: string;
  name: string;
  events: ReproductiveEvent[];
  typeService?: InseminationMethod;
  fatherName?: string;
  featherId?: string;
  dateService?: string;
  confirmationGestation?: string;
  confirmationParturition?: string;
  estate?: string;
  bovinoId: string;
}

export interface EstrusPhase {
  name: string;
  duration: number;
  color: string;
}

