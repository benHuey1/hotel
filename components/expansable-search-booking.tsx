'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { Button } from '@nextui-org/button';
import SearchBooking from '@/components/search-booking';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { ExpandableSearchSectionProps, Room } from '@/types';
import { Checkbox } from '@nextui-org/react';
import HotelOptionsList from './hotel-options-list';
import MapBox from './map';

interface SelectedOptions {
  [key: string]: boolean;
}

export default function ExpandableSearchSection({ 
  countries,
  hotel,
  initialValues, 
  translationExpandable,
  Rooms,
  onFilteredRooms
}: ExpandableSearchSectionProps) {
  // console.log("Les chambres, Expandable page : ", Rooms);
  console.log("L'Hotel, Expandable page : ", hotel);
  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});
  const containerRef = useRef<HTMLDivElement>(null);
  const [displayedRooms, setDisplayedRooms] = useState<Room[]>(Rooms);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {

      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsExpanded(false);
      }
    }

    // Ajouter les écouteurs d'événements seulement si la div est étendue
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
    }

    // Nettoyage
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [isExpanded]);

    // Gestionnaire pour la remontée des chambres filtrées
    const handleFilteredRooms = (filteredRooms: Room[]) => {
      if (onFilteredRooms) {
        onFilteredRooms(filteredRooms);
      }
    };

    // Trouver le marker correspondant au pays de l'hôtel
  const currentMarker = useMemo(() => {
    if (!hotel?.country) return null;
    
    return markers.find(
      marker => marker.country.toLowerCase() === hotel.country.toLowerCase()
    );
  }, [hotel?.country]);

  // Créer un tableau avec uniquement le marker de l'hôtel actuel s'il existe
  const activeMarkers = useMemo(() => {
    return currentMarker ? [currentMarker] : [];
  }, [currentMarker]);

  return (
    <div 
    ref={containerRef}
    className={clsx(
      'w-full lg:w-1/4 bg-secondary rounded-b-xl',
      'flex flex-col lg:justify-start',
      'transition-all duration-300 ease-in-out',
      'lg:h-full',
      isExpanded ? 'h-full' : 'h-auto'
    )}>
        <div className='hidden lg:flex flex-col m-4 gap-4'>
            <p className='text-white text-center pb-4'>
            {translationExpandable.text}
            </p>
            <SearchBooking 
                countries={countries}
                layout='vertical'
                roomWidth='60%'
                familyWidth='70%'
                countryWidth='80%'
                dateWidth='90%'
                initialValues={initialValues}
                roomText={translationExpandable.room}
                roomPopup={translationExpandable.room_popup}
                personAdult={translationExpandable.person_adult}
                personChild={translationExpandable.person_child}
                personPopup={translationExpandable.person_popup}
                whichHotel={translationExpandable.which_hotel}
            />
            <div className='bg-white dark:bg-black flex flex-col p-4 rounded-xl gap-4'>
              <HotelOptionsList 
                Rooms={Rooms}
                className="mb-6"
                onFilteredRooms={handleFilteredRooms}
              />
              <div 
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative"
              >
                {currentMarker ? (
              <MapBox
                markers={activeMarkers}
                center={[currentMarker.longitude, currentMarker.latitude]}
                zoom={currentMarker.zoom}
                title={`Hotel Karibu - ${hotel.capital}`}
                className="w-full h-[200px] rounded shadow-lg"
              />
                ):(
                  <div className="text-center text-gray-500 p-4">
                    Localisation non disponible
                  </div>
                )}
              </div>
              {/* {options.map((option) => (
                // <div id={option.id} className='flex items-center gap-5'>
                //   <Checkbox radius="sm" lineThrough className='w-full'>{option.name} isSelected={selectedOptions[option.id]} onValueChange={() => handleOptionChange(option.id)}</Checkbox>
                // </div>
                <motion.div 
                key={option.id}
                whileHover={{ scale: 1.02 }}
                className='flex items-center'
              >
                <Checkbox
                  isSelected={selectedOptions[option.id] || false}
                  onChange={() => handleOptionChange(option.id)}
                >
                  {option.name}
                </Checkbox>
              </motion.div>
              ))} */}
            </div>
        </div>
      {/* En-tête avec bouton toujours visible */}
        <div className="w-52 p-5 m-auto text-center">
            <Button 
            className="lg:hidden bg-transparent text-white hover:bg-white-500"
            onClick={() => setIsExpanded(!isExpanded)}
            endContent={
                <motion.svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="currentColor"
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="text-white"
                >
                <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                </motion.svg>
            }
            >
            {isExpanded ? translationExpandable.textClose : translationExpandable.text}
            </Button>
        </div>

      {/* Contenu extensible */}
      {/* <div className={clsx(
        'w-full flex-1 transition-all duration-300',
        'lg:opacity-100 lg:block',
        isExpanded 
          ? 'opacity-100 block' 
          : 'opacity-0 hidden'
      )}>
        <div  */}
        <AnimatePresence initial={false}>
            <motion.div
            className={clsx(
                'w-full overflow-hidden flex flex-col items-center',
                'lg:opacity-100 lg:hidden',
                !isExpanded && 'lg:!h-auto'
            )}
            animate={{
                height: isExpanded ? 'auto' : 0,
                opacity: isExpanded ? 1 : 0,
            }}
            initial={{
                height: 0,
                opacity: 0,
            }}
            exit={{
                height: 0,
                opacity: 0,
            }}
            transition={{
                duration: 0.3,
                ease: [0.4, 0, 0.2, 1],
            }}
            >
                <motion.div
                    animate={{
                    y: isExpanded ? 0 : -20,
                    }}
                    transition={{
                    duration: 0.3,
                    ease: [0.4, 0, 0.2, 1],
                    }}
                className="w-full md:w-2/3 lg:w-full px-5 pb-5">
                    <SearchBooking 
                        countries={countries}
                        layout='vertical'
                        roomWidth='60%'
                        familyWidth='70%'
                        countryWidth='80%'
                        dateWidth='90%'
                        initialValues={initialValues}
                        roomText={translationExpandable.room}
                        roomPopup={translationExpandable.room_popup}
                        personAdult={translationExpandable.person_adult}
                        personChild={translationExpandable.person_child}
                        personPopup={translationExpandable.person_popup}
                        whichHotel={translationExpandable.which_hotel}
                    />
                    <HotelOptionsList 
                      Rooms={Rooms}
                      className="mb-6 bg-white dark:bg-black rounded-xl mt-4"
                      onFilteredRooms={handleFilteredRooms}
                    />
                </motion.div>
            </motion.div>
        </AnimatePresence>
    </div>
  );
}

