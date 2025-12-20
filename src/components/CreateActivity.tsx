import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Activity } from '../types';

interface CreateActivityProps {
  onBack: () => void;
  onCreateActivity?: (activity: Activity) => void;
}

export function CreateActivity({ onBack, onCreateActivity }: CreateActivityProps) {
  const [formData, setFormData] = useState({
    sport: '',
    location: '',
    date: '',
    time: '',
    maxParticipants: '',
    description: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errors, setErrors] = useState({
    sport: '',
    location: '',
    date: '',
    time: '',
    maxParticipants: '',
    description: '',
  });

  const sports = ['Fudbal', 'Košarka', 'Tenis', 'Odbojka', 'Trčanje', 'Plivanje'];

  // Get today's date in YYYY-MM-DD format to prevent selection of past dates
  const today = new Date().toISOString().split('T')[0];

  const validateForm = () => {
    const newErrors = {
      sport: '',
      location: '',
      date: '',
      time: '',
      maxParticipants: '',
      description: '',
    };

    let isValid = true;

    // Validate sport
    if (!formData.sport) {
      newErrors.sport = 'Tip sporta je obavezan.';
      isValid = false;
    }

    // Validate location
    if (!formData.location.trim()) {
      newErrors.location = 'Lokacija je obavezna.';
      isValid = false;
    } else if (formData.location.trim().length < 3) {
      newErrors.location = 'Lokacija mora imati najmanje 3 karaktera.';
      isValid = false;
    }

    // Validate date
    if (!formData.date) {
      newErrors.date = 'Datum je obavezan.';
      isValid = false;
    } else if (new Date(formData.date) < new Date(today)) {
      newErrors.date = `Datum mora biti ${new Date(today).toLocaleDateString('bs-BA')} ili kasnije.`;
      isValid = false;
    }

    // Validate time
    if (!formData.time) {
      newErrors.time = 'Vrijeme je obavezno.';
      isValid = false;
    }

    // Validate maxParticipants
    if (!formData.maxParticipants) {
      newErrors.maxParticipants = 'Broj igrača je obavezan.';
      isValid = false;
    } else {
      const num = parseInt(formData.maxParticipants);
      if (isNaN(num) || num < 2) {
        newErrors.maxParticipants = 'Broj igrača mora biti najmanje 2.';
        isValid = false;
      } else if (num > 100) {
        newErrors.maxParticipants = 'Broj igrača ne može biti veći od 100.';
        isValid = false;
      }
    }

    // Validate description (optional, but check if too long)
    if (formData.description && formData.description.length > 500) {
      newErrors.description = 'Opis ne može biti duži od 500 karaktera.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Molimo pregledajte i ispravite greške u formi. Polja sa greškama su označena crvenom bojom.');
      return;
    }

    const newActivity = {
      ...formData,
      id: Date.now().toString(),
      title: `${formData.sport} - Nova aktivnost`,
      participants: 1,
      maxParticipants: parseInt(formData.maxParticipants),
      organizer: { id: '1', name: 'Vi', sports: [], organizedActivities: 0 },
      participantsList: [],
      sportTag: formData.sport,
    };

    // Get existing activities from localStorage
    const existingActivities = JSON.parse(localStorage.getItem('activities') || '[]');
    
    // Add new activity to the list
    const updatedActivities = [...existingActivities, newActivity];
    
    // Save to localStorage
    localStorage.setItem('activities', JSON.stringify(updatedActivities));

    // Also call onCreateActivity if provided (for backward compatibility)
    if (onCreateActivity) {
      onCreateActivity(newActivity);
    }

    setSuccessMessage('Oglas je uspješno kreiran!');
    
    // Reset form
    setFormData({
      sport: '',
      location: '',
      date: '',
      time: '',
      maxParticipants: '',
      description: '',
    });

    // Redirect after 1.5 seconds
    setTimeout(() => {
      onBack();
    }, 1500);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
        <h2 className="text-xl font-medium">Kreiraj Novi Oglas</h2>
        <Button variant="outline" onClick={onBack}>
          Nazad
        </Button>
      </div>

      <Card className="p-6">
        <p className="text-gray-600 mb-6">Popuni formu da kreiraš oglas za sportsku aktivnost</p>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="sport">Tip Sporta *</Label>
            <Select value={formData.sport} onValueChange={handleSportChange}>
              <SelectTrigger className={`mt-1 ${errors.sport ? 'border-red-500 focus:ring-red-500' : ''}`}>
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
            {errors.sport && <p style={{color: '#dc2626'}} className="font-medium text-sm mt-1">{errors.sport}</p>}
          </div>

          <div>
            <Label htmlFor="location">Lokacija *</Label>
            <Input
              id="location"
              placeholder="Unesite lokaciju"
              value={formData.location}
              onChange={(e) => handleInputChange('location', e.target.value)}
              className={`mt-1 ${errors.location ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {errors.location && <p style={{color: '#dc2626'}} className="font-medium text-sm mt-1">{errors.location}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Datum *</Label>
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
                    e.target.setCustomValidity(`Datum mora biti ${new Date(today).toLocaleDateString('bs-BA')} ili kasnije.`);
                  }
                }}
                onInput={(e) => {
                  if (e.target instanceof HTMLInputElement) {
                    e.target.setCustomValidity('');
                    validateDate(e.target);
                  }
                }}
                className={`mt-1 ${errors.date ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.date && <p style={{color: '#dc2626'}} className="font-medium text-sm mt-1">{errors.date}</p>}
            </div>
            <div>
              <Label htmlFor="time">Vrijeme *</Label>
              <Input
                id="time"
                type="time"
                value={formData.time}
                onChange={(e) => handleInputChange('time', e.target.value)}
                className={`mt-1 ${errors.time ? 'border-red-500 focus:ring-red-500' : ''}`}
              />
              {errors.time && <p style={{color: '#dc2626'}} className="font-medium text-sm mt-1">{errors.time}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="maxParticipants">Potreban broj igrača *</Label>
            <Input
              id="maxParticipants"
              type="number"
              min="2"
              max="100"
              placeholder="Unesite broj igrača"
              value={formData.maxParticipants}
              onChange={(e) => handleInputChange('maxParticipants', e.target.value)}
              className={`mt-1 ${errors.maxParticipants ? 'border-red-500 focus:ring-red-500' : ''}`}
            />
            {errors.maxParticipants && <p style={{color: '#dc2626'}} className="font-medium text-sm mt-1">{errors.maxParticipants}</p>}
          </div>

          <div>
            <Label htmlFor="description">Opis aktivnosti</Label>
            <Textarea
              id="description"
              placeholder="Dodajte dodatne informacije o aktivnosti..."
              rows={4}
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className={`mt-1 ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
              maxLength={500}
            />
            {errors.description && <p style={{color: '#dc2626'}} className="font-medium text-sm mt-1">{errors.description}</p>}
            {formData.description && !errors.description && (
              <p className="text-gray-500 text-sm mt-1">{formData.description.length}/500 karaktera</p>
            )}
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onBack} className="flex-1">
              Otkaži
            </Button>
            <Button type="submit" className="flex-1 bg-black hover:bg-gray-800 text-white">
              Objavi Oglas
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}