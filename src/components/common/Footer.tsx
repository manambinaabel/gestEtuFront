import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white shadow-inner mt-auto">
      <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} Système de gestion des étudiants 
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
            
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
              Contact : manambina316@gmail.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;