export interface FarmActivity {
  id: string;
  type: 'planting' | 'harvesting' | 'maintenance' | 'animal-care';
  date: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  progress: number;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
  isRecurring: boolean;
  recurringInterval?: 'daily' | 'weekly' | 'monthly' | 'yearly';
}

export interface Field {
  id: string;
  name: string;
  activities: FarmActivity[];
}

