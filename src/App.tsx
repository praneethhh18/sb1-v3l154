import React, { useState } from 'react';
import { GraduationCap, Users, BookOpen, Settings, LogOut, GitBranch, Calendar } from 'lucide-react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Branches from './components/Branches';
import TimeTable from './components/TimeTable';

function App() {
  const [currentView, setCurrentView] = useState('dashboard');

  const navigation = [
    { name: 'Dashboard', icon: GraduationCap, href: 'dashboard' },
    { name: 'Students', icon: Users, href: 'students' },
    { name: 'Courses', icon: BookOpen, href: 'courses' },
    { name: 'Branches', icon: GitBranch, href: 'branches' },
    { name: 'Time Table', icon: Calendar, href: 'timetable' },
    { name: 'Settings', icon: Settings, href: 'settings' },
  ];

  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'branches':
        return <Branches />;
      case 'timetable':
        return <TimeTable />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar 
        navigation={navigation} 
        currentView={currentView} 
        setCurrentView={setCurrentView} 
      />
      <div className="lg:pl-72">
        <Header />
        <main className="py-10">
          <div className="px-4 sm:px-6 lg:px-8">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;