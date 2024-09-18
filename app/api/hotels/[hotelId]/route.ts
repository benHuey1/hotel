// import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export async function GET(request: Request, { params }: { params: { hotelId: string } }) {
//   const hotelId = params.hotelId;
//   try {
//     const hotel = await prisma.hotels.findUnique({
//       where: { id: hotelId },
//       include: {
//         Rooms: {
//           include: {
//             options: true,
//           },
//         },
//       },
//     });

//     if (!hotel) {
//       return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
//     }

//     return NextResponse.json(hotel);
//   } catch (error) {
//     console.error('Error fetching hotel:', error);
//     return NextResponse.json({ error: 'Failed to fetch hotel' }, { status: 500 });
//   }
// }
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// import prisma from '@/lib/prisma';

export async function GET(request: Request, { params }: { params: { hotelId: string } }) {
  const hotelId = params.hotelId;
  const { searchParams } = new URL(request.url);
  const rooms = parseInt(searchParams.get('rooms') || '0');
  const adults = parseInt(searchParams.get('adults') || '0');
  const children = parseInt(searchParams.get('children') || '0');
  const start = searchParams.get('start');
  const end = searchParams.get('end');
  try {
    const hotel = await prisma.hotels.findUnique({
      where: { id: hotelId },
      include: {
        Rooms: {
          include: {
            options: true,
          },
        },
      },
    });

    if (!hotel) {
      return NextResponse.json({ error: 'Hotel not found' }, { status: 404 });
    }

    return NextResponse.json(hotel);
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return NextResponse.json({ error: 'Failed to fetch hotel' }, { status: 500 });
  }
}
