import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { StudentProvider } from './context/StudentContext';

import HomePage from './pages/HomePage';
import StudentsPage from './pages/StudentsPage';
import AddStudentPage from './pages/AddStudentPage';
import EditStudentPage from './pages/EditStudentPage';
import DashboardPage from './pages/DashboardPage';

function App() {
  return (
    <BrowserRouter>
      <StudentProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/students" element={<StudentsPage />} />
          <Route path="/add-student" element={<AddStudentPage />} />
          <Route path="/edit-student/:id" element={<EditStudentPage />} />
           <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </StudentProvider>
    </BrowserRouter>
  );
}

export default App;