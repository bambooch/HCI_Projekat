import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { MapPin, Calendar, Clock, Users } from 'lucide-react';
import { Activity } from '../types';

interface ActivityCardProps {
  activity: Activity;
  onViewDetails: (activity: Activity) => void;
  onJoinActivity: (activityId: string) => void;
  isJoined?: boolean;
}

export function ActivityCard({ activity, onViewDetails, onJoinActivity, isJoined = false }: ActivityCardProps) {
  return (
    <Card className="p-4 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium">{activity.title}</h3>
            <Badge variant="secondary" className="text-xs">
              {activity.sportTag}
            </Badge>
          </div>
          
          <div className="space-y-1 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>Lokacija: {activity.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar size={14} />
              <span>Datum: {activity.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={14} />
              <span>Vrijeme: {activity.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={14} />
              <span>Igrači: {activity.participants}/{activity.maxParticipants}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(activity)}
          className="flex-1"
        >
          Detalji
        </Button>
        <Button
          size="sm"
          onClick={() => onJoinActivity(activity.id)}
          disabled={isJoined || activity.participants >= activity.maxParticipants}
          className={`flex-1 ${
            isJoined 
              ? 'bg-green-600 hover:bg-green-700 text-white' 
              : 'bg-black hover:bg-gray-800 text-white'
          }`}
        >
          {isJoined ? 'Prijavljen/a' : 'Prijavi se'}
        </Button>
      </div>
    </Card>
  );
}