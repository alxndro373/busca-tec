"use client"

import { addObject} from "@/actions/objectAction"
import { SubmitHandler, useForm } from "react-hook-form"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css";
import React, { useRef, useState } from "react"
import { useSession } from "next-auth/react"
import { getUserWithEmail } from "@/actions/userAction"
import { zodResolver } from "@hookform/resolvers/zod"
import { objectSchema } from "@/lib/zod"
import Swal from "sweetalert2"
import { z } from "zod"

export default function LostObjects() {

    const fileInputRef = useRef<HTMLInputElement|null>(null)
    const [startDate, setStartDate] = useState<Date|null>(new Date());
    const [image,setImage] = useState<string|undefined>(undefined)
    const [loader,setLoader] = useState<boolean>(false)

   const {data: session} = useSession()

   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] 
    if(file) setValue("file", file , {shouldValidate: true})
    setImage(file?.name)
   }

    const {register, handleSubmit, setValue, formState: {errors}} = useForm<z.infer<typeof objectSchema>>({
        resolver: zodResolver(objectSchema),
        defaultValues: {
            name_object: "",
            description:"" ,
            localization:"",
            category: "", 
        },
    })
    const onSubmit : SubmitHandler<z.infer<typeof objectSchema>> = async ({name_object,description,localization,category,file}) => {
        setLoader(true)
        try {
            const user = await getUserWithEmail(session?.user?.email as string)
            console.log(user)
            console.log(user[0])
            if(!user || user.length === 0){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Ha ocurrido un error al intentar cargar tus datos. Intenta refrescar la página o iniciar sesión de nuevo.",
                  });
                return 
            }
            const id = user[0].id_user
            const formData = new FormData()
            formData.append("file", file)
            const response = await fetch('/api/upload', {
                method: "POST",
                body: formData
            })
            const data = await response.json()
            await addObject(name_object,description,localization,startDate,category,data.image.secure_url,id)
            Swal.fire({
                title: `${name_object}`,
                text: "Publicado Exitosamente",
                icon: "success"
              })
        } catch (error) {
            console.log(error)
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "No se pudo subir el objeto perdido. Intentalo más tarde.",
              })
        }finally{
            setLoader(false)
        }
    }


    return (
        <>
            <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center mb-6">Añadir objeto perdido</h1>
            <main className="flex flex-col items-center gap-6 p-4 sm:p-6 md:p-8">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center py-6 w-full max-w-3xl bg-blue-950 text-white mb-6 rounded">
                    Añadir Objeto Perdido
                </h1>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl bg-white p-6 sm:p-8 shadow-md rounded-lg">
                    <div className="mb-4">
                    <label className="block mb-2 font-bold">¿Qué es?</label>
                    <input 
                        type="text" 
                        placeholder="Escribe qué tipo de objeto es." 
                        className="w-full p-2 border-2 border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500" 
                        {...register("name_object", {required: true})}
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block mb-2 font-bold">Descripción General</label>
                    <textarea 
                        placeholder="Escribe una breve descripción del objeto, como color, nombre, modelo, etc." 
                        className="w-full p-2 border-2 border-gray-300 rounded shadow-sm h-28 resize-none focus:outline-none focus:border-blue-500" 
                        {...register("description")}
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block mb-2 font-bold">Lo he dejado en</label>
                    <input 
                        type="text" 
                        placeholder="Describe el lugar donde lo perdiste." 
                        className="w-full p-2 border-2 border-gray-300 rounded shadow-sm focus:outline-none focus:border-blue-500" 
                        {...register("localization", {required: true})}
                    />
                    </div>

                    <div className="mb-4">
                    <label className="block mb-2 font-bold">Categorías</label>
                    <select 
                        className="w-full p-2 border-2 border-gray-300 rounded shadow-sm bg-white focus:outline-none focus:border-blue-500" 
                        {...register("category")}
                    >
                        <option value="Accesorios Personales">Accesorios Personales</option>
                        <option value="Documentos y Tarjetas">Documentos y Tarjetas</option>
                        <option value="Electronica">Electrónica</option>
                        <option value="Ropa y Calzado">Ropa y Calzado</option>
                        <option value="Otro">Otro</option>
                    </select>
                    </div>

                    <div className="mb-8">
                    <label className="block mb-2 font-bold">Fecha</label>
                    <div className="w-full p-2 border-2 border-gray-300 rounded shadow-sm focus-within:border-blue-500">
                        <DatePicker 
                        selected={startDate} 
                        onChange={(date) => setStartDate(date)} 
                        className="w-full focus:outline-none"
                        />
                    </div>
                    </div>

                    <div className="mb-8">
                    <h2 className="text-xl sm:text-2xl mb-4 font-bold">Imagen</h2>
                    <div className="flex flex-col items-center gap-4 p-4 border-2 border-gray-300 rounded bg-gray-50">
                        <button 
                        type="button" 
                        onClick={() => fileInputRef.current?.click()} 
                        className="bg-blue-950 text-white px-6 py-2 rounded hover:bg-blue-800"
                        >
                        Subir Foto
                        </button>
                        {image && <span className="text-gray-700">{image}</span>}
                        {errors.file && <span className="text-red-500">{errors.file.message}</span>}
                        <input 
                        type="file" 
                        onChange={onChange} 
                        ref={fileInputRef} 
                        className="hidden"
                        />
                        <p className="text-sm text-gray-500">☢️ El tamaño máximo permitido del archivo es de 5MB</p>
                        <p className="text-sm text-gray-500">☢️ Máximo 1 archivo permitido</p>
                    </div>
                    </div>

                    <div className="mb-4">
                    <div className="flex items-center mb-2">
                        <input type="checkbox" className="mr-2" required />
                        <label className="text-sm">
                        Acepto la <a href="/terms/privacy" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Política de privacidad</a>
                        </label>
                    </div>
                    <div className="flex items-center mb-4">
                        <input type="checkbox" className="mr-2" required />
                        <label className="text-sm">
                        Acepto los <a href="/terms/termsConditions" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">Términos y condiciones</a>
                        </label>
                    </div>
                    </div>

                    <div className="text-center">
                    <button 
                        type="submit" 
                        className={`w-full sm:w-auto px-8 py-2 bg-blue-950 text-white rounded ${loader ? 'opacity-75 cursor-not-allowed' : 'hover:bg-blue-800'}`} 
                        disabled={loader}
                    >
                        {loader ? "Subiendo..." : "Guardar"}
                    </button>
                    </div>
                </form>
            </main>
        </>
    )
}