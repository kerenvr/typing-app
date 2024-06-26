import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { getUserById, getUserByEmail } from "../data/user";
import { PrismaAdapter } from "@auth/prisma-adapter"
import { prisma } from "./lib/db"; 
import { getAccountByUserId } from "../data/account";
 
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
    async linkAccount({ user }) { //triggered when new account linked to a user
      await prisma.user.update({
        where: {id: user.id}, //get user by id
        data: { emailVerified: new Date()} //update date
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

      //allow sign in 
      return true;
    },
    //callback for when session() is called
    async session({ token, session }) {
      if (token.sub && session.user) { //id and user exist
        session.user.id = token.sub; //session.user does not come with id
        //so we need to create an id, and set it to the token.sub 
        //which is the user id in the database
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.username = token.username;
        
        if (token.email) { //because it can be null or undefined
          session.user.email = token.email;
      }
        session.user.isOAuth = token.isOAuth as boolean; 
    }
      return session; //allow session
    },
    async jwt({ token }) { //callback when JWT token is created
  
      if (!token.sub) return token; //user id does not exist

      const existingUser = await getUserById(token.sub); //find user by id

      if (!existingUser) return token; //user does not exist

      const existingAccount = getAccountByUserId(
        existingUser.id
      );

      token.isOAuth = !!existingAccount;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.username = existingUser.username;

      return token; //return token
      
    }
  },

  session: { strategy: "jwt" },
  ...authConfig,
})