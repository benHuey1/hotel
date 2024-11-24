// /app/api/verify-email/route.ts
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { token } = await req.json();

    // Rechercher le token
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token }
    });

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

    // Mettre à jour l'utilisateur
    await prisma.user.update({
      where: { id: verificationToken.id },
      data: {
        emailVerified: new Date()
      }
    });

    // Supprimer le token utilisé
    await prisma.verificationToken.delete({
      where: { id: verificationToken.id }
    });

    return NextResponse.json(
      { message: 'Email vérifié avec succès' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Verification error:', error);
    return NextResponse.json(
      { message: 'Une erreur est survenue' },
      { status: 500 }
    );
  }
}