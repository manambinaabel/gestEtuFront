import React from 'react';
import { useStudents } from '../context/StudentContext';
import Layout from '../components/common/Layout';
import StatCard from '../components/dashboard/StatCard';
import ClassDistributionChart from '../components/dashboard/ClassDistributionChart';
import AgeDistributionChart from '../components/dashboard/AgeDistributionChart';
import { Users, BookOpen, UserCheck, UsersRound } from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { students, classStats, ageStats, loading } = useStudents();

  // Calculate stats
  const totalStudents = students.length;
  
  // Count unique classes
  const uniqueClasses = new Set(students.map(student => student.className)).size;
  
  // Calculate gender distribution
  const maleStudents = students.filter(student => student.gender === 'Male').length;
  const femalePercentage = totalStudents > 0 
    ? `${Math.round((totalStudents - maleStudents) / totalStudents * 100)}%` 
    : '0%';

  // Calculate average age
  const averageAge = totalStudents > 0
    ? Math.round(students.reduce((sum, student) => sum + student.age, 0) / totalStudents)
    : 0;

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">Tableau de bord</h1>
        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Nombre total d'étudiants" 
            value={totalStudents}
            icon={Users}
            color="blue"
          />
          <StatCard 
            title="Classes" 
            value={uniqueClasses}
            icon={BookOpen}
            color="green" 
          />
          <StatCard 
            title="Âge moyen" 
            value={averageAge}
            icon={UserCheck}
            color="orange"
          />
          <StatCard 
            title="Étudiantes" 
            value={femalePercentage}
            icon={UsersRound}
            color="purple"
          />
        </div>
        
        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ClassDistributionChart data={classStats} />
          <AgeDistributionChart data={ageStats} />
        </div>
      </div>
    </Layout>
  );
};

export default DashboardPage;