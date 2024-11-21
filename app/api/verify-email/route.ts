// import { prisma } from "@/lib/prisma";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//     const { searchParams } = new URL(req.url);
//     const token = searchParams.get('token');
//     const roomId = searchParams.get('roomId');
//     const hotelId = searchParams.get('hotelId');
  
//     const verificationToken = await prisma.verificationToken.findUnique({
//       where: { token },
//     });
  
//     if (!verificationToken || verificationToken.expires < new Date()) {
//       return NextResponse.redirect('/token-expired');
//     }
  
//     await prisma.user.update({
//       where: { email },
//       data: { emailVerified: new Date() },
//     });
  
//     await prisma.verificationToken.delete({
//       where: { token },
//     });
  
//     return NextResponse.redirect(`/hotels/${hotelId}/rooms/${roomId}/booking`);
//   }