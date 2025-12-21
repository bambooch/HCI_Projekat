import React, { useState } from 'react';
import { Toaster } from './components/ui/sonner';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { CreateActivity } from './components/CreateActivity';
import { EditActivity } from './components/EditActivity';
import { ActivityDetails } from './components/ActivityDetails';
import { UserProfile } from './components/UserProfile';
import { Notifications } from './components/Notifications';
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

  const handleEditActivity = (activity: Activity) => {
    setSelectedActivity(activity);
    setCurrentView('edit');
  };

  const handleCreateActivity = (activity: Activity) => {
    // U stvarnoj aplikaciji, ovdje bi trebalo poslati podatke na server
    console.log('Nova aktivnost kreirana:', activity);
  };

  const handleSaveActivity = (activity: Activity) => {
    // Update the activity
    console.log('Aktivnost ažurirana:', activity);
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
      case 'edit':
        return selectedActivity ? (
          <EditActivity
            activity={selectedActivity}
            onBack={() => handleViewChange('dashboard')}
            onSaveActivity={handleSaveActivity}
          />
        ) : (
          <Dashboard onViewActivity={handleViewActivity} onEditActivity={handleEditActivity} />
        );
      case 'activity':
        return selectedActivity ? (
          <ActivityDetails
            activity={selectedActivity}
            onBack={() => handleViewChange('dashboard')}
          />
        ) : (
          <Dashboard onViewActivity={handleViewActivity} onEditActivity={handleEditActivity} />
        );
      case 'profile':
        return (
          <UserProfile
            onBack={() => handleViewChange('dashboard')}
          />
        );
      case 'notifications':
        return (
          <Notifications
            onBack={() => handleViewChange('dashboard')}
          />
        );
      default:
        return <Dashboard onViewActivity={handleViewActivity} onEditActivity={handleEditActivity} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="bottom-right" richColors />
      {currentView !== 'activity' && currentView !== 'notifications' && currentView !== 'edit' && (
        <Header currentView={currentView} onViewChange={handleViewChange} />
      )}
      {renderCurrentView()}
    </div>
  );
}