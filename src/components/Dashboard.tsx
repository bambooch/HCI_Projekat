import React, { useState, useMemo, useEffect } from 'react';
import { FilterBar } from './FilterBar';
import { ActivityCard } from './ActivityCard';
import { Activity } from '../types';
import { mockActivities } from '../data/mockData';

interface DashboardProps {
  onViewActivity: (activity: Activity) => void;
  onEditActivity?: (activity: Activity) => void;
}

export function Dashboard({ onViewActivity, onEditActivity }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('Svi sportovi');
  const [selectedLocation, setSelectedLocation] = useState('Sve lokacije');
  const [selectedDate, setSelectedDate] = useState('');
  const [joinedActivities, setJoinedActivities] = useState<Set<string>>(new Set());
  const [allActivities, setAllActivities] = useState<Activity[]>(mockActivities);

  // Load activities from localStorage on mount and when component updates
  useEffect(() => {
    const savedActivities = JSON.parse(localStorage.getItem('activities') || '[]');
    if (savedActivities.length > 0) {
      setAllActivities([...mockActivities, ...savedActivities]);
    } else {
      setAllActivities(mockActivities);
    }
  }, []);

  const filteredActivities = useMemo(() => {
    return allActivities.filter((activity) => {
      const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           activity.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSport = selectedSport === 'Svi sportovi' || activity.sport === selectedSport;
      const matchesLocation = selectedLocation === 'Sve lokacije' || 
                             activity.location.toLowerCase().includes(selectedLocation.toLowerCase());
      const matchesDate = !selectedDate || activity.date.includes(selectedDate.split('-').reverse().join('.'));

      return matchesSearch && matchesSport && matchesLocation && matchesDate;
    });
  }, [searchTerm, selectedSport, selectedLocation, selectedDate, allActivities]);

  const handleJoinActivity = (activityId: string) => {
    const newJoined = new Set(joinedActivities);
    if (newJoined.has(activityId)) {
      newJoined.delete(activityId);
    } else {
      newJoined.add(activityId);
    }
    setJoinedActivities(newJoined);
  };

  const handleDeleteActivity = (activityId: string) => {
    // Remove from localStorage if it exists there
    const savedActivities = JSON.parse(localStorage.getItem('activities') || '[]');
    const updatedActivities = savedActivities.filter((a: Activity) => a.id !== activityId);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    
    // Remove from state
    setAllActivities(allActivities.filter(a => a.id !== activityId));
  };

  const handleEditActivity = (activity: Activity) => {
    if (onEditActivity) {
      onEditActivity(activity);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <h2 className="text-xl font-medium mb-6">Pregled Aktivnosti</h2>
      
      <FilterBar
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        selectedSport={selectedSport}
        onSportChange={setSelectedSport}
        selectedLocation={selectedLocation}
        onLocationChange={setSelectedLocation}
        selectedDate={selectedDate}
        onDateChange={setSelectedDate}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredActivities.map((activity) => (
          <ActivityCard
            key={activity.id}
            activity={activity}
            onViewDetails={onViewActivity}
            onJoinActivity={handleJoinActivity}
            isJoined={joinedActivities.has(activity.id)}
            onEditActivity={handleEditActivity}
            onDeleteActivity={handleDeleteActivity}
            isOwner={activity.organizer.name === 'Vi'}
          />
        ))}
      </div>

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nema aktivnosti koje odgovaraju vašim kriterijima pretrage.</p>
        </div>
      )}
    </div>
  );
}