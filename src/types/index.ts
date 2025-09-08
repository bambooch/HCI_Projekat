export interface User {
  id: string;
  name: string;
  avatar?: string;
  sports: string[];
  organizedActivities: number;
}

export interface Activity {
  id: string;
  title: string;
  sport: string;
  location: string;
  date: string;
  time: string;
  participants: number;
  maxParticipants: number;
  description: string;
  organizer: User;
  participantsList: User[];
  sportTag: string;
}

export interface ChatMessage {
  id: string;
  userId: string;
  userName: string;
  message: string;
  timestamp: string;
}

export type ViewType = 'dashboard' | 'create' | 'activity' | 'profile';