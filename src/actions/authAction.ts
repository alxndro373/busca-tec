"use server"

import { signIn } from "@/auth"
import { db } from "@/db/drizzle"
import { usuarios, objetos } from "@/db/schema"
import { loginSchema, registerSchema } from "@/lib/zod"
import { eq } from "drizzle-orm"
import { AuthError } from "next-auth"
import {z} from "zod"
import bcrypt from "bcryptjs"

export const loginAction = async (values: z.infer<typeof loginSchema>) => {
    try {
      const user = await db.select().from(usuarios).where(eq(usuarios.email, values.email))
  
      if (!user[0]) return { error: "Correo o contraseña incorrectos" }
  
      const isMatch = await bcrypt.compare(values.password, user[0].password)
      
      if (!isMatch) return { error: "Correo o contraseña incorrectos" }
  
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        return { error: result.error }
      }
  
      return { 
        success: true,
        id: user[0].id_user,
        rol: user[0].rol
      }
    } catch (error) {
      if (error instanceof AuthError) return { error: error?.cause?.err?.message }
      return { error: "Error 505" }
    }
  }


export const registerAction = async (values: z.infer<typeof registerSchema>) => {
    try {
      const { data, success } = registerSchema.safeParse(values)
      if (!success) throw new Error("Información inválida")
  
      const user = await db.select().from(usuarios).where(eq(usuarios.email, data.email))
  
      if (user[0]) return { error: "El correo ya existe" }
      if (data.password !== data.confirmPassword) return { error: "Las contraseñas no coinciden" }
  
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

// export async function deleteObject(objectId: string) {
//   try {
//       const deletedRows = await db.delete(objetos).where(eq(objetos.id_object, objectId))
//       return deletedRows
//   } catch (error) {
//       console.error("Error al eliminar el objeto:", error)
//       throw new Error("No se pudo eliminar el objeto.")
//   }
// }