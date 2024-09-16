import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const countries = await prisma.hotels.findMany({
        orderBy: {
          localisation: 'asc',
        },
        select: {
          country: true,
        },
    });
    return NextResponse.json(countries);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load hotels' }, { status: 500 });
  }
}
