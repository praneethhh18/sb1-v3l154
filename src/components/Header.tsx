import React from 'react';
import { Bell, Search } from 'lucide-react';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 lg:mx-auto bg-white border-b border-gray-200">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-1">
            <div className="flex w-full md:ml-0">
              <div className="relative w-full">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="search"
                  placeholder="Search..."
                  className="block h-full w-full border-0 py-0 pl-10 pr-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="ml-4 flex items-center gap-4">
            <button className="relative rounded-full bg-white p-2 hover:bg-gray-50">
              <Bell className="h-6 w-6 text-gray-400" />
              <span className="absolute top-0 right-0 block h-2.5 w-2.5 rounded-full bg-red-400 ring-2 ring-white" />
            </button>
            <img
              className="h-9 w-9 rounded-full"
              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
              alt="User avatar"
            />
          </div>
        </div>
      </div>
    </header>
  );
}