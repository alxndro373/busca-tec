"use server"

import { db } from "@/db/drizzle"
import { objetos, usuarios } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getObjects = async () => {
    const objects = await db
        .select({
            id_object: objetos.id_object,
            name_object: objetos.name_object,
            description: objetos.description,
            localization: objetos.localization,
            date: objetos.date,
            category: objetos.category,
            image_url: objetos.image_url,
            id_user: objetos.id_user,
            phone: usuarios.phone,
            state: objetos.state,
            estado_objeto: objetos.estado_objeto,
        })
        .from(objetos)
        .innerJoin(usuarios, eq(objetos.id_user, usuarios.id_user))
    return objects
} 


export const addObject = async (
    name: string,
    description: string | null,
    localization: string,
    date: Date | null,
    category: string | null,
    image_url: string,
    id_user: string | undefined,
    state: string,
    estado_objeto: boolean = false
) => {
    await db.insert(objetos).values({
        name_object: name,
        description,
        localization,
        date: date?.toISOString().split("T")[0],
        category,
        image_url,
        id_user,
        state,
        estado_objeto,
    })
}

export const getLostObjects = async () => {
    return await db
        .select()
        .from(objetos)
        .where(eq(objetos.estado_objeto, false)); // Objetos perdidos
};

export const getFoundObjects = async () => {
    return await db
        .select()
        .from(objetos)
        .where(eq(objetos.estado_objeto, true)); // Objetos encontrados
};



export const getObjectsByUser = async (id_user: string) => {
  const objects = await db.select().from(objetos).where(eq(objetos.id_user,id_user))
  return objects
}

export const updateObjectState = async (
    id_object: string,
    state: string,
    estado_objeto: boolean
) => {
    try {
        await db.update(objetos).set({ state, estado_objeto }).where(eq(objetos.id_object, id_object))
    } catch (error) {
        console.error("Error updating object state:", error)
        throw new Error("Could not update object state")
    }
}


export const deleteObject = async (id_object: string) => {
    await db.delete(objetos).where(eq(objetos.id_object, id_object))
}
