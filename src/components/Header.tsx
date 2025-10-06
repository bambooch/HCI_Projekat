import React from 'react';
import { Button } from './ui/button';
import { User, Bell } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: 'dashboard' | 'create' | 'profile') => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between max-w-6xl mx-auto">
        <div className="flex items-center space-x-8">
          <h1 className="font-semibold text-lg">SportConnect</h1>
          <nav className="flex space-x-6">
            <button
              onClick={() => onViewChange('dashboard')}
              className={`px-3 py-1 rounded ${
                currentView === 'dashboard'
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Dashboard
            </button>
            <button
              onClick={() => onViewChange('dashboard')}
              className="text-gray-600 hover:text-gray-900"
            >
              Moje Aktivnosti
            </button>
            <button
              onClick={() => onViewChange('profile')}
              className={`px-3 py-1 rounded ${
                currentView === 'profile'
                  ? 'text-primary'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Profil
            </button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={() => onViewChange('create')}
            className="bg-black text-white hover:bg-gray-800"
          >
            + Kreiraj Oglas
          </Button>
          <Button variant="ghost" size="sm">
            Notifikacije
          </Button>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
        </div>
      </div>
    </header>
  );
}