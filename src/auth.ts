
import { DrizzleAdapter } from "@auth/drizzle-adapter"
import NextAuth, { DefaultSession, NextAuthConfig} from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { db } from "@/db/drizzle"
import { loginSchema } from "./lib/zod"
import { usuarios } from "@/db/schema"
import { eq } from "drizzle-orm"
import { DefaultJWT } from "next-auth/jwt"

interface MyJWT extends DefaultJWT {
    id: string;
}

interface MySession extends DefaultSession {
    user: {
        id: string;
    } & DefaultSession["user"];
}

export const authConfig = {
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id; // Añadir el ID de usuario al token
            }
            return token as MyJWT;
        },
        async session({ session, token }) {
            session.user.id = token.id as string; // Añadir el ID de usuario a la sesión
            return session as MySession;
        },
    },
   // adapter: DrizzleAdapter(db),
    //session: { strategy: "jwt" },
    // callbacks: {
    //     authorized({ auth, request: { nextUrl } }) {
    //         const isLogged = !!auth?.user
    //         const paths = ["/ad", "/ad/lostObjects", "foundObjects"]
    //         const isProtected = paths.includes(nextUrl.pathname)

    //         if (isProtected && !isLogged) {
    //             return NextResponse.redirect(new URL("/login", nextUrl))
    //             // const redirectUrl = new URL("/login",nextUrl.origin)
    //             // redirectUrl.searchParams.append("callbackUrl", nextUrl.href)
    //             // return Response.redirect(redirectUrl)
    //         }

    //         return true
    //     },
    // },
    providers: [
        Credentials({
            authorize: async (credentials) => {
                const { data, success } = loginSchema.safeParse(credentials)
                if (!success) throw new Error("Credenciales invalidas")
                // verificar si existe el usuario en la bd
                const user = await db.select().from(usuarios).where(eq(usuarios.email, data.email))



                const isValid = data.password === user[0]?.password

                if (!user || !isValid) throw new Error("correo o contraseña incorrectos")


                    
                    return {id: user[0].id_user, ...user[0] };
                // return user[0]
            },
        })
    ],
} satisfies NextAuthConfig

export const { handlers, signIn, signOut, auth } = NextAuth({
   adapter: DrizzleAdapter(db),
   session: { strategy: "jwt" },
   ...authConfig
})