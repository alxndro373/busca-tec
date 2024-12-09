"use client"

import { useState, FC } from "react"
import { objectType } from "@/types/objectType"
import ObjectModal from "./objectModal"

interface Props {
  objects: objectType[]
  option: string
  buttonText: string
  onObjectChange: () => void
}

const ObjectsList: FC<Props> = ({ objects, option, buttonText, onObjectChange }) => {
  const [selectedObject, setSelectedObject] = useState<objectType | null>(null)

  const handleObjectClick = (object: objectType) => {
    setSelectedObject(object)
  }

  const closeModal = () => setSelectedObject(null)

  const filteredObjects = objects

  const handleDelete = async (id_object: string) => {
    try {
      const response = await fetch(`/api/db/${id_object}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Error al eliminar el objeto")
      }
      onObjectChange()
    } catch (error) {
      console.error("Error al eliminar el objeto:", error)
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-6 justify-center mb-10 w-11/12 mx-auto cursor-pointer">
        {filteredObjects.map((object) => (
          <div
            className="w-full sm:w-1/2 md:w-1/3 lg:w-1/5 bg-white shadow-md"
            key={object.id_object}
            onClick={() => handleObjectClick(object)}
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
              <button onClick={() => handleDelete(object.id_object)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>

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
