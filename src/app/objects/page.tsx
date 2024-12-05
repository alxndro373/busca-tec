"use client"

import Loader from "@/components/loader"
import ObjectsList from "@/components/objects"
import { objectStore } from "@/store/objectStore"
import { useState, useEffect } from "react"

export default function Objects() {
    const { recuperateObjects } = objectStore()
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedCategory, setSelectedCategory] = useState<string>("")
    const [sortOrder, setSortOrder] = useState<string>("")
    const [selectedState, setSelectedState] = useState<string>("")
    const [selectedDate, setSelectedDate] = useState<string>("")
    const [searchText, setSearchText] = useState<string>("")

    useEffect(() => {
        const fetchData = async () => {
            try {
                await recuperateObjects()
            } catch (error) {
                console.error("Error al cargar los objetos:", error)
            } finally {
                setLoading(false)
            }
        };

        fetchData()
    }, [recuperateObjects])

    const data = objectStore(state => state.objects)

    const filteredData = data.filter(object => {
        const matchSearchText = searchText ? object.name_object.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) : true
        const matchesCategory = selectedCategory ? object.category === selectedCategory : true
        const matchesState = selectedState ? object.state === selectedState : true
        const matchesDate = selectedDate ? object.date && object.date.substring(0, 10) === selectedDate : true
        return matchSearchText && matchesCategory && matchesState && matchesDate
    })

    // Ordenamos los datos si es necesario
    const sortedData = () => {
        if (sortOrder === "asc") {
            return filteredData.sort((a, b) => a.name_object.localeCompare(b.name_object))
        } else if (sortOrder === "desc") {
            return filteredData.sort((a, b) => b.name_object.localeCompare(a.name_object))
        }
        return filteredData
    }

    return (
        <main>
            <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center">Objetos</h1>
            <p className="bg-[#E2E2E2] font-bold text-center py-12 text-xl mb-8">
                Aquí encontrarás una amplia variedad de objetos perdidos y encontrados.
            </p>
            <h3 className="text-center font-bold text-2xl mb-2">Objetos {selectedState === 'perdido' ? 'perdidos' : 'encontrados'}</h3>

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
            ) : sortedData().length > 0 ? (
                <ObjectsList objects={sortedData()} buttonText="Contactar vía WhatsApp" option={"usuario"} />
            ) : (
                <p className="text-center">No hay objetos {selectedState === 'perdido' ? 'perdidos' : 'encontrados'}</p>
            )}
        </main>
    );
}
