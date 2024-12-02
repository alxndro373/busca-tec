// types/next-auth.d.ts
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      rol: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    id: string;
    rol: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    rol: string;
  }
}
