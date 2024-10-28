import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

const timeSlots = [
  '9:00 AM - 10:00 AM',
  '10:00 AM - 11:00 AM',
  '11:15 AM - 12:15 PM',
  '12:15 PM - 1:15 PM',
  '2:00 PM - 3:00 PM',
  '3:00 PM - 4:00 PM'
];

const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

interface TimeTableEntry {
  subject: string;
  teacher: string;
  room: string;
  timeSlot: string;
  day: string;
}

export default function TimeTable() {
  const [selectedBranch, setSelectedBranch] = useState('CSE');
  const [selectedSemester, setSelectedSemester] = useState(1);
  const [schedule, setSchedule] = useState<TimeTableEntry[]>([]);

  useEffect(() => {
    fetch(`http://localhost:3001/api/timetable/${selectedBranch}/${selectedSemester}`)
      .then(res => res.json())
      .then(data => setSchedule(data))
      .catch(error => console.error('Error fetching timetable:', error));
  }, [selectedBranch, selectedSemester]);

  return (
    <div className="space-y-6">
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Time Table</h1>
          <p className="mt-2 text-sm text-gray-700">
            Weekly schedule of classes and activities
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:flex sm:space-x-4">
          <select
            value={selectedBranch}
            onChange={(e) => setSelectedBranch(e.target.value)}
            className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            <option value="CSE">Computer Science</option>
            <option value="ECE">Electronics</option>
            <option value="ME">Mechanical</option>
            <option value="CE">Civil</option>
            <option value="CHE">Chemical</option>
            <option value="EE">Electrical</option>
            <option value="AE">Aerospace</option>
            <option value="BT">Biotechnology</option>
            <option value="IT">Information Technology</option>
            <option value="AI">Artificial Intelligence</option>
          </select>
          <select
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(parseInt(e.target.value))}
            className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
              <option key={sem} value={sem}>Semester {sem}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-lg bg-white shadow">
        <div className="min-w-full divide-y divide-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                {weekDays.map((day) => (
                  <th key={day} className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {day}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {timeSlots.map((timeSlot, index) => (
                <tr key={timeSlot} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 text-gray-400 mr-2" />
                      {timeSlot}
                    </div>
                  </td>
                  {weekDays.map((day) => {
                    const entry = schedule.find(s => s.day === day && s.timeSlot === timeSlot);
                    return (
                      <td key={`${day}-${timeSlot}`} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="space-y-1">
                          <div className="font-medium text-gray-900">
                            {entry?.subject || '-'}
                          </div>
                          {entry && (
                            <>
                              <div className="text-xs text-gray-500">
                                {entry.teacher}
                              </div>
                              <div className="text-xs text-gray-400">
                                Room {entry.room}
                              </div>
                            </>
                          )}
                        </div>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}