"use client"

import Loader from "@/components/loader"
import ObjectsList from "@/components/objects"
import { objectStore } from "@/store/objectStore"
import { useState, useEffect } from "react"

export default function UserObjectsPage() {
  const { recuperateObjects, getObjectsForUser } = objectStore()
  const [searchText, setSearchText] = useState("")
  const objects = getObjectsForUser()

  useEffect(() => {
    recuperateObjects()
  }, [])

  const filteredData = objects.filter(object => 
    object.estado_objeto &&
    object.state !== "reclamado" &&
    object.name_object.toLowerCase().includes(searchText.toLowerCase())
  )

  return (
    <main>
      <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center">Objetos</h1>
      <p className="bg-[#E2E2E2] font-bold text-center py-12 text-xl mb-8">
        Aquí verás los objetos que ya han sido aceptados.
      </p>
      <h3 className="text-center font-bold text-2xl mb-2">Objetos Aceptados</h3>

      <div className="flex flex-col md:flex-row justify-between border-2 border-gray-200 mb-8 p-4 w-11/12 mx-auto">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          className="p-2 border-2 border-gray-500 w-full md:w-4/12 mb-4 md:mb-0 shadow-md"
        />
      </div>

      {objects.length === 0 ? <Loader /> : 
        filteredData.length > 0 ? 
        <ObjectsList objects={filteredData} buttonText="Contactar" option="usuario" /> 
        : 
        <p className="text-center">No hay objetos aceptados</p>
      }
    </main>
  )
}
