import React from 'react';
import { LogOut } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface NavigationItem {
  name: string;
  icon: LucideIcon;
  href: string;
}

interface SidebarProps {
  navigation: NavigationItem[];
  currentView: string;
  setCurrentView: (view: string) => void;
}

export default function Sidebar({ navigation, currentView, setCurrentView }: SidebarProps) {
  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
      <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
        <div className="flex h-16 shrink-0 items-center">
          <h1 className="text-2xl font-bold text-indigo-600">ResultsHub</h1>
        </div>
        <nav className="flex flex-1 flex-col">
          <ul role="list" className="flex flex-1 flex-col gap-y-7">
            <li>
              <ul role="list" className="-mx-2 space-y-1">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <button
                      onClick={() => setCurrentView(item.href)}
                      className={`
                        group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold w-full
                        ${currentView === item.href
                          ? 'bg-gray-50 text-indigo-600'
                          : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50'
                        }
                      `}
                    >
                      <item.icon className="h-6 w-6 shrink-0" />
                      {item.name}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
            <li className="mt-auto">
              <button className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 w-full">
                <LogOut className="h-6 w-6 shrink-0" />
                Logout
              </button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}