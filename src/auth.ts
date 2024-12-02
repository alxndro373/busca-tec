import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth, { DefaultSession, NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import bcrypt from "bcryptjs" // Secure password comparison
import { db } from "@/db/drizzle"
import { loginSchema } from "./lib/zod"
import { usuarios } from "@/db/schema"
import { eq } from "drizzle-orm"
import { DefaultJWT } from "next-auth/jwt"

interface MyJWT extends DefaultJWT {
    id: string
    rol: string
}

interface MySession extends DefaultSession {
    user: {
        id: string
        rol: string
    } & DefaultSession["user"]
}

export const authConfig = {
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                if (user.id) {
                    token.id = user.id as string
                } else {
                    throw new Error("El usuario no tiene un ID definido.")
                }

                if (user.rol) {
                    token.rol = user.rol
                }
            }
            return token as MyJWT
        },
        async session({ session, token }) {
            if (!token.id || !token.rol) {
                throw new Error("Faltan propiedades en el token.")
            }

            session.user.id = token.id as string
            session.user.rol = token.rol
            return session as MySession
        },
    },

    providers: [
        Credentials({
            authorize: async (credentials) => {
                const { data, success } = loginSchema.safeParse(credentials)
                if (!success) throw new Error("Credenciales inválidas")

                const user = await db
                    .select()
                    .from(usuarios)
                    .where(eq(usuarios.email, data.email))

                if (!user || user.length === 0) {
                    throw new Error("Correo o contraseña incorrectos")
                }

                const isValid = await bcrypt.compare(data.password, user[0]?.password)
                if (!isValid) {
                    throw new Error("Correo o contraseña incorrectos")
                }

                return {
                    id: user[0].id_user, 
                    rol: user[0].rol, 
                    name: user[0].name, 
                    email: user[0].email,
                }
            },
        }),
    ],
} satisfies NextAuthConfig


export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    session: { strategy: "jwt" },
    ...authConfig,
})