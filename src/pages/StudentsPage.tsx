import React from 'react';
import { useStudents } from '../context/StudentContext';
import StudentList from '../components/students/StudentList';
import Layout from '../components/common/Layout';

const StudentsPage: React.FC = () => {
  const { students, loading, error, removeStudent } = useStudents();

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">etudiants</h1>
          <p className="text-sm text-gray-600">
            Nombre total d'étudiants :
             <span className="font-semibold">{students.length}</span>
          </p>
        </div>
        
        <StudentList
          students={students}
          onDelete={removeStudent}
          loading={loading}
          error={error}
        />
      </div>
    </Layout>
  );
};

export default StudentsPage;