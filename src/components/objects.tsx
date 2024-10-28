"use client"

import { objectType } from "@/types/objectType"
import { FC} from "react"
import { useState } from "react";

interface Props {
    objects: objectType[]
}

const ObjectsList: FC<Props> = ({ objects }) => {
    const [selectedObject, setSelectedObject] = useState<objectType | null>(null);

    const handleObjectClick = (object: objectType) => {
        setSelectedObject(object);
    };

    const closeModal = () => setSelectedObject(null);

    return (
        <>
            <div className="flex gap-10 mb-10 w-11/12 ml-auto mr-auto">
                {objects && objects.map(object => (
                    <div
                        key={object.id_object}
                        onClick={() => handleObjectClick(object)}
                        className="w-1/5 bg-white shadow-md cursor-pointer"
                    >
                        <img
                            src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-question-mark-pattern-png-image_6070996.jpg"
                            alt="imagen del objeto perdido"
                            className="w-full h-[200px] object-cover" />
                        <div>
                            <h4 className="font-bold">{object.name_object}</h4>
                            <span className="px-2 bg-red-500 text-white">{`${!object.state ? "Perdido" : "Encontrado"}`}</span>
                            <p>⌚ {object.date}</p>
                            <hr />
                            <p>💼 {object.category}</p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedObject && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 w-1/3 rounded-lg shadow-lg flex flex-col items-center">
                        <div className="flex w-full">
                            <div className="flex-1">
                                <button onClick={closeModal} className="text-red-500 font-bold mb-4">Cerrar</button>
                                <h4 className="font-bold text-2xl mb-2">{selectedObject.name_object}</h4>
                                <p><strong>Estado:</strong> {selectedObject.state ? "Encontrado" : "Perdido"}</p>
                                <p><strong>Fecha:</strong> {selectedObject.date}</p>
                                <p><strong>Categoría:</strong> {selectedObject.category}</p>
                                <p><strong>Descripción:</strong> {selectedObject.description}</p>
                                <p><strong>Lugar:</strong> {selectedObject.localization}</p>
                            </div>
                            <div className="w-1/3 ml-4">
                                <img
                                    src="https://png.pngtree.com/png-clipart/20210312/original/pngtree-question-mark-pattern-png-image_6070996.jpg"
                                    alt="imagen del objeto perdido"
                                    className="w-full h-full object-cover rounded-lg"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ObjectsList