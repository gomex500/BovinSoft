type Status = 'saludable' | 'enfermo' | 'embarazada' | 'lactancia';
type Type = 'carne' | 'leche' | 'mixto';
type Gender = 'macho' | 'hembra';

export interface IBovine {
  id: string;
  identifier: string;
  breed: string;
  dateOfBirth: string;
  status: Status;
  farmId: string;
  weight: number;
  gender: Gender;
  name: string;
  image: string;
  type: Type;
  age?: string;
  farmStr?: string;
}

export interface LivestockActivity {
  id: string;
  animalId: string;
  type: 'health-check' | 'vaccination' | 'breeding' | 'milking' | 'feeding' | 'other';
  date: string;
  description: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

