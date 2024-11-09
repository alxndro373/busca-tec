"use client"

import Loader from "@/components/loader"
import ObjectsList from "@/components/objects"
import { objectStore } from "@/store/objectStore"
import { useEffect, useState } from "react"

export default  function Objects(){

    const {recuperateObjects} =  objectStore()
    const [loading, setLoading] = useState<boolean>(true)
   
    useEffect(() => {
      const timer = setTimeout(() => {
        setLoading(false)
      },1000)
      return () => clearTimeout(timer)
    },[])

    useEffect(() => {

        recuperateObjects()

    },[])

    const data = objectStore(state => state.objects)

    return (
        <main>
            <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center">Objetos</h1>
            <p className="bg-[#E2E2E2] font-bold text-center py-12 text-xl mb-8">Aqui encontraras una amplia variedad de objetos perdidos y encontrados.</p>
            <h3 className="text-center font-bold text-2xl mb-2">Todos los objetos</h3>
            <div className="flex justify-between border-2 border-gray-200 mb-8 p-4 w-11/12 ml-auto mr-auto">
                <select>
                    <option value="">Ordenar por</option>
                </select>
                <select>
                    <option value="">Filtrar por</option>
                </select>
            </div>
        


            {
              loading ?  <Loader></Loader> :    
              data.length > 0 ?  < ObjectsList objects={data} buttonText="Encontre tu objeto.Ir a WhatsApp" option={true} />  
                : <p className="text-center">No hay objetos Perdios</p>
            }
            
        </main>
    )
}
