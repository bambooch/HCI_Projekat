import React from 'react';
import { Button } from './ui/button';
import { User, Bell } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  onViewChange: (view: 'dashboard' | 'create' | 'profile' | 'notifications') => void;
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const [menuOpen, setMenuOpen] = React.useState(false);
  const navItems: { label: string; view: 'dashboard' | 'create' | 'profile' | 'notifications' }[] = [
    { label: 'Dashboard', view: 'dashboard' },
    { label: 'Profil', view: 'profile' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 px-3 sm:px-4 py-3 sticky top-0 z-50">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center space-x-6 sm:space-x-12 flex-1">
          <h1 className="font-semibold text-base sm:text-lg whitespace-nowrap">SportConnect</h1>
          <nav className="desktop-only space-x-6">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => onViewChange(item.view)}
                className={`px-3 py-1 rounded transition-colors duration-200 ${
                  currentView === item.view
                    ? 'bg-primary text-white shadow'
                    : 'text-gray-600 hover:text-primary hover:bg-gray-100'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
          <Button
            onClick={() => onViewChange('create')}
            className="desktop-only bg-black text-white hover:bg-gray-800"
          >
            + Kreiraj Oglas
          </Button>
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => onViewChange('notifications')}
            className="desktop-only relative p-2 h-auto"
          >
            <Bell className="w-5 h-5" />
            <span className="sr-only">Notifikacije</span>
          </Button>
          <button 
            onClick={() => onViewChange('profile')}
            className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary flex-shrink-0"
            aria-label="Profil"
          >
            <User size={16} />
          </button>
          {/* Hamburger menu for mobile - only visible on screens smaller than 768px */}
          <button
            className="mobile-only p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary hover:bg-gray-100 transition-colors flex-shrink-0"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Zatvori meni" : "Otvori meni"}
          >
            {menuOpen ? (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            ) : (
              <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            )}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {menuOpen && (
        <nav className="mobile-only bg-white border-t border-gray-200 px-4 py-3 flex flex-col space-y-2 shadow-lg">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                onViewChange(item.view);
                setMenuOpen(false);
              }}
              className={`w-full text-left px-3 py-2 rounded transition-colors duration-200 ${
                currentView === item.view
                  ? 'bg-primary text-white shadow'
                  : 'text-gray-600 hover:text-primary hover:bg-gray-100'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            onClick={() => {
              onViewChange('create');
              setMenuOpen(false);
            }}
            className={`w-full text-left px-3 py-2 rounded transition-colors duration-200 font-semibold ${
              currentView === 'create'
                ? 'bg-black text-white shadow'
                : 'bg-gray-100 text-gray-900 hover:bg-gray-200'
            }`}
          >
            + Kreiraj Oglas
          </button>
        </nav>
      )}
    </header>
  );
}