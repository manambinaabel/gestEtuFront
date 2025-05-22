import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';
import StudentForm from '../components/students/StudentForm';
import Layout from '../components/common/Layout';
import { Student } from '../types/student';
import { AlertCircle } from 'lucide-react';

const EditStudentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { students, updateStudent, loading } = useStudents();
  const navigate = useNavigate();
  const [student, setStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      const foundStudent = students.find(s => s.id === id);
      if (foundStudent) {
        setStudent(foundStudent);
      } else {
        setError('Étudiant introuvable');
      }
    }
  }, [id, students]);

  const handleSubmit = async (data: any) => {
    if (id) {
      await updateStudent(id, data);
      navigate('/students');
    }
  };

  if (error) {
    return (
      <Layout>
        <div className="py-6">
          <div className="bg-red-50 p-4 rounded-md">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertCircle className="h-5 w-5 text-red-400" />
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Erreur</h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    onClick={() => navigate('/students')}
                    className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    Retour aux étudiants
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Modifier Etudiant</h1>
        </div>

        {student ? (
          <StudentForm 
            initialData={student}
            onSubmit={handleSubmit}
            isLoading={loading}
          />
        ) : (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default EditStudentPage;