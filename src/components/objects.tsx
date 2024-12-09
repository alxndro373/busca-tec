"use client"

import { objectType } from "@/types/objectType"
import { useState, FC } from "react"
import ObjectModal from "./objectModal"

interface Props {
  objects: objectType[]
  option: string
  buttonText: string
}

const ObjectsList: FC<Props> = ({ objects, option, buttonText }) => {
  const [selectedObject, setSelectedObject] = useState<objectType | null>(null)

  // Función para abrir el modal con el objeto seleccionado
  const handleObjectClick = (object: objectType) => {
    setSelectedObject(object)  // Guarda el objeto seleccionado para abrir el modal
  }

  // Función para cerrar el modal
  const closeModal = () => setSelectedObject(null)

  // Filtrar objetos en función de la opción seleccionada
  const filteredObjects = objects.filter(object => {
    if (option === "usuario") {
      return object.estado_objeto === true; // Solo objetos aceptados
    }
    return true; // Mostrar todos los objetos en la vista general
  })

  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center mb-10 w-11/12 mx-auto cursor-pointer">
        {filteredObjects.map((object) => (
          <div
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 bg-white shadow-md"
            key={object.id_object}
            onClick={() => handleObjectClick(object)} // Al hacer clic en un objeto, abrir el modal
          >
            <img
              src={object.image_url as string}
              alt={`Imagen de ${object.name_object}`}
              className="w-full h-[200px] object-cover"
              loading="lazy"
            />
            <div>
              <h4 className="font-bold">{object.name_object}</h4>
              <span
                className={`px-2 text-white ${object.state === "encontrado" ? "bg-green-500" : object.state === "perdido" ? "bg-red-500" : "bg-blue-500"}`}
              >
                {object.state === "encontrado" ? "Encontrado" : object.state === "perdido" ? "Perdido" : "Reclamado"}
              </span>
              <p>⌚ {object.date}</p>
              <hr />
              <p>💼 {object.category}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Mostrar el modal solo cuando un objeto ha sido seleccionado */}
      {selectedObject && (
        <ObjectModal
          selectedObject={selectedObject}
          onClose={closeModal}
          buttonText={buttonText}
          option={option}
        />
      )}
    </>
  )
}

export default ObjectsList
