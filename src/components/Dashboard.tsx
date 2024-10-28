import React from 'react';
import { Users, BookOpen, Trophy, TrendingUp } from 'lucide-react';

const stats = [
  { name: 'Total Students', value: '2,543', icon: Users, change: '+12.5%', changeType: 'increase' },
  { name: 'Active Courses', value: '48', icon: BookOpen, change: '+3.2%', changeType: 'increase' },
  { name: 'Average Grade', value: '85.4%', icon: Trophy, change: '+2.7%', changeType: 'increase' },
  { name: 'Pass Rate', value: '92%', icon: TrendingUp, change: '+4.1%', changeType: 'increase' },
];

const recentResults = [
  { id: 1, student: 'Emma Thompson', course: 'Advanced Mathematics', grade: 'A', score: 95 },
  { id: 2, student: 'James Wilson', course: 'Physics 101', grade: 'B+', score: 87 },
  { id: 3, student: 'Sarah Davis', course: 'Computer Science', grade: 'A-', score: 91 },
  { id: 4, student: 'Michael Brown', course: 'Chemistry', grade: 'B', score: 84 },
  { id: 5, student: 'Lisa Anderson', course: 'English Literature', grade: 'A', score: 96 },
];

export default function Dashboard() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="relative overflow-hidden rounded-lg bg-white px-4 pb-12 pt-5 shadow sm:px-6 sm:pt-6"
          >
            <dt>
              <div className="absolute rounded-md bg-indigo-500 p-3">
                <stat.icon className="h-6 w-6 text-white" aria-hidden="true" />
              </div>
              <p className="ml-16 truncate text-sm font-medium text-gray-500">{stat.name}</p>
            </dt>
            <dd className="ml-16 flex items-baseline pb-6 sm:pb-7">
              <p className="text-2xl font-semibold text-gray-900">{stat.value}</p>
              <p
                className={`ml-2 flex items-baseline text-sm font-semibold ${
                  stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {stat.change}
              </p>
            </dd>
          </div>
        ))}
      </div>

      <div className="bg-white shadow rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg font-medium leading-6 text-gray-900">Recent Results</h3>
        </div>
        <div className="overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Course
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Grade
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentResults.map((result) => (
                <tr key={result.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {result.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.course}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.grade}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {result.score}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}