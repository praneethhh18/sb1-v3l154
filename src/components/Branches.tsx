import React, { useEffect, useState } from 'react';
import { Building2 } from 'lucide-react';

interface Branch {
  name: string;
  code: string;
  description: string;
  headOfDepartment: string;
  totalStudents: number;
}

export default function Branches() {
  const [branches, setBranches] = useState<Branch[]>([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/branches')
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(error => console.error('Error fetching branches:', error));
  }, []);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-semibold text-gray-900">Academic Branches</h1>
          <p className="mt-2 text-sm text-gray-700">
            A comprehensive list of all academic branches and departments.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch) => (
          <div
            key={branch.code}
            className="relative overflow-hidden rounded-lg bg-white shadow transition-all hover:shadow-lg"
          >
            <div className="p-6">
              <div className="flex items-center">
                <div className="rounded-md bg-indigo-500 p-3">
                  <Building2 className="h-6 w-6 text-white" />
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-gray-900">{branch.name}</h3>
                  <p className="text-sm text-gray-500">{branch.code}</p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600">{branch.description}</p>
              </div>
              <div className="mt-6 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm">
                  <div>
                    <span className="text-gray-500">Head of Department:</span>
                    <p className="font-medium text-gray-900">{branch.headOfDepartment}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-500">Total Students:</span>
                    <p className="font-medium text-gray-900">{branch.totalStudents}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}