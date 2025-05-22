import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';
import StudentForm from '../components/students/StudentForm';
import Layout from '../components/common/Layout';

const AddStudentPage: React.FC = () => {
  const { addStudent, loading } = useStudents();
  const navigate = useNavigate();

  const handleSubmit = async (data: any) => {
    await addStudent(data);
    navigate('/students');
  };

  return (
    <Layout>
      <div className="py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Ajouter un nouvel étudiant</h1>
        </div>

        <StudentForm 
          onSubmit={handleSubmit}
          isLoading={loading}
        />
      </div>
    </Layout>
  );
};

export default AddStudentPage;