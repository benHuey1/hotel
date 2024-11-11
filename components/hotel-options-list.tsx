'use client';

import { useState, useMemo } from 'react';
import { Room, Option } from '@/types';
import { Checkbox } from '@nextui-org/checkbox';
import clsx from 'clsx';

interface HotelOptionsListProps {
  Rooms: Room[];
  className?: string;
  onFilteredRooms: (rooms: Room[]) => void;
}

export default function HotelOptionsList({ 
  Rooms, 
  className,
  onFilteredRooms
}: HotelOptionsListProps) {
  // Extraction des options uniques avec comptage
  const { uniqueOptions, optionCount } = useMemo(() => {
    const optionsMap = new Map<string, Option>();
    const countMap = new Map<string, number>();
    
    Rooms.forEach(room => {
      room.options?.forEach(option => {
        if (!optionsMap.has(option.id)) {
          optionsMap.set(option.id, option);
          countMap.set(option.id, 1);
        } else {
          countMap.set(option.id, (countMap.get(option.id) || 0) + 1);
        }
      });
    });

    const sortedOptions = Array.from(optionsMap.values()).sort((a, b) => 
      a.name.localeCompare(b.name)
    );

    return {
      uniqueOptions: sortedOptions,
      optionCount: countMap
    };
  }, [Rooms]);

  // Fonction pour filtrer les chambres
  const filterRooms = (options: Set<string>) => {
    if (options.size === 0) {
      onFilteredRooms(Rooms); // Si aucune option sélectionnée, afficher toutes les chambres
      return;
    }

    const filteredRooms = Rooms.filter(room => {
      const roomOptions = new Set(room.options?.map(opt => opt.id));
      return Array.from(options).every(optionId => roomOptions.has(optionId));
    });

    onFilteredRooms(filteredRooms);
  };

  // État pour les checkboxes
  const [selectedOptions, setSelectedOptions] = useState<Set<string>>(new Set());

  // Gestionnaire de changement de checkbox
  const handleOptionChange = (optionId: string) => {
    const newSelected = new Set(selectedOptions);
    if (newSelected.has(optionId)) {
      newSelected.delete(optionId);
    } else {
      newSelected.add(optionId);
    }
    setSelectedOptions(newSelected);
    filterRooms(newSelected);
  };

  return (
    <div className={clsx(
      'w-full rounded-lg shadow-sm',
      className
    )}>
      <div className="p-4 border-b dark:border-gray-700">
        <h3 className="text-lg font-semibold">Filtrer par options</h3>
        {selectedOptions.size > 0 && (
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {selectedOptions.size} option{selectedOptions.size !== 1 ? 's' : ''} sélectionnée{selectedOptions.size !== 1 ? 's' : ''}
          </p>
        )}
      </div>

      <div className="p-4">
        <div className="grid grid-cols-1 gap-3">
          {uniqueOptions.map(option => (
            <div 
              key={option.id}
              className={clsx(
                'flex items-center p-2 rounded-md transition-colors',
                'hover:bg-gray-50 dark:hover:bg-gray-700 hover:rounded-lg'
              )}
            >
              <Checkbox
                value={option.id}
                isSelected={selectedOptions.has(option.id)}
                onValueChange={() => handleOptionChange(option.id)}
                className="mr-2"
              >
                <span className="flex items-center justify-between w-full">
                  <span>{option.name}</span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    ({optionCount.get(option.id) || 0} chambre{(optionCount.get(option.id) || 0) > 1 ? 's' : ''})
                  </span>
                </span>
              </Checkbox>
            </div>
          ))}
        </div>

        {uniqueOptions.length === 0 && (
          <p className="text-gray-500 dark:text-gray-400 italic text-center">
            Aucune option disponible
          </p>
        )}
      </div>
    </div>
  );
}