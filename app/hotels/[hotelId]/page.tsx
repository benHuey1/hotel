import { ArrowBackIcon, PersonIcon } from '@/components/icons';
import { Option, Room } from '@/types';
import { Button } from '@nextui-org/button';
import { Link } from '@nextui-org/link';
import { PrismaClient } from '@prisma/client';
import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
// import Caroussel from '@/components/caroussel';
import dynamic from 'next/dynamic';

const Caroussel = dynamic(() => import('@/components/caroussel'), { ssr: false });


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
    <div className='p-5'>
      <h1 className='underline underline-offset-4 decoration- decoration-2 decoration-primary pb-4'><span className='text-secondary font-bold'>L'Hôtel Karibu</span> - {hotel.capital || 'Not Available'} ({hotel.country || 'Not Available'})</h1>
      {hotel.Rooms && hotel.Rooms.length > 0 ? (
        <>
          <div className='flex flex-col gap-8'>
            {hotel.Rooms.map((room: Room, index: number) => (
                // <div className='w-full flex flex-col md:flex-row hover:outline outline-secondary outline-offset-4 rounded-lg'>
                <div className='w-full flex flex-col md:flex-row hover:outline outline-transparent hover:outline-secondary outline-offset-4 transition-all duration-300 ease-in-out'>
                  {room.pictures && room.pictures.length > 0 && <div className="w-full md:w-1/2 rounded-lg"><Caroussel pictures={room.pictures} /></div>}
                  <div key={room.id} className='w-full md:w-1/2 flex flex-col md:justify-between p-2 gap-4'>
                    <div>
                      <h3 className="text-secondary flex gap-2">
                        {room.type} - {room.capacity} <PersonIcon />
                      </h3>
                      <h4 className='text-secondary'>{hotel.country}</h4>
                    </div>
                    <p>
                      Options:{' '}
                      {room.options && room.options.length > 0
                        ? room.options.map((option: Option) => option.name).join(', ')
                        : 'Aucune'}
                    </p>
                    <div className='flex flex-col-reverse md:flex-row md:justify-start gap-4'>
                      <div className='w-full md:w-1/5 text-center'>
                        <Link href={`/hotels/${hotel.id}/rooms/${room.id}`}>
                          <Button color="secondary">Détails</Button>
                        </Link>
                      </div>
                      <div className='w-full flex justify-between'>
                        <p className='content-center'>{room.cost} €/nuit</p>
                        <p className='content-center'> nombre nuits</p>
                        <p className='underline underline-offset-4 content-center'>Total: somme €</p>
                      </div>
                    </div>
                  </div>
                </div>
            ))}
          </div>
        </>
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
