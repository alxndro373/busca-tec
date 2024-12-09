import { objectStore } from "@/store/objectStore"
import { objectType } from "@/types/objectType"
import { FC } from "react"
import { useSession } from "next-auth/react"
import Swal from "sweetalert2"

interface ObjectModalProps {
  selectedObject: objectType
  onClose: () => void
  buttonText: string
  option: string
}

const ObjectModal: FC<ObjectModalProps> = ({ selectedObject, onClose, buttonText, option }) => {
  const { data: session } = useSession()
  const { changeObjectState } = objectStore()

  const isOwner = session?.user?.id === selectedObject.id_user

  const handleWhatsAppRedirect = (phone: string) => {
    const message = "¡Hola! Encontré el objeto que publicaste."
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
    window.open(url, "_blank")
  }

  const handleAction = async () => {
    if (option === "usuario") {
      if ((selectedObject.state === "perdido" || selectedObject.state === "encontrado") && selectedObject.phone) {
        handleWhatsAppRedirect(selectedObject.phone)
      } else if ((selectedObject.state === "perdido" || selectedObject.state === "encontrado") && !selectedObject.phone) {
        console.error("El número de teléfono no está disponible.")
      }
    }
  }

  const handleReclamado = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este objeto será marcado como reclamado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, reclamar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (selectedObject.state === "perdido" || selectedObject.state === "encontrado") {
          await changeObjectState(selectedObject.id_object, "reclamado", selectedObject.estado_objeto) // Mantener estado_objeto
          onClose()
          Swal.fire("Reclamado", "El objeto ha sido marcado como reclamado.", "success")
        } else {
          console.error("El estado del objeto es inválido para marcarlo como reclamado.")
          Swal.fire("Error", "El estado del objeto no es válido.", "error")
        }
      }
    })
  }

  const handleAccept = async () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este objeto será aceptado y marcado como reclamado.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, aceptar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (selectedObject.estado_objeto === false) {
          if (selectedObject.state !== null) {
            await changeObjectState(selectedObject.id_object, selectedObject.state, true)
            onClose()
            Swal.fire("Aceptado", "El objeto ha sido aceptado.", "success")
          } else {
            console.error("El estado del objeto no es válido.")
            Swal.fire("Error", "El estado del objeto no es válido.", "error")
          }
        } else {
          console.error("Este objeto ya ha sido reclamado.")
          Swal.fire("Error", "Este objeto ya ha sido reclamado.", "error")
        }
      }
    })
  }

  const handleDelete = async (id_object: string) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "Este objeto será eliminado permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await fetch(`/api/db/${id_object}`, {
            method: "DELETE",
          })

          if (!response.ok) {
            throw new Error("Error al eliminar el objeto")
          }

          await objectStore.getState().deleteObject(id_object)

          onClose()
          Swal.fire("Eliminado", "El objeto ha sido eliminado exitosamente.", "success")
        } catch (error) {
          Swal.fire("Error", "Hubo un problema al eliminar el objeto.", "error")
          console.error(error)
        }
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
        <div className="flex-1 mb-4 md:mb-0">
          <button
            onClick={onClose}
            className="text-red-500 font-bold mb-4"
          >
            Cerrar
          </button>
          <h4 className="font-bold text-2xl mb-2">
            {selectedObject.name_object}
          </h4>
          <p>
            <strong>Estado:</strong>{" "}
            {selectedObject.state === "encontrado" ? "Encontrado" : "Perdido"}
          </p>
          <p>
            <strong>Fecha:</strong> {selectedObject.date}
          </p>
          <p>
            <strong>Categoría:</strong> {selectedObject.category}
          </p>
          <p>
            <strong>Descripción:</strong> {selectedObject.description}
          </p>
          <p>
            <strong>Lugar:</strong> {selectedObject.localization}
          </p>

          {option === "usuario" && (selectedObject.state === "perdido" || selectedObject.state === "encontrado") && selectedObject.phone && (
            <button
              onClick={handleAction}
              className="mt-4 bg-green-500 text-sm text-white px-4 py-2 rounded"
            >
              {buttonText}
            </button>
          )}

          {option === "usuario" && isOwner && (
            <button
              onClick={() => handleDelete(selectedObject.id_object)}
              className="mt-4 bg-red-500 text-sm text-white px-4 py-2 rounded"
            >
              Eliminar
            </button>
          )}

          {option === "usuario" && (selectedObject.state === "perdido" || selectedObject.state === "encontrado") && isOwner && (
            <button
              onClick={handleReclamado}
              className="mt-4 bg-blue-500 text-sm text-white px-4 py-2 rounded"
            >
              Marcar como Reclamado
            </button>
          )}

          {option === "admin" && (
            <div>
              <button
                onClick={handleAccept}
                className="mt-4 bg-green-500 text-sm text-white px-4 py-2 rounded mr-2"
              >
                Aceptar
              </button>
              <button
                onClick={() => handleDelete(selectedObject.id_object)}
                className="mt-4 bg-red-500 text-sm text-white px-4 py-2 rounded"
              >
                Rechazar
              </button>
            </div>
          )}
        </div>

        <div className="w-full md:w-2/5 flex justify-center">
          <img
            src={selectedObject.image_url as string}
            alt="imagen del objeto perdido"
            className="w-full h-auto object-cover rounded-lg"
          />
        </div>
      </div>
    </div>
  )
}

export default ObjectModal
