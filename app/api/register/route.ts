import { NextResponse } from 'next/server';
import { hash } from 'bcrypt';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';
// import { createTransport } from 'nodemailer';
import nodemailer from "nodemailer";
import crypto from 'crypto';
import { locales } from '@/config/config';

interface EmailBody {
  email: string;
  password: string;
  name: string;
  firstname: string;
  country: string;
  phoneNumber: string;
}

// const transporter = createTransport({
  const transporter = nodemailer.createTransport({
  host: "smtp.hostinger.com",
  pool: true,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  debug: true, // Activer les logs pour le debug
  logger: true, // Activer les logs détaillés
  tls: {
    rejectUnauthorized: false, // À utiliser uniquement en développement
  },
  });
  
// Ajouter une vérification de la connexion
async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('Email configuration verified');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}

const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  firstname: z.string().min(2),
  country: z.string().min(2),
  phoneNumber: z.string().min(6),
});

export async function POST(req: Request) {
  console.log('Starting registration process');
  console.log('Environment variables check:', {
    hasEmailUser: !!process.env.EMAIL_USER,
    hasEmailPass: !!process.env.EMAIL_PASS,
    nextAuthUrl: process.env.NEXTAUTH_URL
  });
  try {
    // Vérifier la configuration email d'abord
    const isEmailConfigValid = await verifyEmailConfig();
    if (!isEmailConfigValid) {
      return NextResponse.json(
        { message: 'Email service configuration error' },
        { status: 500 }
      );
    }

    const body = (await req.json()) as EmailBody;
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { message: 'Invalid input data' },
        { status: 400 }
      );
    }

    const { email, password, name, firstname, country, phoneNumber } = body;

    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists' },
        { status: 400 }
      );
    }

    // Hasher le mot de passe
    const hashedPassword = await hash(password, 12);
    const userId = crypto.randomUUID(); // Génère un ID unique

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        id: userId,
        // _id: userId,
        email,
        name,
        firstname,
        country,
        phoneNumber,
        hashedPassword,
        emailVerified: null,
      }
    });
    
    // Créer un token de vérification
    const verificationToken = await prisma.verificationToken.create({
        data: {
          id: crypto.randomUUID(),
          token: crypto.randomUUID(),
          expires: new Date(Date.now() + 24 * 60 * 60 * 1000), // Expire dans 24h
        },
      });

    // Construire l'URL de vérification avec les paramètres de la chambre
    // const verificationUrl = `${process.env.NEXTAUTH_URL}/verify-email/${verificationToken.token}?roomId=${roomId}&hotelId=${hotelId}`;
    const verificationUrl = `${process.env.NEXTAUTH_URL}/${locales}/verify-email/`;

    console.log('Preparing to send email to:', email);

    // Envoyer l'email
    try {
    await transporter.sendMail({
      from: `"Hotel Karibu" <${process.env.EMAIL_USER}>`,
      to: `${email}`,
      subject: 'Vérifiez votre email pour finaliser votre réservation',
      html: `
        <p>Bonjour Mme/Mr. ${name},</p>
        <p>Voici un récapitulatif de vos données :</p>
        <u>
          <li>Email : ${email}</li>
          <li>Firstname : ${firstname}</li>
          <li>Name : ${name}</li>
          <li>Country : ${country}</li>
          <li>Phone number : ${phoneNumber}</li>
        </u>
        <p>Cliquez sur le lien suivant pour vérifier votre email et continuer votre réservation:</p>
        <a href="${verificationUrl}">Vérifier mon email</a>
      `,
    });
  } catch (emailError) {
    console.error('Email sending error:', emailError);
    return NextResponse.json(
      { 
        message: 'Failed to send verification email',
        error: emailError instanceof Error ? emailError.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
  
console.log('Email sent successfully');

    return NextResponse.json(
      { message: 'User created successfully' },
      { status: 201 }
    );
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json(
      { message: 'Internal server error', error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// function uuidv4(): any {
//     throw new Error('Function not implemented.');
// }

// ----------------------------------------------------------------------------------------------------------------------------------------

// import { EmailRequestBody } from "@/types/products";
// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// export async function POST(request: Request) {
//   const body = (await request.json()) as EmailRequestBody;
//   // const nodemailer = require('nodemailer')
//   const { name, firstname, email, product, format, quantity } = body;
//   const mailOptions = {
//     from: "benjaminmayeur01@gmail.com",
//     to: "benjamin5myr@gmail.com",
//     subject: "Nouvelle commande",
//     html: `
//       <h1>Salut l'Enchanteresse Holistique</h1>
//       <div style="padding-bottom: 2px">
//         <p style="font-size: 20px; ">Tu as une <b>Nouvelle commande</b> pour :</p>
//         <p>Nom: ${firstname} ${name}</p>
//         <p>Email: ${email}</p>
//         <p>Article: ${product.title}</p>
//         <p>Date d'édition: ${product.releaseDate}</p>
//         <p>Format: ${format}</p>
//         <p>Quantité: ${quantity}</p>
//         <p>Price Total: ${format === "ebook" ? (product.price - 5) * quantity : product.price * quantity}€</p>
//       </div>
//       <p><b>Noublie pas de spécifier le moyen de paiement et de demander l'adresse !</b></p>
//      <h2>
//        Continue comme ça 🌞 !
//      </h2>
//     `,
//   };

//   // Create a Nodemailer transporter
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     host: "smtp.gmail.com",
//     // host: process.env.EMAIL_SERVER,
//     port: 465,
//     // port: 587,
//     secure: true,
//     // secure: false,
//     pool: true,
//     auth: {
//       user: process.env.EMAIL_USER,
//       clientId: process.env.EMAIL_CLIENT_ID,
//       clientSecret: process.env.EMAIL_CLIENTSECRET,
//       refreshToken: process.env.EMAIL_REFRESH_TOKEN,
//       // pass: process.env.EMAIL_PASS,
//     },
//     tls: {
//       // Do not fail on invalid certs if set on false. Keep true for production
//       // rejectUnauthorized: true,
//       // rejectUnauthorized: false,
//       servername: "smtp.gmail.com",
//       // minVersion: "TLSv1.2"
//     },
//     // debug: true
//   });

//   try {
//     console.log("Testing SMTP connection...");
//     await transporter.verify();
//     console.log("SMTP connection successful");

//     console.log("Attempting to send email...");
//     const res = await transporter.sendMail(mailOptions);
//     console.log("Email sent successfully:", res);
//     return NextResponse.json(
//       { message: "Email sent successfully", res },
//       { status: 200 },
//     );
//   } catch (error) {
//     console.error("Error sending email:", error);
//     return NextResponse.json(
//       {
//         message: "Error sending email",
//         error: error instanceof Error ? error.message : String(error),
//         stack: error instanceof Error ? error.stack : undefined,
//       },
//       { status: 500 },
//     );
//   }
// }

// ----------------------------------------------------------------------------------------------------------------------------------------

// import { NextResponse } from "next/server";
// import nodemailer from "nodemailer";

// interface EmailBody {
//     email: string;
//     password: string;
//     name: string;
//     firstname: string;
//     country: string;
//     phoneNumber: string;
// }

// const transporter = nodemailer.createTransport({
//   host: "smtp.hostinger.com",
//   pool: true,
//   port: 465,
//   secure: true,
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
//   tls: {
//     rejectUnauthorized: false,
//   },
// });

// export async function POST(req: Request) {
//   try {
//     const body = (await req.json()) as EmailBody;
//     const { email, password, name, firstname, country, phoneNumber } = body;
//     // const { to, subject, text, html } = body;

//     const info = await transporter.sendMail({
//       from: '"Benjamin Mayeur" <contact@benjaminmayeur.be>',
//       to: `${email}`,
//       subject: "Nouvelle commande",
//       html: `
//             <h1>Salut ${firstname} ${name}</h1>
//             <div style="padding-bottom: 2px">
//               <p style="font-size: 20px; ">Voici tes information d'inscription :</p>
//               <p>Nom: ${firstname} ${name}</p>
//               <p>Email: ${email}</p>
//               <p>Pays: ${country}</p>
//               <p>Numéro de téléphone: ${phoneNumber}</p>
//             </div>
//             <p><b>Noublie pas de confirmer ta réservation !</b></p>
//            <h2>
//              A bientôt 🌞 !
//            </h2>
//           `,
//     });

//     return NextResponse.json({
//       message: "Email sent",
//       messageId: info.messageId,
//     });
//   } catch (error) {
//     console.error("Failed to send email:", error);
//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 },
//     );
//   }
// }
