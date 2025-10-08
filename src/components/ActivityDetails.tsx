import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Chat } from './Chat';
import { Calendar, Clock, MapPin, User, Bell } from 'lucide-react';
import { Activity } from '../types';

interface ActivityDetailsProps {
  activity: Activity;
  onBack: () => void;
}

export function ActivityDetails({ activity, onBack }: ActivityDetailsProps) {
  const [isJoined, setIsJoined] = useState(false);

  const handleJoinActivity = () => {
    setIsJoined(!isJoined);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4 sm:space-x-8">
          <h1 className="font-semibold text-base sm:text-lg">SportConnect</h1>
          <nav className="hidden md:flex space-x-6">
            <button
              onClick={onBack}
              className="text-gray-600 hover:text-gray-900"
            >
              Dashboard
            </button>
            <button className="text-primary">Aktivnosti</button>
            <button className="text-gray-600 hover:text-gray-900">Profil</button>
          </nav>
        </div>
        
        <div className="flex items-center space-x-2 sm:space-x-3">
          <Button variant="ghost" size="sm" className="hidden md:flex">
            Notifikacije
          </Button>
          <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
            <User size={16} />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Details */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-xl font-semibold mb-2">{activity.title}</h2>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>Datum: {activity.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>Vrijeme: {activity.time}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span>Lokacija: {activity.location}</span>
                  </div>
                </div>
              </div>
              <Button
                onClick={handleJoinActivity}
                className={`${
                  isJoined 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                {isJoined ? 'Prijavi se' : 'Prijavi se'}
              </Button>
            </div>

            <div>
              <h3 className="font-medium mb-2">Opis Aktivnosti</h3>
              <p className="text-gray-700 text-sm leading-relaxed">
                {activity.description}
              </p>
            </div>
          </Card>

          {/* Organizer */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">Organizator</h3>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                {activity.organizer.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium">{activity.organizer.name}</p>
                <p className="text-sm text-gray-600">Organizovao {activity.organizer.organizedActivities} aktivnosti</p>
              </div>
            </div>
          </Card>

          {/* Participants */}
          <Card className="p-6">
            <h3 className="font-medium mb-4">
              Učesnici ({activity.participants}/{activity.maxParticipants})
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {activity.participantsList.map((participant) => (
                <div key={participant.id} className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-sm">
                    {participant.name.charAt(0)}
                  </div>
                  <span className="text-sm truncate">{participant.name}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Chat Section */}
        <div className="lg:col-span-1">
          <Chat />
        </div>
      </div>
    </div>
  );
}