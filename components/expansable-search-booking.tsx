'use client';

import { useState } from 'react';
import { Button } from '@nextui-org/button';
import SearchBooking from '@/components/search-booking';
import clsx from 'clsx';
import { Hotel } from '@/types';

interface SearchTranslations {
  room: string;
  room_popup: string;
  person_adult: string;
  person_child: string;
  person_popup: string;
  which_hotel: string;
}

interface ExpandableSearchSectionProps {
  countries: Hotel[];
  initialValues: any;
  text: string;
  textClose: string;
  translations: SearchTranslations;
}

export default function ExpandableSearchSection({ 
  countries, 
  initialValues, 
  text: text,
  textClose: textClose,
  translations
}: ExpandableSearchSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={clsx(
      'w-full lg:w-1/4 bg-secondary rounded-b-xl',
      'flex flex-col',
      'transition-all duration-300 ease-in-out',
      'lg:h-screen',
      isExpanded ? 'h-full' : 'h-auto'
    )}>
      {/* En-tête avec bouton toujours visible */}
      <div className="w-52 p-5 m-auto text-center">
        <Button 
          className="lg:hidden bg-transparent text-white hover:bg-white-500"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? textClose : text}
        </Button>

        <p className='hidden lg:block text-white text-center pb-4'>
          {text}
        </p>
      </div>

      {/* Contenu extensible */}
      <div className={clsx(
        'w-full flex-1 transition-all duration-300',
        'lg:opacity-100 lg:block',
        isExpanded 
          ? 'opacity-100 block' 
          : 'opacity-0 hidden'
      )}>
        <div className="flex justify-center px-5 pb-5">
          <SearchBooking 
            countries={countries}
            layout='vertical'
            roomWidth='60%'
            familyWidth='70%'
            countryWidth='80%'
            dateWidth='90%'
            initialValues={initialValues}
            roomText={translations.room}
            roomPopup={translations.room_popup}
            personAdult={translations.person_adult}
            personChild={translations.person_child}
            personPopup={translations.person_popup}
            whichHotel={translations.which_hotel}
          />
        </div>
      </div>
    </div>
  );
}