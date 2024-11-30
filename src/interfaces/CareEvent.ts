import { IBovine } from "./Livestock";

export interface CareEvent {
  id: string;
  date: string;
  type: string;
  description: string;
  performedBy: string;
  bovinoId: string;
}

export interface BovineWithCareHistory extends IBovine {
  careHistory: CareEvent[];
  expanded: boolean;
}