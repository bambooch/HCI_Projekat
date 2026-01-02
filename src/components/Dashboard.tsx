import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { toast } from 'sonner';
import { FilterBar } from './FilterBar';
import { ActivityCard } from './ActivityCard';
import { Activity } from '../types';
import { mockActivities } from '../data/mockData';

interface DashboardProps {
  onViewActivity: (activity: Activity) => void;
  onEditActivity?: (activity: Activity) => void;
}

const ITEMS_PER_PAGE = 12;

export function Dashboard({ onViewActivity, onEditActivity }: DashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSport, setSelectedSport] = useState('Svi sportovi');
  const [selectedLocation, setSelectedLocation] = useState('Sve lokacije');
  const [selectedDate, setSelectedDate] = useState('');
  const [joinedActivities, setJoinedActivities] = useState<Set<string>>(new Set());
  const [allActivities, setAllActivities] = useState<Activity[]>(mockActivities);
  const [displayedCount, setDisplayedCount] = useState(ITEMS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  // Load activities from localStorage on mount and when component updates
  // User-created activities appear first
  useEffect(() => {
    const savedActivities = JSON.parse(localStorage.getItem('activities') || '[]');
    if (savedActivities.length > 0) {
      setAllActivities([...savedActivities, ...mockActivities]);
    } else {
      setAllActivities(mockActivities);
    }
  }, []);

  // Reset displayed count when filters change
  useEffect(() => {
    setDisplayedCount(ITEMS_PER_PAGE);
  }, [searchTerm, selectedSport, selectedLocation, selectedDate]);

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

  const displayedActivities = useMemo(() => {
    return filteredActivities.slice(0, displayedCount);
  }, [filteredActivities, displayedCount]);

  const hasMore = displayedCount < filteredActivities.length;

  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;
    
    setIsLoading(true);
    // Simulate loading delay for smooth UX
    setTimeout(() => {
      setDisplayedCount(prev => Math.min(prev + ITEMS_PER_PAGE, filteredActivities.length));
      setIsLoading(false);
    }, 300);
  }, [isLoading, hasMore, filteredActivities.length]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    const currentTarget = observerTarget.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
    };
  }, [hasMore, isLoading, loadMore]);

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
    // Find the activity before deleting
    const activityToDelete = allActivities.find(a => a.id === activityId);
    
    if (!activityToDelete) return;
    
    // Store the current saved activities before deletion
    const savedActivities = JSON.parse(localStorage.getItem('activities') || '[]');
    const wasInStorage = savedActivities.some((a: Activity) => a.id === activityId);
    
    // Remove from localStorage if it exists there
    const updatedActivities = savedActivities.filter((a: Activity) => a.id !== activityId);
    localStorage.setItem('activities', JSON.stringify(updatedActivities));
    
    // Remove from state
    setAllActivities(allActivities.filter(a => a.id !== activityId));
    
    // Show toast with undo option
    toast.success('Aktivnost je obrisana', {
      description: activityToDelete.title,
      duration: 10000, // 10 seconds
      action: {
        label: 'Vrati',
        onClick: () => {
          // Restore the activity
          if (wasInStorage) {
            const currentSaved = JSON.parse(localStorage.getItem('activities') || '[]');
            localStorage.setItem('activities', JSON.stringify([...currentSaved, activityToDelete]));
          }
          
          setAllActivities(prevActivities => {
            // Check if it already exists to avoid duplicates
            if (prevActivities.some(a => a.id === activityId)) {
              return prevActivities;
            }
            return [...prevActivities, activityToDelete];
          });
          
          toast.success('Aktivnost je vraćena');
        },
      },
    });
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

      {filteredActivities.length > 0 && (
        <div className="mb-4 text-sm text-gray-600">
          Prikazano {displayedActivities.length} od {filteredActivities.length} aktivnosti
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {displayedActivities.map((activity) => (
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

      {/* Infinite scroll trigger */}
      {hasMore && (
        <div ref={observerTarget} className="flex justify-center py-8">
          {isLoading && (
            <div className="flex items-center gap-2 text-gray-600">
              <div className="w-5 h-5 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
              <span>Učitavanje...</span>
            </div>
          )}
        </div>
      )}

      {filteredActivities.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">Nema aktivnosti koje odgovaraju vašim kriterijima pretrage.</p>
        </div>
      )}
    </div>
  );
}