const markers = [
  {
    id: '1',
    longitude: 39.406544,
    latitude: -6.042782,
    country: 'tanzanie',
    title: 'Hotel Dar-Es-Salaam',
    description: 'Un magnifique hôtel 5 étoiles',
    zoom: 7
  },
  {
    id: '2',
    longitude: -17.420279352408354,
    latitude: 14.70179990170513, 
    country: 'sénégal',
    title: 'Hotel Dakar',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 11
  },
  {
    id: '3',
    longitude: 2.2835424,
    latitude: 48.8589926830474,
    country: 'france',
    title: 'Hotel Paris',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 12
  },
  {
    id: '4',
    longitude: -0.07479856312967782,
    latitude: 51.50315709908272,
    country: 'angleterre',
    title: 'Hotel Londres',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 13
  },
  {
    id: '5',
    longitude: 127.00398077708064,
    latitude: 37.55058221756929, 
    country: 'corée du sud',
    title: 'Hotel Séoul',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 13
  },
  {
    id: '6',
    longitude: 139.71542609765197,
    latitude: 35.68507205147898,  
    country: 'japon',
    title: 'Hotel Tokyo',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 13
  },
  {
    id: '7',
    longitude: 151.2165446437753,
    latitude: -33.85101206660542,  
    country: 'australie',
    title: 'Hotel Sydney',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 12
  },
  {
    id: '8',
    longitude: 174.78939075667105,
    latitude: -41.29287973033376, 
    country: 'nouvelle-zélande',  
    title: 'Hotel Wellington',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 13
  },
  {
    id: '9',
    longitude: -75.70060514505592,
    latitude: 45.42032494068445,  
    country: 'canada',  
    title: 'Hotel Ottawa',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 12
  },
  {
    id: '10',
    longitude: -82.34991068873572,
    latitude: 23.13671417847102,  
    country: 'cuba',  
    title: 'Hotel La Havane',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 14
  },
  {
    id: '11',
    longitude: -43.18184345910592,
    latitude: -22.907207217833914,  
    country: 'brésil',   
    title: 'Hotel Rio De Janéiro',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 13
  },
  {
    id: '12',
    longitude: -70.64470441492745,
    latitude: -33.437250708202,   
    country: 'chili',  
    title: 'Hotel Santiago',
    description: 'Parfait pour les voyages d\'affaires',
    zoom: 12
  }
];