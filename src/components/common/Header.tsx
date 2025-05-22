import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GraduationCap, BarChart, Users, Plus, Home } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path ? 'border-blue-500 text-blue-500' : 'border-transparent hover:border-gray-300';
  };

  return (
    <header className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <GraduationCap className="h-8 w-8 text-blue-500" />
              <span className="ml-2 text-xl font-bold text-gray-800">Gestionnaire des étudiants</span>
            </Link>
          </div>
          
          <nav className="flex space-x-4 items-center">
            <Link 
              to="/" 
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 border-b-2 transition-colors duration-200 ${isActive('/')}`}
            >
              <Home className="h-5 w-5 mr-1" />
              <span>Accueil</span>
            </Link>
            <Link 
              to="/students" 
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 border-b-2 transition-colors duration-200 ${isActive('/students')}`}
            >
              <Users className="h-5 w-5 mr-1" />
              <span>Etudiant</span>
            </Link>
            <Link 
              to="/dashboard" 
              className={`flex items-center px-4 py-2 text-sm font-medium text-gray-700 border-b-2 transition-colors duration-200 ${isActive('/dashboard')}`}
            >
              <BarChart className="h-5 w-5 mr-1" />
              <span>Tableau de bord</span>
            </Link>
            <Link 
              to="/add-student" 
              className="flex items-center ml-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600 transition-colors duration-200"
            >
              <Plus className="h-5 w-5 mr-1" />
              <span>Ajouter Etudiant</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;