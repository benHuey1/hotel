import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Option } from '@/types';
import { Button } from '@nextui-org/button';
import AnimatedButtonArrow from '@/components/animate-arrow';
import { ArrowBackIcon } from '@/components/icons';
import { PrismaClient } from '@prisma/client';

//  -----------------------------------------------------
// const prisma = new PrismaClient();

// // Next.js needs to know all possible values for dynamic parameters at build time. To fix this, you need to implement the generateStaticParams function for your dynamic routes.
// async function getAllRoomsIds() {
//   // Replace this with your actual data fetching logic
//   const rooms = await prisma.rooms.findMany({
//     select: { id: true },
//   });
//   return rooms.map((room) => room.id);
// }
// export async function generateStaticParams() {
//   const hotelIds = await getAllRoomsIds();

//   return hotelIds.map((id) => ({
//     hotelId: id,
//   }));
// }
//  -----------------------------------------------------
async function getRoom(hotelId: string, roomId: string) {
  try {
    const res = await fetch(`http://localhost:3000/api/hotels/${hotelId}/rooms/${roomId}`, {
      cache: 'no-store',
    });
    if (!res.ok) {
      if (res.status === 404) {
        return null;
      }
      throw new Error(`Failed to fetch room: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error('Error fetching room:', error);
    throw error;
  }
}

export default async function RoomPage({
  params,
}: {
  params: { hotelId: string; roomId: string };
}) {
  try {
    const room = await getRoom(params.hotelId, params.roomId);

    if (!room) {
      notFound();
    }

    return (
      <div>
        <h1>Détails de la chambre</h1>
        <p>Type: {room.type}</p>
        <p>Capacité: {room.capacity}</p>
        <p>Prix: {room.cost}</p>
        <h2>Options:</h2>
        {room.options && room.options.length > 0 ? (
          <ul>
            {room.options.map((option: Option) => (
              <li key={option.id}>{option.name}</li>
            ))}
          </ul>
        ) : (
          <p>Pas d'options disponibles</p>
        )}
        <Link href={`/hotels/${params.hotelId}`}>
          <Button
            className="mt-4 rounded bg-tertiary px-4 py-2 font-bold text-white hover:bg-gray-500"
            startContent={<ArrowBackIcon fillColor="white" />}
          >
            Chambres
          </Button>
        </Link>
        {/* <AnimatedButtonArrow  href={`/hotels/${params.hotelId}`} textColor={"bg-tertiary"} bgColor={"text-white"}>
            Chambres
        </AnimatedButtonArrow> */}
      </div>
    );
  } catch (error) {
    console.error('Error in RoomPage:', error);
    return <div>An error occurred while fetching the room data.</div>;
  }
}
