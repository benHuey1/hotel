// /app/api/verify-email/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { token, roomId } = await req.json();

    console.log('Verification attempt for token:', token); // Debug log

    // Rechercher le token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
      include: {
        user: true // Inclure les données de l'utilisateur associé
      }
    });

    console.log('Found token:', verificationToken); // Pour le debug

    if (!verificationToken) {
      return NextResponse.json(
        { message: 'Token invalide' },
        { status: 400 }
      );
    }

    // Vérifier si le token n'est pas expiré
    if (verificationToken.expires < new Date()) {
      await prisma.verificationToken.delete({
        where: { id: verificationToken.id }
      });
      return NextResponse.json(
        { message: 'Token expiré' },
        { status: 400 }
      );
    }

    // Vérifier si un utilisateur est associé au token
    if (!verificationToken.userId) {
        return NextResponse.json(
          { message: 'Aucun utilisateur associé à ce token' },
          { status: 400 }
        );
      }

    // // Trouver l'utilisateur associé
    // const user = await prisma.user.findFirst({
    //     where: {
    //       emailVerified: null // Chercher un utilisateur non vérifié
    //     },
    //     orderBy: {
    //       createdAt: 'desc' // Prendre le plus récent
    //     }
    //   });
  
    //   if (!user) {
    //     return NextResponse.json(
    //       { message: 'Utilisateur non trouvé' },
    //       { status: 404 }
    //     );
    //   }

    // // Mettre à jour l'utilisateur
    // await prisma.user.update({
    //   where: { id: verificationToken.id },
    //   data: {
    //     emailVerified: new Date()
    //   }
    // });

        // // Mettre à jour l'utilisateur
        // const updatedUser = await prisma.user.update({
        //     where: { id: user.id },
        //     data: {
        //       emailVerified: new Date()
        //     }
        //   });
        
    // Mettre à jour l'utilisateur en utilisant l'userId du token
    const updatedUser = await prisma.user.update({
        where: { 
          id: verificationToken.userId 
        },
        data: {
          emailVerified: new Date()
        }
      });

      console.log('Updated user:', updatedUser); // Debug log

    // Supprimer le token utilisé
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    });

    return NextResponse.json({
      message: 'Email vérifié avec succès',
      email: updatedUser.email,
      roomId: verificationToken.roomId
    }, { status: 200 });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}