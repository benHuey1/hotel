// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { compare } from "bcrypt";
// import { prisma } from "./prisma";

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       name: "credentials",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize(credentials) {
//         if (!credentials?.email || !credentials?.password) {
//           throw new Error("Invalid credentials");
//         }

//         const user = await prisma.user.findUnique({
//           where: { email: credentials.email }
//         });

//         if (!user || !user.hashedPassword) {
//           throw new Error("User not found");
//         }

//         const isPasswordValid = await compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!isPasswordValid) {
//           throw new Error("Invalid password");
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//         };
//       }
//     })
//   ],
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: '/connexion',
//   },
//   callbacks: {
//     session: ({ session, token }) => ({
//       ...session,
//       user: {
//         ...session.user,
//         id: token.sub,
//       },
//     }),
//   },
// };

// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// /lib/auth.ts
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "./prisma";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth";

// 1. Déclarer les types étendus
declare module "next-auth" {
  interface User {
    id: string;
    email: string;
    name: string;
    emailVerified?: Date | null;
    firstname: string;
  }

  interface Session {
    user: {
      id: string;
      email: string;
      name: string;
      emailVerified?: Date | null;
      firstname: string;
    }
  }
}

// 2. Déclarer l'extension du token JWT
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    sub: string; // Ajout de sub qui est toujours présent dans le token
    email: string;
    emailVerified?: Date | null;
    firstname: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user || !user.hashedPassword) {
          throw new Error("User not found");
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.hashedPassword
        );

        if (!isPasswordValid) {
          throw new Error("Invalid password");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          emailVerified: user.emailVerified,
          firstname: user.firstname
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: '/connexion',
  },
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) {
        return {
          ...token,
          id: user.id,
          sub: user.id, // Assurez-vous que sub est défini
          email: user.email,
          emailVerified: user.emailVerified,
          firstname: user.firstname
        };
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user && token) {
        session.user.id = token.sub;
        session.user.email = token.email;
        session.user.emailVerified = token.emailVerified;
        session.user.firstname = token.firstname;
      }
      return session;
    }
  },
};