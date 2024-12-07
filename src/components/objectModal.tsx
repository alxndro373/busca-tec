import { objectStore } from "@/store/objectStore"
import { objectType } from "@/types/objectType"
import { FC } from "react"
import { useSession } from "next-auth/react"

interface ObjectModalProps {
    selectedObject: objectType
    onClose: () => void
    buttonText: string
    option: string
}

const ObjectModal: FC<ObjectModalProps> = ({ selectedObject, onClose, buttonText, option }) => {
    const { data: session } = useSession()
    const { changeObjectState } = objectStore()

    const isOwnerOrAdmin =
        session?.user?.id === selectedObject.id_user || session?.user?.rol === "admin"

    const handleWhatsAppRedirect = (phone: string) => {
        const message = "¡Hola! Encontré el objeto que publicaste."
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        window.open(url, "_blank")
    }

    const handleAction = async () => {
        if (option === "usuario") {
            if (selectedObject.phone) {
                await changeObjectState(selectedObject.id_object, "encontrado")
                handleWhatsAppRedirect(selectedObject.phone as string);
                onClose()
            } else {
                console.error("El número de teléfono no está disponible.")
            }
        } else if (option === "admin") {
            const newState =
                selectedObject.state === "pendiente" ? "perdido" : "pendiente"
            changeObjectState(selectedObject.id_object, newState)
        }
    }

    const handleDelete = async (id_object: string) => {
        try {
            const response = await fetch(`/api/db/${id_object}`, {
                method: "DELETE",
            })

            if (!response.ok) {
                throw new Error("Error al eliminar el objeto")
            }

            onClose();
            alert("Objeto eliminado exitosamente")
        } catch (error) {
            alert("Error al eliminar el objeto")
            console.error(error)
        }
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
                        {selectedObject.state === "encontrado"
                            ? "Encontrado"
                            : "Perdido"}
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

                    {option === "usuario" && (
                        <>
                            {isOwnerOrAdmin && (
                                <button
                                    onClick={() => handleDelete(selectedObject.id_object)}
                                    className="mt-4 bg-red-500 text-sm text-white px-4 py-2 rounded"
                                >
                                    Eliminar
                                </button>
                            )}
                        </>
                    )}

                    {option === "usuario" && selectedObject.state === "perdido" && (
                        <button
                            onClick={() => handleAction()}
                            className="mt-4 bg-green-500 text-sm text-white px-4 py-2 rounded"
                        >
                            {buttonText}
                        </button>
                    )}

                    {option === "admin" && (
                        <div>
                            <button
                                onClick={() => handleAction()}
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