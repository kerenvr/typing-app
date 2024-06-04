import NextAuth from "next-auth"
import authConfig from "./auth.config"
import { getUserById } from "../data/user";
 
export const {
  auth,
  handlers: { GET, POST },
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
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