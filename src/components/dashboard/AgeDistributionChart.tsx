import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { AgeStats } from '../../types/student';

interface AgeDistributionChartProps {
  data: AgeStats[];
}

const COLORS = ['#3B82F6', '#14B8A6', '#F97316', '#8B5CF6', '#EC4899', '#EF4444', '#10B981', '#F59E0B'];

const AgeDistributionChart: React.FC<AgeDistributionChartProps> = ({ data }) => {
  // Diagnostic : log les données reçues
  console.log('AgeDistributionChart data:', data);

  // Affiche un message si aucune donnée
  if (!data || data.length === 0) {
    return <div className="p-6 text-center text-gray-500">Aucune donnée à afficher</div>;
  }

  // Group ages into ranges for better visualization
  const groupedData = data.reduce((acc, { _id, count }) => {
    // Si _id est string, convertis-le en nombre
    const age = typeof _id === 'string' ? parseInt(_id, 10) : _id;
    let range = '';
    if (age < 18) range = 'Under 18';
    else if (age >= 18 && age <= 20) range = '18-20';
    else if (age >= 21 && age <= 23) range = '21-23';
    else if (age >= 24 && age <= 26) range = '24-26';
    else range = 'Over 26';
    
    const existingRange = acc.find(item => item.name === range);
    if (existingRange) {
      existingRange.value += count;
    } else {
      acc.push({ name: range, value: count });
    }
    return acc;
  }, [] as { name: string; value: number }[]);

  // Sort by age range
  const sortOrder = ['Under 18', '18-20', '21-23', '24-26', 'Over 26'];
  groupedData.sort((a, b) => sortOrder.indexOf(a.name) - sortOrder.indexOf(b.name));

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Étudiants par tranche d'âge</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={groupedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              innerRadius={40}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
            >
              {groupedData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value, name) => [`${value} étudiants`, name]}
              contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #e2e8f0' }}
            />
            <Legend layout="horizontal" verticalAlign="bottom" align="center" />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AgeDistributionChart;