"use client";

import Loader from "@/components/loader"
import ObjectsList from "@/components/objects";
import { objectStore } from "@/store/objectStore";
import { useState, useEffect } from "react";

export default function Objects() {
    const { recuperateObjects } = objectStore()
    const [loading, setLoading] = useState<boolean>(true)
    const [selectedCategory, setSelectedCategory] = useState("")
    const [sortOrder, setSortOrder] = useState("")
    const [selectedState, setSelectedState] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [searchText, setSearchText] = useState("")
    

    useEffect(() => {
        const timer = setTimeout(() => {
          setLoading(false)
        },1000)
        return () => clearTimeout(timer)
      },[]);
    
      
    useEffect(() => {

        recuperateObjects()

    },[]);

    const data = objectStore(state => state.objects)

    // Filtrar objetos
    const filteredData = data.filter(object => {
        const matchSearchText = searchText ? object.name_object.toLocaleLowerCase().includes(searchText.toLocaleLowerCase()) : true
        const matchesCategory = selectedCategory ? object.category === selectedCategory : true
        const matchesState = selectedState ? object.state === (selectedState === "1") : !object.state
        const matchesDate = selectedDate ? object.date && object.date.substring(0, 10) === selectedDate : true
        return matchSearchText && matchesCategory && matchesState && matchesDate;
    })

    // Ordenar objetos según el orden seleccionado
    const sortedData = () => {
        if (sortOrder === "asc") {
            return filteredData.sort((a, b) => a.name_object.localeCompare(b.name_object))
        } else if (sortOrder === "desc") {
            return filteredData.sort((a, b) => b.name_object.localeCompare(a.name_object))
        }
        return filteredData;
    }

    return (
        <main>
            <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center">Objetos</h1>
            <p className="bg-[#E2E2E2] font-bold text-center py-12 text-xl mb-8">
                Aquí encontrarás una amplia variedad de objetos perdidos y encontrados.
            </p>
            <h3 className="text-center font-bold text-2xl mb-2">Todos los objetos</h3>

            <div className="flex justify-between border-2 border-gray-200 mb-8 p-4 w-11/12 ml-auto mr-auto">
                <input
                    type="text"
                    placeholder="Buscar por nombre..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)} //Actualiza el estado de búsqueda
                    className="p-2 border-2 border-gray-500 w-full md:w-4/12 mb-4 mr-2 md:mb-0 shadow-md"
                />

                <select
                    className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-1 bg-white"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)} //Actualiza el estado del orden
                >
                    <option value="">Ordenar por</option>
                    <option value="asc">Nombre Ascendente</option>
                    <option value="desc">Nombre Descendente</option>
                </select>

                <select
                    className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-1 bg-white"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)} //Actualiza el estado de la categoría seleccionada
                >
                    <option value="">Todas las categorías</option>
                    <option value="Accesorios Personales">Accesorios Personales</option>
                    <option value="Documentos y Tarjetas">Documentos y Tarjetas</option>
                    <option value="Electronica">Electrónica</option>
                    <option value="Ropa y Calzado">Ropa y Calzado</option>
                    <option value="Otro">Otro</option>
                </select>

                <select
                    className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-1 bg-white"
                    value={selectedState}
                    onChange={(e) => setSelectedState(e.target.value)} //Actualiza el estado del estado seleccionado
                >
                    <option value="">Filtrar por estados</option>
                    <option value="0">Perdido</option>
                    <option value="1">Encontrado</option>
                </select>

                <div className="w-6/12 ml-5">
                    <label htmlFor="filter-date" className="">Filtrar por fecha:</label>
                    <input
                        type="date"
                        id="filter-date"
                        value={selectedDate}
                        onChange={(e) => setSelectedDate(e.target.value)} //Actualiza el estado de la fecha seleccionada
                        className="border-2 border-gray-500 p-1 rounded ml-2"
                    />
                </div>
            </div>

            {
              loading ? <Loader /> :    
              sortedData().length > 0 ? <ObjectsList objects={sortedData()} buttonText="Encontre tu objeto. Ir a WhatsApp" option={true} />
              : <p className="text-center">No hay objetos perdidos</p>
            }
        </main>
    );
    
}
