import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Student, StudentFormData, ClassStats, AgeStats } from '../types/student';
import * as api from '../api/api';

interface StudentContextType {
  students: Student[];
  classStats: ClassStats[];
  ageStats: AgeStats[];
  loading: boolean;
  error: string | null;
  fetchAllStudents: () => Promise<void>;
  fetchStatistics: () => Promise<void>;
  addStudent: (student: StudentFormData) => Promise<void>;
  updateStudent: (id: string, student: StudentFormData) => Promise<void>;
  removeStudent: (id: string) => Promise<void>;
}

const StudentContext = createContext<StudentContextType | undefined>(undefined);

export const useStudents = () => {
  const context = useContext(StudentContext);
  if (!context) {
    throw new Error('useStudents must be used within a StudentProvider');
  }
  return context;
};

interface StudentProviderProps {
  children: ReactNode;
}

export const StudentProvider: React.FC<StudentProviderProps> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [classStats, setClassStats] = useState<ClassStats[]>([]);
  const [ageStats, setAgeStats] = useState<AgeStats[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAllStudents = async () => {
    setLoading(true);
    try {
      const data = await api.fetchStudents();
      setStudents(data);
      setError(null);
    } catch (err) {
      setError('Impossible de récupérer les étudiants');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchStatistics = async () => {
    setLoading(true);
    try {
      const [classData, ageData] = await Promise.all([
        api.fetchClassStats(),
        api.fetchAgeStats()
      ]);
      setClassStats(classData);
      setAgeStats(ageData);
      setError(null);
    } catch (err) {
      setError('Échec de la récupération des statistiques');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addStudent = async (studentData: StudentFormData) => {
    setLoading(true);
    try {
      const newStudent = await api.createStudent(studentData);
      setStudents((prev) => [newStudent, ...prev]);
      await fetchStatistics();
      setError(null);
    } catch (err) {
      setError('Échec ajout  étudiant');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStudent = async (id: string, studentData: StudentFormData) => {
    setLoading(true);
    try {
      const updatedStudent = await api.updateStudent(id, studentData);
      setStudents((prev) => 
        prev.map((student) => student.  id === id ? updatedStudent : student)
      );
      await fetchStatistics();
      setError(null);
    } catch (err) {
      setError('Échec de la mise à jour étudiant');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeStudent = async (id: string) => {
    setLoading(true);
    try {
      await api.deleteStudent(id);
      setStudents((prev) => prev.filter((student) => student.id !== id));
      await fetchStatistics();
      setError(null);
    } catch (err) {
      setError('Échec de la suppression étudiant');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllStudents();
    fetchStatistics();
  }, []);

  const value = {
    students,
    classStats,
    ageStats,
    loading,
    error,
    fetchAllStudents,
    fetchStatistics,
    addStudent,
    updateStudent,
    removeStudent,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
};