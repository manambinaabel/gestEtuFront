import React from 'react';
import { Link } from 'react-router-dom';
import { useStudents } from '../context/StudentContext';
import { Users, BarChart, UserPlus } from 'lucide-react';
import Layout from '../components/common/Layout';

const HomePage: React.FC = () => {
  const { students } = useStudents();

  return (
    <Layout>
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl sm:tracking-tight lg:text-6xl">
              Système de gestion des étudiants
            </h1>
            <p className="mt-5 max-w-xl mx-auto text-xl text-gray-500">
        Gérez facilement vos dossiers étudiants grâce à notre système de gestion complet.
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <Link 
                to="/students"
                className="relative group bg-white p-6 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <span className="rounded-md inline-flex p-3 ring-4 ring-opacity-20 ring-blue-200 bg-blue-50 text-blue-600">
                    <Users className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Voir les étudiants</h3>
                  <p className="mt-2 text-base text-gray-500">
                    Parcourez la liste de tous les étudiants inscrits.
                  </p>
                </div>
                <span className="absolute top-0 inset-x-0 h-1 bg-blue-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>

              <Link 
                to="/dashboard"
                className="relative group bg-white p-6 focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <span className="rounded-md inline-flex p-3 ring-4 ring-opacity-20 ring-teal-200 bg-teal-50 text-teal-600">
                    <BarChart className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Afficher le tableau de bord</h3>
                  <p className="mt-2 text-base text-gray-500">
                  Consultez des statistiques et des informations sur la répartition des étudiants.
                  </p>
                </div>
                <span className="absolute top-0 inset-x-0 h-1 bg-teal-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>

              <Link 
                to="/add-student"
                className="relative group bg-white p-6 focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-200"
              >
                <div>
                  <span className="rounded-md inline-flex p-3 ring-4 ring-opacity-20 ring-orange-200 bg-orange-50 text-orange-600">
                    <UserPlus className="h-6 w-6" />
                  </span>
                </div>
                <div className="mt-4">
                  <h3 className="text-lg font-medium text-gray-900">Ajouter un étudiant</h3>
                  <p className="mt-2 text-base text-gray-500">
                   Inscrivez un nouvel étudiant dans le système.
                  </p>
                </div>
                <span className="absolute top-0 inset-x-0 h-1 bg-orange-500 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></span>
              </Link>
            </div>
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600">
              Gère actuellement {students.length} Etudiants
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HomePage;