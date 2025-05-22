export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  className: string;
  gender: 'Male' | 'Female' | 'Other';
  createdAt: string;
}

export interface StudentFormData {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  className: string;
  gender: 'Male' | 'Female' | 'Other';
}

export interface ClassStats {
  _id: string;
  count: number;
}

export interface AgeStats {
  _id: number | string;
  count: number;
}