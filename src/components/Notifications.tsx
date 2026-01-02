import React from 'react';
import { Bell, Users, MessageCircle, Calendar, Info, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Notification } from '../types';

interface NotificationsProps {
  onBack: () => void;
}

// Mock notifications data
const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'join',
    title: 'Nova prijava',
    message: 'Marko Marković se prijavio na tvoju aktivnost "Košarka u Pioniru"',
    timestamp: '2025-10-08T10:30:00',
    read: false,
    activityId: '1',
    activityTitle: 'Košarka u Pioniru'
  },
  {
    id: '2',
    type: 'message',
    title: 'Nova poruka',
    message: 'Ana Anić je poslala poruku u grupi "Fudbal - Subota"',
    timestamp: '2025-10-08T09:15:00',
    read: false,
    activityId: '2',
    activityTitle: 'Fudbal - Subota'
  },
  {
    id: '3',
    type: 'reminder',
    title: 'Podsjetnik',
    message: 'Tvoja aktivnost "Planinarenje - Trebević" počinje za 2 sata',
    timestamp: '2025-10-08T08:00:00',
    read: false,
    activityId: '3',
    activityTitle: 'Planinarenje - Trebević'
  },
  {
    id: '4',
    type: 'update',
    title: 'Ažuriranje aktivnosti',
    message: 'Organizator je promijenio vrijeme za "Tenis u Grbavici" sa 18:00 na 19:00',
    timestamp: '2025-10-07T16:45:00',
    read: true,
    activityId: '4',
    activityTitle: 'Tenis u Grbavici'
  },
  {
    id: '5',
    type: 'join',
    title: 'Nova prijava',
    message: 'Petar Petrović se prijavio na tvoju aktivnost "Odbojka na plaži"',
    timestamp: '2025-10-07T14:20:00',
    read: true,
    activityId: '5',
    activityTitle: 'Odbojka na plaži'
  },
  {
    id: '6',
    type: 'message',
    title: 'Nova poruka',
    message: 'Ivan Ivanović: "Može li neko da donese loptu?"',
    timestamp: '2025-10-07T12:30:00',
    read: true,
    activityId: '1',
    activityTitle: 'Košarka u Pioniru'
  },
  {
    id: '7',
    type: 'reminder',
    title: 'Podsjetnik',
    message: 'Ne zaboravi da potvrdiš svoju prijavu za "Yoga u parku" do sutra',
    timestamp: '2025-10-06T18:00:00',
    read: true,
    activityId: '6',
    activityTitle: 'Yoga u parku'
  }
];

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'join':
      return <Users className="w-5 h-5 text-blue-600" />;
    case 'message':
      return <MessageCircle className="w-5 h-5 text-green-600" />;
    case 'reminder':
      return <Calendar className="w-5 h-5 text-orange-600" />;
    case 'update':
      return <Info className="w-5 h-5 text-purple-600" />;
    default:
      return <Bell className="w-5 h-5 text-gray-600" />;
  }
};

const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 60) {
    return `prije ${diffMins} min`;
  } else if (diffHours < 24) {
    return `prije ${diffHours}h`;
  } else if (diffDays === 1) {
    return 'jučer';
  } else if (diffDays < 7) {
    return `prije ${diffDays} dana`;
  } else {
    return date.toLocaleDateString('bs-BA', { day: 'numeric', month: 'short' });
  }
};

export function Notifications({ onBack }: NotificationsProps) {
  const [notifications, setNotifications] = React.useState<Notification[]>(mockNotifications);
  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium flex items-center space-x-2">
          <Bell className="w-6 h-6" />
          <span>Notifikacije</span>
          {unreadCount > 0 && (
            <Badge variant="destructive" className="ml-2">
              {unreadCount}
            </Badge>
          )}
        </h2>
        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
          >
            Označi sve kao pročitano
          </Button>
        )}
      </div>

      <div className="space-y-3">
          {notifications.map((notification) => (
            <Card
              key={notification.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white'
              }`}
              onClick={() => markAsRead(notification.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 mt-0.5 bg-gray-50 p-3 rounded-full">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-sm text-gray-900 flex items-center space-x-2">
                          <span>{notification.title}</span>
                          {!notification.read && (
                            <Badge variant="default" className="bg-blue-600 text-xs px-1.5 py-0">
                              Nova
                            </Badge>
                          )}
                        </h3>
                        <p className="text-sm text-gray-700 mt-1">
                          {notification.message}
                        </p>
                        {notification.activityTitle && (
                          <div className="mt-2">
                            <Badge variant="outline" className="text-xs">
                              {notification.activityTitle}
                            </Badge>
                          </div>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {formatTimestamp(notification.timestamp)}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

        {notifications.length === 0 && (
          <div className="text-center py-12">
            <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-600 mb-2">
              Nema notifikacija
            </h3>
            <p className="text-gray-500">
              Ovdje će se prikazivati obavještenja o tvojim aktivnostima
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
