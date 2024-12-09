import { deleteObject, getObjects, getObjectsByUser, updateObjectState } from "@/actions/objectAction"
import { objectType } from "@/types/objectType"
import { create } from "zustand"

interface Props {
  deleteObject(id_object: string): unknown
  objects: objectType[]
  objectsByUser: objectType[]
  recuperateObjects: () => Promise<void>
  recuperateObjectsByUser: (id_user: string) => Promise<void>
  changeObjectState: (id_object: string, stateObject: string, estado_objeto: boolean) => Promise<void>
  objectsForAdmin: objectType[]
  objectsForUser: objectType[]
  getObjectsForAdmin: () => objectType[]
  getObjectsForUser: () => objectType[]
}

export const objectStore = create<Props>((set, get) => ({
  objects: [],
  objectsByUser: [],
  objectsForAdmin: [],
  objectsForUser: [],
  
  // Recuperar todos los objetos y separarlos para administrador y usuario
  recuperateObjects: async () => {
    try {
      const objects = await getObjects()
      set({
        objects,
        objectsForAdmin: objects.filter(object => !object.estado_objeto),
        objectsForUser: objects.filter(object => object.estado_objeto),
      })
    } catch (error) {
      console.error("Error al recuperar objetos:", error)
    }
  },

  // Recuperar objetos del usuario específico
  recuperateObjectsByUser: async (id_user: string) => {
    try {
      const objects = await getObjectsByUser(id_user)
      set({ objectsByUser: objects })
    } catch (error) {
      console.error("Error al recuperar objetos del usuario:", error)
    }
  },

  // Cambiar el estado del objeto en el frontend (se separan las dos lógicas)
  changeObjectState: async (id_object: string, stateObject: string, estado_objeto: boolean) => {
    try {
      await updateObjectState(id_object, stateObject, estado_objeto)

      // Actualizar los objetos de acuerdo a los cambios
      set((state) => {
        const updatedObjects = state.objects.map((object) =>
          object.id_object === id_object
            ? { ...object, state: stateObject, estado_objeto }
            : object
        )

        return {
          objects: updatedObjects,
          objectsByUser: state.objectsByUser.map((object) =>
            object.id_object === id_object
              ? { ...object, state: stateObject, estado_objeto }
              : object
          ),
          objectsForAdmin: updatedObjects.filter(object => !object.estado_objeto),
          objectsForUser: updatedObjects.filter(object => object.estado_objeto),
        }
      })
    } catch (error) {
      console.error("Error al cambiar el estado del objeto:", error)
    }
  },

  // Eliminar objeto
  deleteObject: async (id_object: string) => {
    try {
      await deleteObject(id_object)

      set((state) => {
        const updatedObjects = state.objects.filter(object => object.id_object !== id_object)
        const updatedObjectsByUser = state.objectsByUser.filter(object => object.id_object !== id_object)
        const updatedObjectsForAdmin = state.objectsForAdmin.filter(object => object.id_object !== id_object)
        const updatedObjectsForUser = state.objectsForUser.filter(object => object.id_object !== id_object)

        return {
          objects: updatedObjects,
          objectsByUser: updatedObjectsByUser,
          objectsForAdmin: updatedObjectsForAdmin,
          objectsForUser: updatedObjectsForUser,
        }
      })
    } catch (error) {
      console.error("Error al eliminar el objeto:", error)
    }
  },

  // Filtrar los objetos para el administrador (solo los que no han sido reclamados)
  getObjectsForAdmin: () => get().objects.filter(object => !object.estado_objeto),

  // Filtrar los objetos para el usuario (solo los que han sido reclamados)
  getObjectsForUser: () => get().objects.filter(object => object.estado_objeto),
}))
