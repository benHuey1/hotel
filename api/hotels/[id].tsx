import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/prisma';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    res.status(400).json({ error: 'Invalid ID' });
    return;
  }

  try {
    const hotel = await prisma.hotels.findUnique({
      where: { id },
      // include: { Rooms: true },
    });

    if (!hotel) {
      res.status(404).json({ error: 'Hotel not found' });
      return;
    }

    res.status(200).json(hotel);
  } catch (error) {
    console.error('Error fetching hotel:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  // return (
  //     <>
  //       <div>HEYY</div>
  //     </>
  //   );
}

// export async function GET(req, { params }) {
//   try {
//     const character = characters.data.find(item => item.slug === params.slug)

//     if (!character) {
//       return new NextResponse('not found', { status: 404 })
//     }

//     const character_qoutes = qoutes.data.filter(
//       item => item.character_id === character.id,
//     )

//     return NextResponse.json({
//       character,
//       character_qoutes: character_qoutes.length > 0 ? character_qoutes : null,
//     })
//   } catch (error) {
//     return new NextResponse('Internal Server Error', { status: 500 })
//   }
// }
