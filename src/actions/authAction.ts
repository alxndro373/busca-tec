"use server"

import { signIn } from "@/auth";
import { db } from "@/db/drizzle";
import { usuarios } from "@/db/schema";
import { loginSchema, registerSchema } from "@/lib/zod";
import { eq } from "drizzle-orm";
import { AuthError } from "next-auth";
import {z} from "zod"
import bcrypt from "bcryptjs";

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
    try {
      // Buscar al usuario en la base de datos por su correo electrónico
      const user = await db.select().from(usuarios).where(eq(usuarios.email, values.email))
  
      if (!user[0]) return { error: "Correo o contraseña incorrectos" }
  
      // Comparar la contraseña ingresada con la almacenada (encriptada)
      const isMatch = await bcrypt.compare(values.password, user[0].password)
      
      if (!isMatch) return { error: "Correo o contraseña incorrectos" }
  
      // Si la contraseña es correcta, proceder con el inicio de sesión
      await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })
  
      return { success: true }
    } catch (error) {
      if (error instanceof AuthError) return { error: error?.cause?.err?.message }
      return { error: "Error 505" }
    }
  }


export const registerAction = async (values: z.infer<typeof registerSchema>) => {
    try {
      const { data, success } = registerSchema.safeParse(values)
      if (!success) throw new Error("Información inválida")
  
      // Verificar si ya existe el usuario
      const user = await db.select().from(usuarios).where(eq(usuarios.email, data.email))
  
      if (user[0]) return { error: "El correo ya existe" }
      if (data.password !== data.confirmPassword) return { error: "Las contraseñas no coinciden" }
  
      // Encriptar la contraseña antes de insertarla
      const hashedPassword = await bcrypt.hash(data.password, 10)
  
      await db.insert(usuarios).values({
        name: data.user,
        email: data.email,
        phone: data.phone,
        password: hashedPassword,
      })
  
      return { success: true }
    } catch (error) {
      if (error instanceof AuthError) return { error: error?.cause?.err?.message }
      return { error: "Error 505" }
    }
  }