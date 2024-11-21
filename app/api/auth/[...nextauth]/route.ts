// import { NextAuthOptions } from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import { prisma } from "@/lib/prisma";
// import { compare } from "bcrypt";

// export const authOptions: NextAuthOptions = {
//   adapter: PrismaAdapter(prisma),
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

//         const isValidPassword = await compare(
//           credentials.password,
//           user.hashedPassword
//         );

//         if (!isValidPassword) {
//           throw new Error("Invalid password");
//         }

//         return {
//           id: user.id,
//           email: user.email,
//           name: user.name,
//           firstname: user.firstname,
//         };
//       }
//     })
//   ],
//   pages: {
//     signIn: "/login",
//   },
//   callbacks: {
//     async session({ session, user }) {
//       return {
//         ...session,
//         user: {
//           ...session.user,
//           id: user.id,
//         }
//       };
//     }
//   },
//   session: {
//     strategy: "jwt",
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };

// export default authOptions;

import NextAuth from "next-auth";
import { authOptions } from "@/lib/auth";

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);