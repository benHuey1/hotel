// import { NextApiRequest, NextApiResponse } from 'next';
// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method === 'GET') {
//     try {
//       const hotels = await prisma.hotels.findMany({
//         include: {
//           Rooms: true,
//         },
//       });
//       res.status(200).json(hotels);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to load hotels' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const hotels = await prisma.hotels.findMany({
      include: {
        Rooms: true,
      },
    });
    return NextResponse.json(hotels);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load hotels' }, { status: 500 });
  }
}
