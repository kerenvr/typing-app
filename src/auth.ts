import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { getUserById, getUserByEmail } from "../data/user";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/db"; 
 
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  adapter: PrismaAdapter(prisma),
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
    async signIn({ user, account }) {
      //if there is a user
      if (user.id) {
        //email verification not needed for providers like Google
        if (account?.provider !== "credentials") return true;
        const existingUser = await getUserById(user.id); //find user in the db

        //see their email verification status, if not verified, deny log in
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