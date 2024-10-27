"use server"

import { signIn } from "@/auth";
import { db } from "@/db/drizzle";
import { usuarios } from "@/db/schema";
import { loginSchema, registerSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import {z} from "zod"

export const loginAction = async (values: z.infer<typeof loginSchema>)  => {

    try {
        await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false
        })
        return {success: true}
    } catch (error) {
        if(error instanceof AuthError) return {error: error?.cause?.err?.message}
        return {error : "error 505"}
    }

}


export const registerAction = async (values: z.infer<typeof registerSchema>) => {
    try {

        const {data, success} = registerSchema.safeParse(values)
        if(!success) throw new Error ("informacion invalida")
        //verificar si ya existe el usuario
        const user = await db.select().from(usuarios).where(eq(usuarios.email, data.email))
        
        if(user[0]) return {error: "El correo ya existe"}
        if(data.password !== data.confirmPassword) return {error: "Las contraseñas no coinciden"}
        await db.insert(usuarios).values({name: data.user, email: data.email, phone: data.phone, password: data.password})

        return {success: true}
        
    } catch (error) {
        if(error instanceof AuthError) return {error: error?.cause?.err?.message}
        return {error: "error 505"}
    }
}