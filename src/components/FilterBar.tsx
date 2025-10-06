import React from 'react';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

interface FilterBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedSport: string;
  onSportChange: (value: string) => void;
  selectedLocation: string;
  onLocationChange: (value: string) => void;
  selectedDate: string;
  onDateChange: (value: string) => void;
}

export function FilterBar({
  searchTerm,
  onSearchChange,
  selectedSport,
  onSportChange,
  selectedLocation,
  onLocationChange,
  selectedDate,
  onDateChange,
}: FilterBarProps) {
  const sports = ['Svi sportovi', 'Fudbal', 'Košarka', 'Tenis', 'Odbojka', 'Trčanje', 'Plivanje'];
  const locations = ['Sve lokacije', 'Beograd', 'Novi Sad', 'Niš', 'Kragujevac'];

  return (
    <div className="bg-gray-50 p-4 rounded-lg mb-6">
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-64">
          <Input
            placeholder="Pretraži aktivnosti..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="bg-white"
          />
        </div>
        
        <Select value={selectedSport} onValueChange={onSportChange}>
          <SelectTrigger className="w-48 bg-white">
            <SelectValue placeholder="Svi sportovi" />
          </SelectTrigger>
          <SelectContent>
            {sports.map((sport) => (
              <SelectItem key={sport} value={sport}>
                {sport}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={onLocationChange}>
          <SelectTrigger className="w-48 bg-white">
            <SelectValue placeholder="Sve lokacije" />
          </SelectTrigger>
          <SelectContent>
            {locations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Input
          type="date"
          value={selectedDate}
          onChange={(e) => onDateChange(e.target.value)}
          className="w-48 bg-white"
        />
      </div>
    </div>
  );
}