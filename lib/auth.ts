import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { prisma } from "./prisma";

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
        };
      }
    })
  ],
  session: { strategy: "jwt" },
  pages: {
    signIn: '/connexion',
  },
  callbacks: {
    session: ({ session, token }) => ({
      ...session,
      user: {
        ...session.user,
        id: token.sub,
      },
    }),
  },
};

// ----------------------------------------------------------------------------------------------------------------------------------------------------------

// /lib/auth.ts
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
//           emailVerified: user.emailVerified,
//           firstname: user.firstname
//         };
//       }
//     })
//   ],
//   session: { strategy: "jwt" },
//   pages: {
//     signIn: '/connexion',
//   },
//   callbacks: {
//     jwt: async ({ token, user }) => {
//       if (user) {
//         token.emailVerified = user.emailVerified;
//         token.firstname = user.firstname;
//       }
//       return token;
//     },
//     session: async ({ session, token }) => {
//       if (token) {
//         session.user.id = token.sub;
//         session.user.emailVerified = token.emailVerified;
//         session.user.firstname = token.firstname;
//       }
//       return session;
//     }
//   },
// };