import { getObjects } from "@/actions/objectAction"
import { objectType } from "@/types/objectType"
import {create} from "zustand"


interface Props  {
    objects: objectType[]
    recuperateObjects: () => Promise<void>
} 

export const objectStore = create<Props>((set) => 
({
    objects: [],


    recuperateObjects: async () => {
        const objects = await getObjects();
        set({ objects }); // Asignar directamente aquí
    },
    //     const objects = await getObjects()
    //     set(state => ({
    //         ...state,
    //         objects
    //     }))
    //     }))
    // },

    

}))