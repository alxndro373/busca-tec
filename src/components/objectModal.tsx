import { objectStore } from "@/store/objectStore"
import { objectType } from "@/types/objectType"
import { FC } from "react"

interface ObjectModalProps {
    selectedObject: objectType
    onClose: () => void
    buttonText: string
    option: boolean
  }


const ObjectModal: FC<ObjectModalProps> = ({ selectedObject, onClose, buttonText, option}) => {

    const handleWhatsAppRedirect = (phone: string) => {
        const message = "¡Hola! Encontre el objeto que publicaste."
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
        window.open(url, "_blank")
    }
    const {changeObjectState} = objectStore()
    const handleAction = () => {
        const {state} = selectedObject
        if(option) handleWhatsAppRedirect(selectedObject.phone as string)
        else changeObjectState(selectedObject.id_object,!state as boolean)
    }
   
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 w-11/12 md:w-1/2 lg:w-1/3 rounded-lg shadow-lg flex flex-col md:flex-row items-center">
                <div className="flex-1 mb-4 md:mb-0">
                    <button onClick={onClose} className="text-red-500 font-bold mb-4">Cerrar</button>
                    <h4 className="font-bold text-2xl mb-2">{selectedObject.name_object}</h4>
                    <p><strong>Estado:</strong> {selectedObject.state ? "Encontrado" : "Perdido"}</p>
                    <p><strong>Fecha:</strong> {selectedObject.date}</p>
                    <p><strong>Categoría:</strong> {selectedObject.category}</p>
                    <p><strong>Descripción:</strong> {selectedObject.description}</p>
                    <p><strong>Lugar:</strong> {selectedObject.localization}</p>

                    {!selectedObject.state && (
                        <button 
                            onClick={() => handleAction()}
                            className="mt-4 bg-green-500 text-sm text-white px-4 py-2 rounded"
                        >
                            {buttonText}
                        </button>
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