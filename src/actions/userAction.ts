"use server"

import { db } from "@/db/drizzle"
import { usuarios } from "@/db/schema"
import { eq } from "drizzle-orm"


export const getUserWithEmail = async (email: string) => {
    const user = await db.select().from(usuarios).where(eq(usuarios.email,email))
    return user
}