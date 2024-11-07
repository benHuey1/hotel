export const dynamic = 'force-dynamic'
// 'auto' | 'force-dynamic' | 'error' | 'force-static'

import { ArrowBackIcon, PersonIcon } from '@/components/icons';
import { Hotel, Option, Room } from '@/types';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
// import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
// import prisma from '@/lib/prisma';
// import Caroussel from '@/components/caroussel';
import dynamics from 'next/dynamic';
import { differenceInDays, parse, parseISO } from 'date-fns';
import SearchBooking from '@/components/search-booking';
import { prisma } from '@/lib/prisma';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import ExpandableSearchSection from '@/components/expansable-search-booking';

const Caroussel = dynamics(() => import('@/components/caroussel'), { ssr: false });


//  -----------------------------------------------------
// const prisma = new PrismaClient();

// // Next.js needs to know all possible values for dynamic parameters at build time. To fix this, you need to implement the generateStaticParams function for your dynamic routes.
// async function getAllHotelIds() {
//   // Replace this with your actual data fetching logic
//   const hotels = await prisma.hotels.findMany({
//     select: { id: true },
//   });
//   return hotels.map((hotel) => hotel.id);
// }
// export async function generateStaticParams() {
//   const hotelIds = await getAllHotelIds();

//   return hotelIds.map((id) => ({
//     hotelId: id,
//   }));
// }
//  -----------------------------------------------------
async function getHotel(hotelId: string, searchParams: { [key: string]: string | string[] | undefined }) {
  try {
    const queryString = new URLSearchParams(searchParams as Record<string, string>).toString();
    // const res = await fetch(`http://localhost:3000/api/hotels/${hotelId}?${queryString}`, { cache: 'no-store' });
    const res = await fetch(`https://hotel-karibu.vercel.app/api/hotels/${hotelId}?${queryString}`, { cache: 'no-store' });
    if (!res.ok) {
      throw new Error(`Failed to fetch hotel: ${res.status}`);
    }
    // const data = await res.json();
    // console.log('Fetched hotel data:', JSON.stringify(data, null, 2));
    // return data;
    return res.json();
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return null;
  }
}
// async function getHotel(hotelId: string) {
//   try {
//     const hotel = await prisma.hotels.findUnique({
//       where: { id: hotelId },
//       include: { Rooms: true },
//     });

//     if (!hotel) {
//       return null;
//     }

//     return hotel;
//   } catch (error) {
//     console.error('Error fetching hotel:', error);
//     return null;
//   }
// }const prisma = new PrismaClient();

async function getHotels(): Promise<Hotel[]> {
  try {
    const hotels = await prisma.hotels.findMany({
      include: {
        Rooms: {
          include: {
            options: true,
          },
        },
      },
    });
    return hotels;
  } catch (error) {
    console.error('Error fetching hotels:', error);
    return [];
  }
}

