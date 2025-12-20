import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Activity } from '../types';

interface EditActivityProps {
  activity: Activity;
  onBack: () => void;
  onSaveActivity: (activity: Activity) => void;
}

export function EditActivity({ activity, onBack, onSaveActivity }: EditActivityProps) {
  const [formData, setFormData] = useState({
    sport: activity.sport || '',
    location: activity.location || '',
    date: activity.date || '',
    time: activity.time || '',
    maxParticipants: activity.maxParticipants?.toString() || '',
    description: activity.description || '',
  });
  const [successMessage, setSuccessMessage] = useState('');

  const sports = ['Fudbal', 'Košarka', 'Tenis', 'Odbojka', 'Trčanje', 'Plivanje'];

  // Get today's date in YYYY-MM-DD format to prevent selection of past dates
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.sport || !formData.location || !formData.date || !formData.time || !formData.maxParticipants) {
      alert('Molimo popunite sva obavezna polja.');
      return;
    }

    const updatedActivity: Activity = {
      ...activity,
      sport: formData.sport,
      location: formData.location,
      date: formData.date,
      time: formData.time,
      maxParticipants: parseInt(formData.maxParticipants),
      description: formData.description,
      title: `${formData.sport} - ${activity.title.split(' - ')[1] || 'Nova aktivnost'}`,
      sportTag: formData.sport,
    };

    // Get existing activities from localStorage
    const savedActivities = JSON.parse(localStorage.getItem('activities') || '[]');
    
    // Update the activity in the list
    const updatedActivities = savedActivities.map((a: Activity) =>
      a.id === activity.id ? updatedActivity : a
    );
    
    // Save to localStorage
    localStorage.setItem('activities', JSON.stringify(updatedActivities));

    onSaveActivity(updatedActivity);
    setSuccessMessage('Oglas je uspješno ažuriran!');
    
    // Redirect after 1.5 seconds
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateDate = (input: HTMLInputElement) => {
    if (input.value && new Date(input.value) < new Date(today)) {
      input.setCustomValidity(`Datum mora biti ${new Date(today).toLocaleDateString('bs-BA')} ili kasnije.`);
    } else {
      input.setCustomValidity('');
    }
  };

  const handleSportChange = (value: string) => {
    handleInputChange('sport', value);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Uredi Oglas</h2>
        <Button variant="outline" onClick={onBack}>
          Nazad
        </Button>
      </div>

      <Card className="p-6">
        <p className="text-gray-600 mb-6">Uredi detalje sportske aktivnosti</p>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="sport">Tip Sporta</Label>
            <Select value={formData.sport} onValueChange={handleSportChange}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Izaberi sport" />
              </SelectTrigger>
              <SelectContent>
                {sports.map((sport) => (
                  <SelectItem key={sport} value={sport}>
                    {sport}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="location">Lokacija</Label>
            <Input
              id="location"
              placeholder="Unesite lokaciju"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Datum</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                min={today}
                onChange={(e) => {
                  handleInputChange('date', e.target.value);
                  validateDate(e.target as HTMLInputElement);
                }}
                onBlur={(e) => {
                  validateDate(e.target as HTMLInputElement);
                }}
                onInvalid={(e) => {
                  if (e.target instanceof HTMLInputElement && e.target.validity.rangeUnderflow) {
                    e.target.setCustomValidity(`Datum mora biti ${new Date(today).toLocaleDateString('bs-BA')} ili senare.`);
                  }
                }}
                onInput={(e) => {
                  if (e.target instanceof HTMLInputElement) {
                    e.target.setCustomValidity('');
                    validateDate(e.target);
                  }
                }}
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="time">Vrijeme</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className="mt-1"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="maxParticipants">Potreban broj igrača</Label>
            <Input
              id="maxParticipants"
              type="number"
              placeholder="Unesite broj igrača"
              value={formData.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="description">Opis aktivnosti</Label>
            <Textarea
              id="description"
              placeholder="Dodajte dodatne informacije o aktivnosti..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="mt-1"
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Otkaži
            </Button>
            <Button type="submit" className="flex-1 bg-black hover:bg-gray-800 text-white">
              Sačuvaj Promjene
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
