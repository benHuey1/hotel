import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

export async function GET(
  request: Request,
  { params }: { params: { hotelId: string; roomId: string } },
) {
  const { hotelId, roomId } = params;
  try {
    const room = await prisma.rooms.findUnique({
      where: {
        id: roomId,
        hotelId: hotelId,
      },
      include: { options: true },
    });

    if (!room) {
      return NextResponse.json({ error: 'Room not found' }, { status: 404 });
    }

    return NextResponse.json(room);
  } catch (error) {
    console.error('Error fetching room:', error);
    return NextResponse.json({ error: 'Failed to fetch room' }, { status: 500 });
  }
}
