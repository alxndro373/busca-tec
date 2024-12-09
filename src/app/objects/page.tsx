"use client"

import Loader from "@/components/loader"
import ObjectsList from "@/components/objects"
import { objectStore } from "@/store/objectStore"
import { useState, useEffect, useMemo } from "react"

export default function UserObjectsPage() {
  const { recuperateObjects, objectsForUser } = objectStore()
  const [searchText, setSearchText] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedState, setSelectedState] = useState("")
  const [selectedDate, setSelectedDate] = useState("")
  const [sortOrder, setSortOrder] = useState("")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchObjects = async () => {
      setLoading(true)
      await recuperateObjects()
      setLoading(false)
    }
    fetchObjects()
  }, [recuperateObjects])

  const filteredAndSortedData = useMemo(() => {
    const filteredData = objectsForUser.filter((object) => {
      const matchSearchText = searchText ? object.name_object.toLowerCase().includes(searchText.toLowerCase()) : true
      const matchesCategory = selectedCategory ? object.category === selectedCategory : true
      const matchesState = selectedState ? object.state === selectedState : true
      const matchesDate = selectedDate ? object.date && object.date.substring(0, 10) === selectedDate : true
      const isNotReclaimed = object.state !== "reclamado"
      return matchSearchText && matchesCategory && matchesState && matchesDate && isNotReclaimed
    })

    if (sortOrder === "asc") {
      return filteredData.sort((a, b) => a.name_object.localeCompare(b.name_object))
    } else if (sortOrder === "desc") {
      return filteredData.sort((a, b) => b.name_object.localeCompare(a.name_object))
    }
    return filteredData
  }, [objectsForUser, searchText, selectedCategory, selectedState, selectedDate, sortOrder])

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

        <select
          className="p-1 border-2 border-gray-500 w-full md:w-2/12 mb-2 md:mb-0 shadow-md bg-white"
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="">Ordenar por</option>
          <option value="asc">Nombre Ascendente</option>
          <option value="desc">Nombre Descendente</option>
        </select>

        <select
          className="p-1 border-2 border-gray-500 w-full md:w-2/12 mb-2 md:mb-0 shadow-md bg-white"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">Todas las categorías</option>
          <option value="Accesorios Personales">Accesorios Personales</option>
          <option value="Documentos y Tarjetas">Documentos y Tarjetas</option>
          <option value="Electronica">Electrónica</option>
          <option value="Ropa y Calzado">Ropa y Calzado</option>
          <option value="Otro">Otro</option>
        </select>

        <select
          className="p-1 border-2 border-gray-500 w-full md:w-2/12 mb-2 md:mb-0 shadow-md bg-white"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
        >
          <option value="">Todos los objetos</option>
          <option value="perdido">Perdido</option>
          <option value="encontrado">Encontrado</option>
        </select>

        <div className="w-full md:w-2/12 mt-4 md:mt-0">
          <label htmlFor="filter-date" className="block md:inline-block">Fecha:</label>
          <input
            type="date"
            id="filter-date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="border-2 border-gray-500 p-1 rounded ml-0 md:ml-2 w-full"
          />
        </div>
      </div>

      {loading ? (
        <Loader />
      ) : filteredAndSortedData.length > 0 ? (
        <ObjectsList objects={filteredAndSortedData} buttonText="Contactar" option="usuario" onObjectChange={function (): void {
            throw new Error("Function not implemented.")
          } } />
      ) : (
        <p className="text-center">No hay objetos aceptados</p>
      )}
    </main>
  )
}
