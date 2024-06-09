import { Session } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
      username?: string | null;
      email? : string | null;
  }

  interface User {
    // Add your additional properties here:
    username?: string | null;
    isOAuth?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    username?: string | null;
  }
}

declare module "@auth/core/adapters" {
  interface AdapterUser {
    // Add your additional properties here:
    username?: string | null;
  }
}