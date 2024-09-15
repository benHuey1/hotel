import { ArrowBackIcon } from '@/components/icons';
import { Option, Room } from '@/types';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';

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
async function getHotel(hotelId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/hotels/${hotelId}`, { cache: 'no-store' });
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
// }

export default async function HotelPage({ params }: { params: { hotelId: string } }) {
  const hotel = await getHotel(params.hotelId);

  if (!hotel) {
    console.log(hotel);
    notFound();
  }
  if (hotel) {
    console.log(hotel);
  }

  return (
    <div>
      {/* HEYY */}
      <p>Pays: {hotel.country || 'Not Available'}</p>
      <p>Capitale: {hotel.capital || 'Not Available'}</p>
      <h2>Chambres:</h2>
      {hotel.Rooms && hotel.Rooms.length > 0 ? (
        hotel.Rooms.map((room: Room, index: number) => (
          <>
            <div key={room.id}>
              <h3>
                <span className="text-primary">Chambre n°{index + 1}</span> - {room.type}
              </h3>
              <p>Capacité: {room.capacity}</p>
              <p>Prix: {room.cost}</p>
              <p>
                Options:{' '}
                {room.options && room.options.length > 0
                  ? room.options.map((option: Option) => option.name).join(', ')
                  : 'Aucune'}
              </p>
              <Link href={`/hotels/${hotel.id}/rooms/${room.id}`}>
                <Button color="secondary">Détails</Button>
              </Link>
            </div>
          </>
        ))
      ) : (
        <p>Pas de chambres disponibles</p>
      )}
      <Link href="/">
        <Button
          className="bg-tertiary text-white hover:bg-gray-500"
          startContent={<ArrowBackIcon fillColor="white" />}
        >
          Accueil
        </Button>
      </Link>
    </div>
  );
}
