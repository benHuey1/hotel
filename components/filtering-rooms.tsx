// 'use client';

// import { Hotel, Option, Room } from "@/types";
// import { useEffect, useState } from "react";
// import { PersonIcon } from "./icons";
// import Caroussel from "./caroussel";
// import { Link } from "@nextui-org/link";
// import { Button } from "@nextui-org/button";

// export default function FilteringRooms(hotel: Hotel[], 
//     t: string,
//     tGen: string,
//     tSearch: string 
// ) {
//     const [filteredRooms, setFilteredRooms] = useState<Room[]>(hotel.rooms);
//     const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
    
//     const filterRooms = (optionIds: string[]) => {
//         if (optionIds.length === 0) {
//         setFilteredRooms(hotel.Rooms);
//         return;
//         }
    
//         const filtered = hotel.Rooms.filter((room: { options: any[]; }) => {
//         return optionIds.every(optionId => 
//             room.options.some(option => option.id === optionId)
//         );
//         });
    
//         setFilteredRooms(filtered);
//     };
  
//     const handleFilterChange = (selectedOptionIds: string[]) => {
//         if (selectedOptionIds.length === 0) {
//         setFilteredRooms(hotel.Rooms);
//         return;
//         }

//         const filtered = hotel.Rooms.filter((room: { options: any[]; }) => {
//         return selectedOptionIds.every(optionId => 
//             room.options.some(option => option.id === optionId)
//         );
//         });

//         setFilteredRooms(filtered);
//     };

//     useEffect(() => {
//         filterRooms(selectedOptions);
//     }, [selectedOptions, hotel.Rooms]);

//     return(
//         <>
//         {/* {filteredRooms.length > 0 ? ( */}
//         {hotel.Rooms && hotel.Rooms.length > 0 ? (
//             <>
//               <div className='flex flex-col gap-20'>
//                 {/* {hotel.Rooms.map((room: Room, index: number) => ( */}
//                 {filteredRooms.map((room: Room, index: number) => (
//                     // <div className='w-full flex flex-col md:flex-row hover:outline outline-secondary outline-offset-4 rounded-lg'>
//                     <div className='w-full flex flex-col lg:flex-row hover:outline outline-transparent hover:outline-secondary outline-offset-8 transition-all duration-300 ease-in-out'>
//                       {room.pictures && room.pictures.length > 0 && <div className="w-full lg:w-1/2 rounded-lg"><Caroussel pictures={room.pictures} /></div>}
//                       <div key={room.id} className='w-full lg:w-1/2 flex flex-col md:justify-between p-2 gap-4'>
//                         <div>
//                           <h3 className="text-secondary flex gap-2">
//                             {/* {room.type.name} - {room.capacity} <PersonIcon /> */}
//                             {room.type} - {room.capacity} <PersonIcon />
//                           </h3>
//                           <h4 className='text-secondary underline underline-offset-2'>{hotel.country}</h4>
//                         </div>
//                         {/* <p>
//                           {t("options")}:{' '}
//                           {room.options && room.options.length > 0
//                             ? room.options.map((option: Option) => option.name).join(', ')
//                             : 'Aucune'}
//                         </p> */}
//                         <div className="columns-2 gap-4 space-y-2 p-4 rounded-lg bg-transparent">
//                           {room.options && room.options.length > 0 ? (
//                             <>
//                               {room.options.slice(0, 5).map((option: Option) => (
//                                 <p 
//                                   key={option.id} 
//                                   className="break-inside-avoid p-2 bg-gray-50 dark:bg-slate-800 rounded shadow-sm mb-2 hover:bg-white dark:hover:bg-black transition-colors"
//                                 >
//                                   {option.name}
//                                 </p>
//                               ))}
//                               {room.options.length > 5 && (
//                                 <div 
//                                   className="break-inside-avoid p-2 bg-gray-50 dark:bg-slate-800 rounded shadow-sm mb-2 hover:bg-white transition-colors"
//                                 >
//                                   <p className="font-semibold text-gray-500 text-center">
//                                     +{room.options.length - 5} {tGen("other")}{room.options.length - 5 > 1 ? "s" : ""}...
//                                   </p>
//                                 </div>
//                               )}
//                             </>
//                           ) : (
//                             <p className="text-gray-500 italic">Aucune option disponible</p>
//                           )}
//                         </div>
//                         <div className='flex flex-col-reverse md:flex-row md:justify-start gap-4'>
//                           <div className='w-full md:w-1/5 text-center'>
//                             {/* <Link href={`/hotels/${hotel.id}/rooms/${room.id}`}> */}
//                             <Link href={buildRoomUrl(room.id)}>
//                             {/* <Link href={`/${params.locale}/hotels/${params.hotelId}?rooms=${room}&adults=${adultsNum}&children=${childrenNum}&start=${startDate?.toLocaleDateString().split('T')[0]}&end=${endDate?.toLocaleDateString().split('T')[0]}/rooms/${room.id}`}> */}
//                               <Button color="secondary">{t("details")}</Button>
//                             </Link>
//                           </div>
//                           <div className='w-full flex justify-between'>
//                             <p className='underline underline-offset-4 content-center'><b>{room.cost} €</b>/{t("night")}</p>
//                             {bookingNights && bookingNights ? (
//                               <>
//                                 <p className='content-center'> {bookingNights} {t("night")}s</p>
//                                 <p className='content-center'>Total: {bookingNights*room.cost} €</p>
//                               </>
//                             ) : (
//                               <p className='text-red-500 content-center'>{t("missing_date")}</p>
//                             )}
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                 ))}
//               </div>
//             </>
//           ) : (
//             <p>{t("no_room_available")}</p>
//           )}</>
//     )
// }