export default async function HotelPage({ params, searchParams }: { params: { hotelId: string, locale: string }, searchParams: { [key: string]: string | string[] | undefined } }) {
  const hotel = await getHotel(params.hotelId, searchParams);
  const countries: Hotel[] = await getHotels();
  
  unstable_setRequestLocale(params.locale);
  const t = await getTranslations('HotelPage');
  const tGen = await getTranslations('General');
  const tSearch = await getTranslations('SearchBooking');

  if (!hotel) {
    // console.log(hotel);
    // notFound();
    return <div>Hotel not found or error loading hotel data.</div>;
  }
  // if (hotel) {
  //   console.log(hotel);
  // }

  const { rooms, adults, children, start, end } = searchParams;

  // Convert string parameters to numbers
  const roomsNum = Number(rooms);
  const adultsNum = Number(adults);
  const childrenNum = Number(children);

  // Calculate the number of booking days
  let bookingNights = 0;
  let startDate: Date | undefined;
  let endDate: Date | undefined;
  if (start && end && typeof start === 'string' && typeof end === 'string') {
    const startDate = parse(start, 'dd/MM/yyyy', new Date());
    const endDate = parse(end, 'dd/MM/yyyy', new Date());
    bookingNights = differenceInDays(endDate, startDate);
  }
  const initialValues = {
    rooms: rooms ? Number(rooms) : undefined,
    adults: adults ? Number(adults) : undefined,
    children: children ? Number(children) : undefined,
    startDate,
    endDate,
    selectedCountryId: params.hotelId
  };
    // Fonction pour construire l'URL avec les paramètres de recherche
    const buildRoomUrl = (roomId: string) => {
      const urlParams = new URLSearchParams({
        rooms: rooms as string || '',
        adults: adults as string || '',
        children: children as string || '',
        start: start as string || '',
        end: end as string || '',
      });
      return `/${params.locale}/hotels/${params.hotelId}/rooms/${roomId}?${urlParams.toString()}`;
    };

      // Pré-traduire tous les textes nécessaires
  const translations = {
    room: tSearch('room'),
    room_popup: tSearch('room_popup'),
    person_adult: tSearch('person_adult'),
    person_child: tSearch('person_child'),
    person_popup: tSearch('person_popup'),
    which_hotel: tSearch('which_hotel')
  };

  return (
    <div className='w-full h-full flex flex-col lg:flex-row'>
      {/* <div className='w-full lg:w-1/4 h-full overflow-hidden lg:h-screen flex flex-col justify-start bg-secondary rounded-b-xl content-center lg:content-start py-5 px-5'>
        <Button className="block lg:hidden bg-transparent text-white hover:bg-gray-500">
            {t("modify_research")}
        </Button>
        <p className='hidden lg:block text-white text-center pb-4'>{t("modify_research")}</p>
        <div className='w-full flex justify-center'>
          <SearchBooking countries={countries} layout='vertical' roomWidth='60%' familyWidth='70%' countryWidth='80%' dateWidth='90%' initialValues={initialValues} roomText={tSearch('room')} roomPopup={tSearch('room_popup')} personAdult={tSearch('person_adult')} personChild={tSearch('person_child')} personPopup={tSearch('person_popup')} whichHotel={tSearch('which_hotel')}/>
        </div>
      </div> */}
      <ExpandableSearchSection 
        countries={countries}
        initialValues={initialValues}
        text={t('modify_research')}
        textClose={tGen('close')}
        translations={translations}
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
        <h1 className='underline underline-offset-4 decoration- decoration-2 decoration-primary pb-4'><span className='text-secondary font-bold'>{t('title')}</span> - {hotel.capital || 'Not Available'} ({hotel.country || 'Not Available'})</h1>
        {/* <p className='text-red-500 py-4'>Recherche : {rooms} {Number(rooms)>1 ? 'chambres' :'chambre'}, {adults} {Number(adults)>1 ? 'adultes' :'adulte'}, {children} {Number(children)>1 ? 'enfants' :'enfant'}, du {start} au {end} = {(Number(end)-Number(start)/3600)}h</p> */}
        <p className='text-red-500 py-4'>Recherche : {roomsNum} chambre{roomsNum>1 ? 's' :''}, {adultsNum} adulte{adultsNum>1 ? 's' :''}, {childrenNum} enfant{childrenNum>1 ? 's' :''}, du {start} au {end} = {bookingNights} nuit{bookingNights>1 ? 's' : ''}</p>
        {hotel.Rooms && hotel.Rooms.length > 0 ? (
          <>
            <div className='flex flex-col gap-20'>
              {hotel.Rooms.map((room: Room, index: number) => (
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
                                  +{room.options.length - 5} {tGen("other")}{room.options.length - 5 > 1 ? "s" : ""}...
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
                            <Button color="secondary">{t("details")}</Button>
                          </Link>
                        </div>
                        <div className='w-full flex justify-between'>
                          <p className='underline underline-offset-4 content-center'><b>{room.cost} €</b>/{t("night")}</p>
                          {bookingNights && bookingNights ? (
                            <>
                              <p className='content-center'> {bookingNights} {t("night")}s</p>
                              <p className='content-center'>Total: {bookingNights*room.cost} €</p>
                            </>
                          ) : (
                            <p className='text-red-500 content-center'>{t("missing_date")}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </>
        ) : (
          <p>{t("no_room_available")}</p>
        )}
        <Link href="/">
          <Button
            className="bg-tertiary text-white hover:bg-gray-500 mt-10"
            startContent={<ArrowBackIcon fillColor="white" />}
          >
            {tGen("homepage")}
          </Button>
        </Link>
      </div>
    </div>
  );
}
