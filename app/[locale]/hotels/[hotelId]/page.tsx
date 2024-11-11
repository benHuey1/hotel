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
// import { useEffect, useState } from 'react';
import FilteringRooms from '@/components/filtering-rooms';
import HotelOptionsList from '@/components/filtering-rooms';
import HotelRoomsSection from '@/components/filtering-rooms';

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
  // const [filteredRooms, setFilteredRooms] = useState<Room[]>(hotel.Rooms);
  // const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  
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
  const finalValues = {
    rooms: roomsNum,
    adults: adultsNum,
    children: childrenNum,
    startDate: start,
    endDate: end
  }
    // // Fonction pour construire l'URL avec les paramètres de recherche
    // const buildRoomUrl = (roomId: string) => {
    //   const urlParams = new URLSearchParams({
    //     rooms: rooms as string || '',
    //     adults: adults as string || '',
    //     children: children as string || '',
    //     start: start as string || '',
    //     end: end as string || '',
    //   });
    //   return `/${params.locale}/hotels/${params.hotelId}/rooms/${roomId}?${urlParams.toString()}`;
    // };

      // Pré-traduire tous les textes nécessaires
  const translationsExpandable = {
    room: tSearch('room'),
    room_popup: tSearch('room_popup'),
    person_adult: tSearch('person_adult'),
    person_child: tSearch('person_child'),
    person_popup: tSearch('person_popup'),
    which_hotel: tSearch('which_hotel'),
    text: t('modify_research'),
    text_close: tGen('close'),
  };
          const translationsRooms={
            night: t('night'),
            details: t('details'),
            missing_date: t('missing_date'),
            no_room_available: t('no_room_available'),
            title: t('title'),
            other: tGen("other"),
            homepage: tGen("homepage")
          };
  
  // const handleSelect = (value: Option) => {
  //   // To access the select value when click is pressed
  //   console.log(value, "SelectValue - PAGE");
  //   setSelectedOptions(value);
  // }

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

          <HotelRoomsSection 
            hotel={hotel}
            bookingNights={bookingNights}
            locale={params.locale}
            countries={countries}
            initialValues={initialValues}
            finalValues={finalValues}
            translationsExpandable={translationsExpandable}
            translationsRooms={translationsRooms}
            Rooms={hotel.Rooms}
          />
    </div>
  );
}