'use client';

import { useEffect, useState } from 'react';
import { Room, Hotel, Option, HotelWithRelations } from '@/types';
import Caroussel from './caroussel';
import { ArrowBackIcon, PersonIcon } from './icons';
import { Link } from '@nextui-org/link';
import { Button } from '@nextui-org/button';
import ExpandableSearchSection from './expansable-search-booking';

interface HotelRoomsSectionProps {
  hotel: Hotel;
  bookingNights: number;
  locale: string;
  translationsRooms: any;
  translationsExpandable: any;
  countries: HotelWithRelations[];
  initialValues: any;
  finalValues: any;
  Rooms: Room[];
}

export default function HotelRoomsSection({
  hotel,
  bookingNights,
  locale,
  translationsRooms,
  translationsExpandable,
  countries,
  initialValues,
  finalValues,
  Rooms
}: HotelRoomsSectionProps) {
  // console.log("Les chambres, depuis HotelRoomsSection : ", Rooms);
  // console.log("L'hotel, depuis HotelRoomsSection : ", hotel);
  // console.log("Valeurs initiales - HotelRoomsSection", initialValues);
  // console.log("Valeurs finales - HotelRoomsSection", finalValues);
  // console.log("Locale - HotelRoomsSection", locale);
  
  const [displayedRooms, setDisplayedRooms] = useState<Room[]>(Rooms);

  // Fonction pour construire l'URL avec les paramètres de recherche
  const buildRoomUrl = (roomId: string) => {
    const urlParams = new URLSearchParams({
      rooms: finalValues.rooms as string || '',
      adults: finalValues.adults as string || '',
      children: finalValues.children as string || '',
      start: finalValues.startDate as string || '',
      end: finalValues.endDate as string || '',
    });
    return `/${locale}/hotels/${hotel.id}/rooms/${roomId}?${urlParams.toString()}`;
  };

  // Initialisation et mise à jour des chambres affichées
  useEffect(() => {
    setDisplayedRooms(Rooms);
  }, [Rooms]);

  // Gestionnaire pour la mise à jour des chambres filtrées
  const handleFilteredRooms = (filteredRooms: Room[]) => {
    setDisplayedRooms(filteredRooms);
  };

  return (
    <>
      <ExpandableSearchSection 
        countries={countries}
        initialValues={initialValues}
        translationExpandable={translationsExpandable}
        Rooms={Rooms}
        onFilteredRooms={handleFilteredRooms}
      />
      {/* <div className='w-full lg:w-1/4 h-16 overflow-hidden lg:h-screen flex flex-col justify-start bg-secondary rounded-b-xl content-center lg:content-start py-5 px-5'>
        <Button className="block lg:hidden bg-transparent text-white hover:bg-gray-500">
            {t("modify_research")}
        </Button>
        <p className='hidden lg:block text-white text-center pb-4'>{t("modify_research")}</p>
        <div className='w-full flex justify-center'>
          <SearchBooking countries={countries} layout='vertical' roomWidth='60%' familyWidth='70%' countryWidth='80%' dateWidth='90%' initialValues={initialValues} roomText={tSearch('room')} roomPopup={tSearch('room_popup')} personAdult={tSearch('person_adult')} personChild={tSearch('person_child')} personPopup={tSearch('person_popup')} whichHotel={tSearch('which_hotel')}/>
        </div>
      </div> */}
      <div className='w-full h-full lg:w-3/4 p-5'>
        <h1 className='underline underline-offset-4 decoration- decoration-2 decoration-primary pb-4'><span className='text-secondary font-bold'>{translationsRooms.title}</span> - {hotel.capital || 'Not Available'} ({hotel.country || 'Not Available'})</h1>
        {/* <p className='text-red-500 py-4'>Recherche : {rooms} {Number(rooms)>1 ? 'chambres' :'chambre'}, {adults} {Number(adults)>1 ? 'adultes' :'adulte'}, {children} {Number(children)>1 ? 'enfants' :'enfant'}, du {start} au {end} = {(Number(end)-Number(start)/3600)}h</p> */}
        <p className='text-red-500 py-4'>Recherche : {finalValues.rooms} chambre{finalValues.rooms>1 ? 's' :''}, {finalValues.adults} adulte{finalValues.adults>1 ? 's' :''}, {finalValues.children} enfant{finalValues.children>1 ? 's' :''}, du {finalValues.startDate} au {finalValues.endDate} = {bookingNights} nuit{bookingNights>1 ? 's' : ''}</p>
        {/* <FilteringRooms hotel={hotel}/> */}
        {hotel.Rooms && hotel.Rooms.length > 0 ? (
        <div className='flex flex-col gap-20'>
            {displayedRooms.length > 0 ? (
                  // {hotel.Rooms.map((room: Room, index: number) => (
                    displayedRooms.map((room: Room) => (
                      // <div className='w-full flex flex-col md:flex-row hover:outline outline-secondary outline-offset-4 rounded-lg'>
                      <div className='w-full flex flex-col lg:flex-row hover:outline outline-transparent hover:outline-secondary outline-offset-8 transition-all duration-300 ease-in-out'>
                        {room.pictures && room.pictures.length > 0 && <div className="w-full lg:w-1/2 rounded-lg"><Caroussel pictures={room.pictures} /></div>}
                        <div key={room.id} className='w-full lg:w-1/2 flex flex-col md:justify-between p-2 gap-4'>
                          <div>
                            <h3 className="text-secondary flex gap-2">
                              {/* {room.type.name} - {room.capacity} <PersonIcon /> */}
                              {room.type} - {room.capacity} <PersonIcon />
                            </h3>
                            <h4 className='text-secondary underline underline-offset-2'>{hotel.country}</h4>
                          </div>
                          {/* <p>
                            {t("options")}:{' '}
                            {room.options && room.options.length > 0
                              ? room.options.map((option: Option) => option.name).join(', ')
                              : 'Aucune'}
                          </p> */}
                          <div className="columns-2 gap-4 space-y-2 p-4 rounded-lg bg-transparent">
                            {room.options && room.options.length > 0 ? (
                              <>
                                {room.options.slice(0, 5).map((option: Option) => (
                                  <p 
                                    key={option.id} 
                                    className="break-inside-avoid p-2 bg-gray-50 dark:bg-slate-800 rounded shadow-sm mb-2 hover:bg-white dark:hover:bg-black transition-colors"
                                  >
                                    {option.name}
                                  </p>
                                ))}
                                {room.options.length > 5 && (
                                  <div 
                                    className="break-inside-avoid p-2 bg-gray-50 dark:bg-slate-800 rounded shadow-sm mb-2 hover:bg-white transition-colors"
                                  >
                                    <p className="font-semibold text-gray-500 text-center">
                                      +{room.options.length - 5} {translationsRooms.other}{room.options.length - 5 > 1 ? "s" : ""}...
                                    </p>
                                  </div>
                                )}
                              </>
                            ) : (
                              <p className="text-gray-500 italic">Aucune option disponible</p>
                            )}
                          </div>
                          <div className='flex flex-col-reverse md:flex-row md:justify-start gap-4'>
                            <div className='w-full md:w-1/5 text-center'>
                              {/* <Link href={`/hotels/${hotel.id}/rooms/${room.id}`}> */}
                              <Link href={buildRoomUrl(room.id)}>
                              {/* <Link href={`/${params.locale}/hotels/${params.hotelId}?rooms=${room}&adults=${adultsNum}&children=${childrenNum}&start=${startDate?.toLocaleDateString().split('T')[0]}&end=${endDate?.toLocaleDateString().split('T')[0]}/rooms/${room.id}`}> */}
                                <Button color="secondary">{translationsRooms.details}</Button>
                              </Link>
                            </div>
                            <div className='w-full flex justify-between'>
                              <p className='underline underline-offset-4 content-center'><b>{room.cost} €</b>/{translationsRooms.night}</p>
                              {bookingNights && bookingNights ? (
                                <>
                                  <p className='content-center'> {bookingNights} {translationsRooms.night}s</p>
                                  <p className='content-center'>Total: {bookingNights*room.cost} €</p>
                                </>
                              ) : (
                                <p className='text-red-500 content-center'>{translationsRooms.missing_date}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                  )) 
                ): (
                    <p className="text-center text-gray-500">
                      Aucune chambre ne correspond aux critères sélectionnés
                    </p>
                  )
                }
                </div>
            ) : (
              <p>{translationsRooms.no_room_available}</p>
            )}
            <Link href="/">
              <Button
                className="bg-tertiary text-white hover:bg-gray-500 mt-10"
                startContent={<ArrowBackIcon fillColor="white" />}
              >
                {translationsRooms.homepage}
              </Button>
            </Link>
          </div>
    </>
  );
}
