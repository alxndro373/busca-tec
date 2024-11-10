import { getObjects, getObjectsByUser, updateObjectState } from "@/actions/objectAction"
import { objectType  } from "@/types/objectType"
import {create} from "zustand"


interface Props  {
    objects: objectType[]
    objectsByUser: objectType[]
    recuperateObjects: () => Promise<void>
    recuperateObjectsByUser: (id_user: string) => Promise<void>
    changeObjectState: (id_object: string, state:boolean) => Promise<void>
} 

export const objectStore = create<Props>((set) => 
({
    objects: [],
    objectsByUser: [],

    recuperateObjects: async () => {
        const objects = await getObjects()
        set({objects})
    },


    recuperateObjectsByUser: async (id_user: string) => {
        const objects = await getObjectsByUser(id_user)
        set({objectsByUser: objects })
    },


    changeObjectState: async (id_object: string, stateObject: boolean) => {
        await updateObjectState(id_object, stateObject)
        set(state => ({
            objectsByUser: state.objectsByUser.map(object => object.id_object === id_object ? {...object, state:stateObject} : object),
            objects: state.objects.map(object => object.id_object !== id_object ? object : {...object, state:stateObject})
        }))
        
    }

}))
