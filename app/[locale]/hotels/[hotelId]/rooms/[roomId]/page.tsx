// 'use client';
// export const dynamic = 'force-dynamic'
// // 'auto' | 'force-dynamic' | 'error' | 'force-static'

// import { notFound, usePathname, useSearchParams } from 'next/navigation';
// import Link from 'next/link';
// import { Option } from '@/types';
// import { Button } from '@nextui-org/button';
// import AnimatedButtonArrow from '@/components/animate-arrow';
// import { ArrowBackIcon } from '@/components/icons';
// import { PrismaClient } from '@prisma/client';
// import { useLocale } from 'next-intl';
// import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';

// //  -----------------------------------------------------
// // const prisma = new PrismaClient();

// // // Next.js needs to know all possible values for dynamic parameters at build time. To fix this, you need to implement the generateStaticParams function for your dynamic routes.
// // async function getAllRoomsIds() {
// //   // Replace this with your actual data fetching logic
// //   const rooms = await prisma.rooms.findMany({
// //     select: { id: true },
// //   });
// //   return rooms.map((room) => room.id);
// // }
// // export async function generateStaticParams() {
// //   const hotelIds = await getAllRoomsIds();

// //   return hotelIds.map((id) => ({
// //     hotelId: id,
// //   }));
// // }
// //  -----------------------------------------------------
// async function getRoom(hotelId: string, roomId: string) {
//   try {
//     // const res = await fetch(`http://localhost:3000/api/hotels/${hotelId}/rooms/${roomId}`, {
//       const res = await fetch(`https://hotel-karibu.vercel.app/api/hotels/${hotelId}/rooms/${roomId}`, {
//         cache: 'no-store',
//       });
//     if (!res.ok) {
//       if (res.status === 404) {
//         return null;
//       }
//       throw new Error(`Failed to fetch room: ${res.status}`);
//     }
//     return res.json();
//   } catch (error) {
//     console.error('Error fetching room:', error);
//     throw error;
//   }
// }

// export default async function RoomPage({
//   params,
// }: {
//   params: { hotelId: string; roomId: string };
// }) {
//   // const locale = useLocale();
//   // const searchParams = useSearchParams();
  
//   // // Extract search parameters
//   const searchParams = useSearchParams();
//   const pathname = usePathname();
//   const locale = useLocale();

//   const rooms = searchParams.get('rooms');
//   const adults = searchParams.get('adults');
//   const children = searchParams.get('children');
//   const start = searchParams.get('start');
//   const end = searchParams.get('end');

//   const backUrl = `/${locale}/hotels/${params.hotelId}?rooms=${rooms || ''}&adults=${adults || ''}&children=${children || ''}&start=${start || ''}&end=${end || ''}`;

//   // unstable_setRequestLocale(locale);
//   // const t = await getTranslations('HotelPage');
  
//   const fetchRoom = async () => {
//   try {
//     const room = await getRoom(params.hotelId, params.roomId);

//     if (!room) {
//       // notFound();
//       return <div>Room not found or error loading room data.</div>;
//     }
//         // Construct the back URL with all search parameters
//         // const backUrl = `/hotels/${params.hotelId}?` + 
//         // `rooms=${rooms || ''}&` +
//         // `adults=${adults || ''}&` +
//         // `children=${children || ''}&` +
//         // `start=${start || ''}&` +
//         // `end=${end || ''}`;
  

//     return (  
//       <div className='w-full h-full lg:w-3/4 p-5'>
//         <h1 className='underline underline-offset-4 decoration- decoration-2 decoration-primary pb-4'><span className='text-secondary font-bold'>{t('title')}</span> - {hotel.capital || 'Not Available'} ({hotel.country || 'Not Available'})</h1>
      
//         <h1>Détails de la chambre</h1>
//         <p>Type: {room.type}</p>
//         <p>Capacité: {room.capacity}</p>
//         <p>Prix: {room.cost}</p>
//         <h2>Options:</h2>
//         {room.options && room.options.length > 0 ? (
//           <ul>
//             {room.options.map((option: Option) => (
//               <li key={option.id}>{option.name}</li>
//             ))}
//           </ul>
//         ) : (
//           <p>Pas d'options disponibles</p>
//         )}
//         {/* <Link href={`/hotels/${params.hotelId}`}> */}
//         <Link href={backUrl}>
//           <Button
//             className="mt-4 rounded bg-tertiary px-4 py-2 font-bold text-white hover:bg-gray-500"
//             startContent={<ArrowBackIcon fillColor="white" />}
//           >
//             Chambres
//           </Button>
//         </Link>
//         {/* <AnimatedButtonArrow  href={`/hotels/${params.hotelId}`} textColor={"bg-tertiary"} bgColor={"text-white"}>
//             Chambres
//         </AnimatedButtonArrow> */}
//       </div>
//     );
//   } catch (error) {
//     console.error('Error in RoomPage:', error);
//     return <div>An error occurred while fetching the room data.</div>;
//   }
//   }
//   return fetchRoom();
// }
import { Suspense } from 'react';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import RoomSection from '@/components/room-section';
import { useTranslations } from 'next-intl';
import { getHotel } from '../../page';

async function getRoom(hotelId: string, roomId: string) {
  try {
    const res = await fetch(
      `https://hotel-karibu.vercel.app/api/hotels/${hotelId}/rooms/${roomId}`,
      {
        next: { revalidate: 0 },
        cache: 'no-store',
      }
    );
    
    if (!res.ok) {
      throw new Error(`Failed to fetch room: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching room:', error);
    return null;
  }
}

export default async function RoomPage({
  params,
  searchParams,
}: {
  params: { hotelId: string; roomId: string; locale: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  unstable_setRequestLocale(params.locale);
  const hotel = await getHotel(params.hotelId, searchParams);
  const room = await getRoom(params.hotelId, params.roomId);
  const tGen = await getTranslations('General');

  if (!hotel) {
    return <div>Hotel not found</div>;
  }

  const { rooms, adults, children, start, end } = searchParams;
  const backUrl = `/${params.locale}/hotels/${params.hotelId}?${new URLSearchParams({
    rooms: rooms?.toString() || '',
    adults: adults?.toString() || '',
    children: children?.toString() || '',
    start: start?.toString() || '',
    end: end?.toString() || ''
  })}`;
  const translationsRoom = {
    back: tGen('backToRooms'),
    booking: tGen('booking'),
    its_time: tGen('itsTime')
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RoomSection hotel={hotel} room={room} backUrl={backUrl} translationsRoom={translationsRoom}/>;
    </Suspense>
  )
}

// export default async function RoomPage({
//   params,
//   searchParams,
// }: {
//   params: { hotelId: string; roomId: string; locale: string };
//   searchParams: { [key: string]: string | string[] | undefined };
// }) {
//   return (
//       <RoomPageContent params={params} searchParams={searchParams} />
//   );
// }