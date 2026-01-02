import { Activity, User, ChatMessage } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Marko Petrović',
    sports: ['Fudbal', 'Tenis', 'Košarka'],
    organizedActivities: 15,
  },
  {
    id: '2',
    name: 'Ana Jovanović',
    sports: ['Tenis', 'Odbojka'],
    organizedActivities: 8,
  },
  {
    id: '3',
    name: 'Stefan Nikolić',
    sports: ['Košarka', 'Trčanje'],
    organizedActivities: 12,
  },
  {
    id: '4',
    name: 'Milica Stojanović',
    sports: ['Plivanje', 'Tenis'],
    organizedActivities: 6,
  },
];

const generateActivities = (): Activity[] => {
  const sports = ['Fudbal', 'Košarka', 'Tenis', 'Odbojka', 'Trčanje', 'Plivanje'];
  const locations = [
    'Sportski centar "Partizan"',
    'Hala "Pinki"',
    'Teniski klub "Novak"',
    'Plaža "Ada Ciganlija"',
    'Park "Kalemegdan"',
    'Bazen "25. Maj"',
    'Sportski centar "Tašmajdan"',
    'Hala "Pionir"',
    'Arena "Kombank"',
    'Park "Ušće"',
    'Sportski centar "11. April"',
    'Bazen "Olymp"',
    'Teniski klub "Dril"',
    'Plaža "Savski kej"',
    'Stadion "Obilić"',
  ];
  
  const titles = [
    ['Fudbal - Večernja utakmica', 'Fudbal - Jutarnja liga', 'Fudbal - Vikend turnir', 'Fudbal - Prijateljska utakmica', 'Fudbal - Trening za početnike'],
    ['Košarka - Jutarnji trening', 'Košarka - Popodnevna liga', 'Košarka - 3x3 turnir', 'Košarka - Rekreativna igra', 'Košarka - Veče kosarke'],
    ['Tenis - Turnir parova', 'Tenis - Singles takmičenje', 'Tenis - Jutarnji trening', 'Tenis - Rekreativno', 'Tenis - Advanced tehnika'],
    ['Odbojka - Rekreativno', 'Odbojka - Plaža turnir', 'Odbojka - Liga vikenda', 'Odbojka - Trening za napredne', 'Odbojka - Otvorena igra'],
    ['Trčanje - Grupno', 'Trčanje - Maraton priprema', 'Trčanje - Sprint trening', 'Trčanje - Jutarnja šetnja', 'Trčanje - Trail running'],
    ['Plivanje - Jutarnje', 'Plivanje - Večernji trening', 'Plivanje - Tehnika plivanja', 'Plivanje - Kondicija', 'Plivanje - Masters grupa'],
  ];
  
  const descriptions = [
    'Pozivamo sve ljubitelje sporta na odličnu aktivnost! Dođite i uživajte u igri.',
    'Trening prilagođen svim nivoima iskustva. Svi su dobrodošli!',
    'Organizujemo sjajnu aktivnost za sve zainteresovane. Pridružite nam se!',
    'Rekreativna igra u opuštenoj atmosferi. Donesite dobro raspoloženje!',
    'Profesionalni trening sa iskusnim trenerom. Unapredite svoje veštine!',
    'Zabavna aktivnost za sve uzraste. Porodice su dobrodošle!',
    'Takmičarski duh i sportska igra. Budite deo tima!',
    'Jutarnja energija i motivacija uz sport. Počnite dan kako treba!',
    'Večernja opuštajuća aktivnost. Odličan način da završite dan!',
    'Grupna aktivnost sa sjajnom atmosferom. Upoznajte nove ljude!',
  ];
  
  const times = ['06:00', '06:30', '07:00', '08:00', '09:00', '10:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
  
  const activities: Activity[] = [];
  
  for (let i = 1; i <= 65; i++) {
    const sportIndex = (i - 1) % sports.length;
    const sport = sports[sportIndex];
    const titleOptions = titles[sportIndex];
    const title = titleOptions[(i - 1) % titleOptions.length];
    const location = locations[(i - 1) % locations.length];
    const description = descriptions[(i - 1) % descriptions.length];
    const time = times[(i - 1) % times.length];
    const organizerIndex = (i - 1) % mockUsers.length;
    
    // Generate dates from December 2024 through February 2026
    const baseDate = new Date(2024, 11, 15); // December 15, 2024
    const daysToAdd = Math.floor((i - 1) * 3); // Spread activities over time
    const activityDate = new Date(baseDate);
    activityDate.setDate(baseDate.getDate() + daysToAdd);
    
    const day = activityDate.getDate().toString().padStart(2, '0');
    const month = (activityDate.getMonth() + 1).toString().padStart(2, '0');
    const year = activityDate.getFullYear();
    const dateString = `${day}.${month}.${year}`;
    
    const maxParticipants = sport === 'Fudbal' ? 22 : sport === 'Košarka' ? 10 : sport === 'Odbojka' ? 12 : sport === 'Trčanje' ? 20 : sport === 'Plivanje' ? 15 : 8;
    const participants = Math.floor(Math.random() * (maxParticipants - 2)) + 2;
    
    const organizer = mockUsers[organizerIndex];
    const participantsList = [organizer, mockUsers[(organizerIndex + 1) % mockUsers.length]];
    
    activities.push({
      id: i.toString(),
      title,
      sport,
      location,
      date: dateString,
      time,
      participants,
      maxParticipants,
      description,
      organizer,
      participantsList,
      sportTag: sport,
    });
  }
  
  return activities;
};

export const mockActivities: Activity[] = generateActivities();

export const mockMessages: ChatMessage[] = [
  {
    id: '1',
    userId: '1',
    userName: 'Marko Petrović',
    message: 'Pozdrav svima! Radujemo se večerašnjoj utakmici. Molim vas da dođete 15 minuta prije za zagrijavanje.',
    timestamp: '14:30',
  },
  {
    id: '2',
    userId: '2',
    userName: 'Ana Jovanović',
    message: 'Super! Ja ću biti tu. Da li neko može da podijeli prevoz?',
    timestamp: '14:45',
  },
  {
    id: '3',
    userId: '3',
    userName: 'Stefan Nikolić',
    message: 'Mogu da pokupim 3 osobe iz centra grada. Javite se u privatnoj poruci.',
    timestamp: '15:10',
  },
  {
    id: '4',
    userId: '4',
    userName: 'Milica Stojanović',
    message: 'Odlično! Hvala Stefan. Da li je potrebno da donesemo loptu ili imate?',
    timestamp: '15:25',
  },
  {
    id: '5',
    userId: '1',
    userName: 'Marko Petrović',
    message: 'Imam loptu, ne brinite. Vidimo se večeras!',
    timestamp: '15:30',
  },
];