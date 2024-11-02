"use server"

import { db } from "@/db/drizzle"
import { objetos, usuarios } from "@/db/schema"
import { eq } from "drizzle-orm"

export const getObjects = async () => {
    const objects = await db.select({
        id_object: objetos.id_object,
        name_object: objetos.name_object,
        description: objetos.description,
        localization: objetos.localization,
        date: objetos.date,
        category: objetos.category,
        image: objetos.image_url,
        id_user: objetos.id_user,
        phone: usuarios.phone, // Selecciona el número de teléfono del usuario
        state: objetos.state
    })
    .from(objetos)
    .innerJoin(usuarios, eq(objetos.id_user, usuarios.id_user));
    return objects
} 


export const addObject = async (name:string,description:string| null,localization:string, date: Date | null, category: string | null,image_url:string,id_user:string|undefined, state:boolean) => {
    await db.insert(objetos).values({
        name_object: name,
        description,
        localization,
        date: date?.toISOString().split("t")[0],
        category,
        image_url,
        id_user,
        state,
    })
}

