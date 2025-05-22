import React from 'react';
import { Edit, Trash } from 'lucide-react';
import { Student } from '../../types/student';

interface StudentCardProps {
  student: Student;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, onEdit, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:shadow-lg hover:translate-y-[-4px]">
      <div className="p-4 border-b border-gray-200">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">{student.firstName} {student.lastName}</h3>
            <p className="text-sm text-gray-500">{student.email}</p>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            {student.className}
          </span>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-medium text-gray-500">Age:</span>
            <span className="ml-1 text-gray-700">{student.age}</span>
          </div>
          <div>
            <span className="font-medium text-gray-500">Genre:</span>
            <span className="ml-1 text-gray-700">{student.gender}</span>
          </div>
        </div>
      </div>
      
      <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex justify-end space-x-2">
        <button 
          onClick={() => onEdit(student.id)}
          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <Edit className="h-4 w-4 mr-1" />
          Modifier
        </button>
        <button 
          onClick={() => onDelete(student.id)}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          <Trash className="h-4 w-4 mr-1" />
          Supprimer
        </button>
      </div>
    </div>
  );
};

export default StudentCard;