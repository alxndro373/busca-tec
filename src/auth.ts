
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/db/drizzle"
import { loginSchema } from "./lib/zod"
import { usuarios } from "@/db/schema"
import { eq } from "drizzle-orm"

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    session: {strategy: "jwt"},
   
    providers: [
        Credentials({
            authorize: async (credentials) => {
               const {data, success} = loginSchema.safeParse(credentials)
               if(!success) throw new Error("credenciales invalidas")
                // verificar si existe el usuario en la bd
                const user = await db.select().from(usuarios).where(eq(usuarios.email, data.email))

                
                
                const isValid = data.password === user[0]?.password

                if(!user || !isValid) throw new Error ("correo o contraseña incorrectos")
               


                return user[0]
            },
        })
    ],
})