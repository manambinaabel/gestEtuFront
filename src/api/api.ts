import axios from 'axios';
import {  StudentFormData } from '../types/student';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

// Students API calls
export const fetchStudents = async () => {
  const response = await API.get('/students');
  return response.data;
};



export const createStudent = async (studentData: StudentFormData) => {
  const response = await API.post('/students', studentData);
  return response.data;
};


export const fetchStudent = async (id: string) => {
  if (!id) throw new Error('ID est requise');
  const response = await API.get(`/students/${id}`);
  return response.data;
};

export const updateStudent = async (id: string, studentData: StudentFormData) => {
  if (!id) throw new Error('ID est requise');
  const response = await API.put(`/students/${id}`, studentData);
  return response.data;
};

export const deleteStudent = async (id: string) => {
  if (!id) throw new Error('ID est requise');
  const response = await API.delete(`/students/${id}`);
  return response.data;
};

// Statistics API calls
export const fetchClassStats = async () => {
  const response = await API.get('/students/stats/classes');
  return response.data;
};

export const fetchAgeStats = async () => {
  const response = await API.get('/students/stats/ages');
  return response.data;
};