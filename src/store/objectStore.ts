import { getObjects, getObjectsByUser, updateObjectState } from "@/actions/objectAction"
import { objectType } from "@/types/objectType"
import { create } from "zustand"

interface Props {
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
  
    recuperateObjectsByUser: async (id_user: string) => {
      try {
        const objects = await getObjectsByUser(id_user)
        set({ objectsByUser: objects })
      } catch (error) {
        console.error("Error al recuperar objetos del usuario:", error)
      }
    },
  
    changeObjectState: async (id_object: string, stateObject: string, estado_objeto: boolean) => {
      try {
        await updateObjectState(id_object, stateObject, estado_objeto)
  
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
  
    getObjectsForAdmin: () => get().objects.filter(object => !object.estado_objeto),
    getObjectsForUser: () => get().objects.filter(object => object.estado_objeto),
  }))
