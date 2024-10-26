"use client"

import { addObject } from "@/actions/objectAction"
import { SubmitHandler, useForm } from "react-hook-form"
import { objectType } from "@/types/objectType"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react"


export default function LostObjects() {

    
    const [startDate, setStartDate] = useState<Date|null>(new Date());


    const {register, handleSubmit} = useForm<objectType>({
        defaultValues: {
            name_object: "",
            description:"" ,
            localization:""  
        },
    })
    const onSubmit : SubmitHandler<objectType> = ({name_object,description,localization}) => {
        addObject(name_object,description,localization,startDate)
        alert("Objeto perdido publicado exitosamente")
    }


    return (
        <>
            <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center mb-6">Añadir objeto perdido</h1>
            <main className="flex flex-col items-center gap-4">
                <h2 className="text-white bg-blue-950 w-4/5 py-2 text-2xl">Información general</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="w-4/5">
                    <div>
                        <p className="mb-2 font-bold">¿Que es?</p>
                        <input 
                        className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-2" 
                        type="text" 
                        placeholder="escribe que tipo de objeto es." 
                        {...register("name_object")}
                        />
                    </div>
                    <div>
                        <p className="mb-2 font-bold">Descripcion General</p>
                        <input type="text" 
                            className="border-2 border-gray-500 shadow-md w-6/12 h-28 mb-2"
                            placeholder="Escribe una breve descripción del objeto. como color,nombre,modelo etc."
                            {...register("description")}
                        />
                    </div>
                    <div>
                        <p className="mb-2 font-bold">Lo he dejado en</p>
                        <input 
                        className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-2" 
                        type="text" 
                        placeholder="Escribe una breve descripción del lugar donde recuerdes haberlo perdido." 
                        {...register("localization")}
                        />
                    </div>
                    <div className="mb-12">
                        <p className="mb-2 font-bold">Fecha</p>
                        <div className="p-1 border-2 border-gray-500 shadow-md w-6/12">
                            <DatePicker   selected={startDate} onChange={(date) => setStartDate(date)} />   
                        </div>
                    </div>
                    <h2 className="text-white bg-blue-950 w-full py-2 text-2xl mb-10">Imagen</h2>
                    <section className="w-4/5 ml-auto mr-auto">
                        <div className="bg-gray-100 flex flex-col gap-6 items-center mb-10">
                            <h3 className="text-gray-600 text-xl font-bold">Arrastar y Soltar</h3>
                            <p>o</p>
                            <button className="bg-blue-950 p-2 text-white rounded-md">Subir foto</button>
                            <p>☢️El tamaño maximo permitido por archivo es 5.00MB ☢️El tamaño maximo de archivo total permitido es de 15.00MB</p>
                            <p>☢️Maximo 3 archivos permitidos</p>
                        </div>
                        <div className="mb-10">
                            <div className=" text-center mb-2">
                            <input type="checkbox" className="align-middle" />
                            <label className="ml-2 text-sm">Acepto la <strong>politica de privacidad</strong></label>
                            </div>
                            <div className="text-center mb-4">
                            <input type="checkbox" className="align-middle" />
                            <label className="ml-2 text-sm">Acepto los <strong>terminos y condiciones</strong> </label>
                            </div>
                            <div className="text-center">
                            <button className="bg-blue-950 py-2 w-[266px] text-white ">Guardar</button>
                            </div>
                        </div>
                    </section>
                </form>
            </main>
        </>
    )
}