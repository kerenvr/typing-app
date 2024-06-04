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
    async signIn({ user, account }) {
      console.log("USER: ", user)
      console.log("ACCOUNT: ", account)
      if (account && account.provider === "google") {
        try {
          const res = await fetch ("http://localhost:3000/api/user", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
              name: user.name,
              email: user.email,
            })
          })

          if (res.ok) {
            return user;
          }
        } catch (error) {
          console.log(error )
          
        }
      }
      return user;
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