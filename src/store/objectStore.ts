// objectStore.ts

import { getObjects, getObjectsByUser, updateObjectState } from "@/actions/objectAction"
import { objectType } from "@/types/objectType"
import { create } from "zustand"

interface Props {
    objects: objectType[]
    objectsByUser: objectType[]
    recuperateObjects: () => Promise<void>
    recuperateObjectsByUser: (id_user: string) => Promise<void>
    changeObjectState: (id_object: string, stateObject: string, estado_objeto: boolean) => Promise<void>
    getObjectsForAdmin: () => objectType[] // Para la página de administración (estado_objeto: false)
    getObjectsForUser: () => objectType[] // Para la página de usuario (estado_objeto: true)
}

export const objectStore = create<Props>((set, get) => ({
    objects: [],
    objectsByUser: [],

    recuperateObjects: async () => {
        const objects = await getObjects()
        set({ objects })
    },

    recuperateObjectsByUser: async (id_user: string) => {
        const objects = await getObjectsByUser(id_user)
        set({ objectsByUser: objects })
    },

    changeObjectState: async (id_object: string, stateObject: string, estado_objeto: boolean) => {
        await updateObjectState(id_object, stateObject, estado_objeto)
        set((state) => ({
            objectsByUser: state.objectsByUser.map((object) =>
                object.id_object === id_object ? { ...object, state: stateObject, estado_objeto } : object
            ),
            objects: state.objects.map((object) =>
                object.id_object === id_object ? { ...object, state: stateObject, estado_objeto } : object
            ),
        }))
    },

    // Métodos para filtrar objetos por estado_objeto
    getObjectsForAdmin: () => {
        const state = get() // Obtener el estado actual
        return state.objects.filter(object => object.estado_objeto === false) // Filtra objetos en estado_objeto: false
    },

    getObjectsForUser: () => {
        const state = get() // Obtener el estado actual
        return state.objects.filter(object => object.estado_objeto === true) // Filtra objetos en estado_objeto: true
    }

}))
