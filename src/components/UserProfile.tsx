import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { User, Edit, Settings, Activity } from 'lucide-react';
import { mockUsers } from '../data/mockData';

interface UserProfileProps {
  onBack: () => void;
}

export function UserProfile({ onBack }: UserProfileProps) {
  const [user] = useState(mockUsers[0]); // Trenutni korisnik
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    name: user.name,
    sports: [...user.sports],
  });

  const allSports = ['Fudbal', 'Košarka', 'Tenis', 'Odbojka', 'Trčanje', 'Plivanje', 'Odbojka na pijesku', 'Rukomet'];

  const handleSportToggle = (sport: string) => {
    setEditData(prev => ({
      ...prev,
      sports: prev.sports.includes(sport)
        ? prev.sports.filter(s => s !== sport)
        : [...prev.sports, sport]
    }));
  };

  const handleSave = () => {
    // Ovdje bi trebalo poslati podatke na server
    setIsEditing(false);
    alert('Profil je uspješno ažuriran!');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Profil</h2>
        <Button variant="outline" onClick={onBack}>
          Nazad na Dashboard
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Info */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-medium">Osnovne informacije</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit size={16} className="mr-2" />
                {isEditing ? 'Otkaži' : 'Uredi'}
              </Button>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gray-300 rounded-full flex items-center justify-center">
                <User size={24} />
              </div>
              <div>
                {isEditing ? (
                  <Input
                    value={editData.name}
                    onChange={(e) => setEditData(prev => ({ ...prev, name: e.target.value }))}
                    className="font-medium text-lg"
                  />
                ) : (
                  <h4 className="font-medium text-lg">{user.name}</h4>
                )}
                <p className="text-gray-600">Član od decembra 2023</p>
              </div>
            </div>

            <Separator className="my-6" />

            <div>
              <Label className="text-sm font-medium">Sportski afiniteti</Label>
              <div className="mt-3">
                {isEditing ? (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {allSports.map(sport => (
                      <div key={sport} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={sport}
                          checked={editData.sports.includes(sport)}
                          onChange={() => handleSportToggle(sport)}
                          className="rounded"
                        />
                        <Label htmlFor={sport} className="text-sm">{sport}</Label>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {user.sports.map(sport => (
                      <Badge key={sport} variant="secondary">
                        {sport}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {isEditing && (
              <div className="flex gap-3 mt-6">
                <Button onClick={handleSave} className="bg-black hover:bg-gray-800 text-white">
                  Sačuvaj promjene
                </Button>
                <Button variant="outline" onClick={() => setIsEditing(false)}>
                  Otkaži
                </Button>
              </div>
            )}
          </Card>
        </div>

        {/* Statistics */}
        <div className="space-y-6">
          <Card className="p-6">
            <h3 className="font-medium mb-4">Statistike</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Activity size={16} className="text-blue-600" />
                  <span className="text-sm">Organizovane aktivnosti</span>
                </div>
                <span className="font-medium">{user.organizedActivities}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <User size={16} className="text-green-600" />
                  <span className="text-sm">Učešća u aktivnostima</span>
                </div>
                <span className="font-medium">23</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Settings size={16} className="text-purple-600" />
                  <span className="text-sm">Omiljeni sport</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {user.sports[0] || 'N/A'}
                </Badge>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="font-medium mb-4">Nedavne aktivnosti</h3>
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">Fudbal - Večernja utakmica</p>
                <p className="text-gray-600">15.12.2024</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Tenis - Turnir parova</p>
                <p className="text-gray-600">12.12.2024</p>
              </div>
              <div className="text-sm">
                <p className="font-medium">Košarka - Jutarnji trening</p>
                <p className="text-gray-600">10.12.2024</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}