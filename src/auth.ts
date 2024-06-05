import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { prisma } from "@/lib/db";
import { getUserById, getUserByEmail } from "../data/user";
 
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error"
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {id: user.id},
        data: { emailVerified: new Date()}
      })
    }
  },
  callbacks: {
    async signIn({ user }) {
      // try {
      //   await prisma.user.create({
      //     data: {
      //       email: user.email,
      //       name: user.name ?? "",
      //     }
      //   });

      // } catch (error) {
      //   console.error('Error creating user:', error);
      // }

      if (user.id) {
        const existingUser = await getUserById(user.id);
        if (!existingUser?.emailVerified) return false;
      }

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      return session;
    },
    async jwt({ token }) { 
  
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      return token;
      
    }
  },

  session: { strategy: "jwt" },
  ...authConfig,
})