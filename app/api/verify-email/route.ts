// /app/api/verify-email/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { token: tokenString, roomId } = await req.json();

    console.log('Received token:', tokenString); // Pour le debug
    console.log('Received roomId:', roomId); // Pour le debug

    // // Rechercher le token
    // const verificationToken = await prisma.verificationToken.findUnique({
    //   where: { token }
    // });

    // Rechercher le token et le supprimer en une seule opération atomique
    const verificationToken = await prisma.$transaction(async (prisma) => {
        const foundToken  = await prisma.verificationToken.findUnique({
          where: { token: tokenString }
        });
  
        if (foundToken) {
          await prisma.verificationToken.delete({
            where: { id: foundToken.id }
          });
        }
  
        return foundToken;
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

    // Vérifier que l'userId existe dans le token
    if (!verificationToken.userId) {
        return NextResponse.json(
          { message: 'Token invalide : aucun utilisateur associé' },
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

    // Trouver l'utilisateur avec l'userId stocké dans le token
    const user = await prisma.user.findUnique({
        where: {
          id: verificationToken.userId // Utiliser l'userId du token
        }
      });
  
      if (!user) {
        return NextResponse.json(
          { message: 'Utilisateur non trouvé' },
          { status: 404 }
        );
      }

    // // Mettre à jour l'utilisateur
    // await prisma.user.update({
    //   where: { id: verificationToken.id },
    //   data: {
    //     emailVerified: new Date()
    //   }
    // });

        // Mettre à jour l'utilisateur
        const updatedUser = await prisma.user.update({
            where: { id: user.id },
            data: {
              emailVerified: new Date()
            }
          });

    // Supprimer le token utilisé
    // await prisma.verificationToken.delete({
    //   where: { id: verificationToken.id }
    // });

    return NextResponse.json({
        success: true, // Important d'ajouter ce champ
      message: 'Email vérifié avec succès',
      email: updatedUser.email,
      roomId: verificationToken.roomId
    }, { status: 200 });
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { 
        success: false, // Important d'ajouter ce champ
        message: 'Une erreur est survenue', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}