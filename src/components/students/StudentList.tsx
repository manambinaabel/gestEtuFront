import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Student } from '../../types/student';
import StudentCard from './StudentCard';
import { Search, AlertCircle } from 'lucide-react';

interface StudentListProps {
  students: Student[];
  onDelete: (id: string) => Promise<void>;
  loading: boolean;
  error: string | null;
}

const StudentList: React.FC<StudentListProps> = ({ 
  students, 
  onDelete, 
  loading, 
  error 
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);

  const handleEdit = (id?: string) => {
    if (!id) {
      alert("ID manquant pour l'édition");
      return;
    }
    navigate(`/edit-student/${id}`);
  };

  const handleDeleteClick = (id?: string) => {
    if (!id) {
      alert("ID manquant pour la suppression");
      return;
    }
    setShowDeleteConfirm(id);
  };

  const confirmDelete = async (id?: string) => {
    if (!id) {
      alert("ID manquant pour la suppression");
      return;
    }
    await onDelete(id);
    setShowDeleteConfirm(null);
  };
  
  const cancelDelete = () => {
    setShowDeleteConfirm(null);
  };
  
  const filteredStudents = students.filter(student => {
    const fullName = `${student.firstName} ${student.lastName}`.toLowerCase();
    const term = searchTerm.toLowerCase();
    return (
      fullName.includes(term) || 
      student.email.toLowerCase().includes(term) || 
      student.className.toLowerCase().includes(term)
    );
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md mb-4 flex items-start">
        <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 mr-3" />
        <p className="text-sm text-red-700">
          {error}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Rechercher des étudiants nom , e-mail ou classe..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {students.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Il n'y a pas d'etudiant</h3>
          <p className="mt-1 text-sm text-gray-500">Comme par ajouter svp!!!!!.</p>
          <div className="mt-6">
            <button
              onClick={() => navigate('/add-student')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              ajouter etudiant
            </button>
          </div>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="mt-2 text-lg font-medium text-gray-900">Aucun étudiant correspondant</h3>
          <p className="mt-1 text-sm text-gray-500">Essayez d'ajuster vos critères de recherche.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((student) => (
            <div key={student.id} className="relative">
              <StudentCard
                student={student}
                onEdit={handleEdit}
                onDelete={handleDeleteClick}
              />
              
              {showDeleteConfirm === student.id && (
                <div className="absolute inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center rounded-lg shadow-md p-4 z-10">
                  <p className="text-gray-800 font-medium mb-4 text-center">
                   Êtes-vous sûr de vouloir supprimer cet étudiant ?
                  </p>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => confirmDelete(student.id)}
                      className="px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Supprimer
                    </button>
                    <button
                      onClick={cancelDelete}
                      className="px-4 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                    >
                      Retour
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;