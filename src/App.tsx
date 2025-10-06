import React, { useState } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CreateActivity } from './components/CreateActivity';
import { ActivityDetails } from './components/ActivityDetails';
import { UserProfile } from './components/UserProfile';
import { Activity, ViewType } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewType>('dashboard');
  const [selectedActivity, setSelectedActivity] = useState<Activity | null>(null);

  const handleViewChange = (view: ViewType) => {
    setCurrentView(view);
    setSelectedActivity(null);
  };

  const handleViewActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setCurrentView('activity');
  };

  const handleCreateActivity = (activity: Activity) => {
    // U stvarnoj aplikaciji, ovdje bi trebalo poslati podatke na server
    console.log('Nova aktivnost kreirana:', activity);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'create':
        return (
          <CreateActivity
            onBack={() => handleViewChange('dashboard')}
            onCreateActivity={handleCreateActivity}
          />
        );
      case 'activity':
        return selectedActivity ? (
          <ActivityDetails
            activity={selectedActivity}
            onBack={() => handleViewChange('dashboard')}
          />
        ) : (
          <Dashboard onViewActivity={handleViewActivity} />
        );
      case 'profile':
        return (
          <UserProfile
            onBack={() => handleViewChange('dashboard')}
          />
        );
      default:
        return <Dashboard onViewActivity={handleViewActivity} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {currentView !== 'activity' && (
        <Header currentView={currentView} onViewChange={handleViewChange} />
      )}
      {renderCurrentView()}
    </div>
  );
}