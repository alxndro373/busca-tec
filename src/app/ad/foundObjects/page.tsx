// "use client"

// import { addObject} from "@/actions/objectAction"
// import { SubmitHandler, useForm } from "react-hook-form"
// import DatePicker from "react-datepicker"
// import "react-datepicker/dist/react-datepicker.css";
// import React, { useRef, useState } from "react"
// import { useSession } from "next-auth/react"
// import { getUserWithEmail } from "@/actions/userAction"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { objectSchema } from "@/lib/zod"
// import Swal from "sweetalert2"
// import { z } from "zod"

// export default function FoundObjects(){

//     const fileInputRef = useRef<HTMLInputElement|null>(null)
//     const [startDate, setStartDate] = useState<Date|null>(new Date());
//     const [image,setImage] = useState<string|undefined>(undefined)
//     const [loader,setLoader] = useState<boolean>(false)

//    const {data: session} = useSession()

//    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] 
//     if(file) setValue("file", file , {shouldValidate: true})
//     setImage(file?.name)
//    }

//     const {register, handleSubmit, setValue, formState: {errors}} = useForm<z.infer<typeof objectSchema>>({
//         resolver: zodResolver(objectSchema),
//         defaultValues: {
//             name_object: "",
//             description:"" ,
//             localization:"",
//             category: "", 
//         },
//     })
//     const onSubmit : SubmitHandler<z.infer<typeof objectSchema>> = async ({name_object,description,localization,category,file}) => {
//         setLoader(true)
//         try {
//             const user = await getUserWithEmail(session?.user?.email as string)
//             console.log(user)
//             console.log(user[0])
//             if(!user || user.length === 0){
//                 Swal.fire({
//                     icon: "error",
//                     title: "Oops...",
//                     text: "Ha ocurrido un error al intentar cargar tus datos. Intenta refrescar la página o iniciar sesión de nuevo.",
//                   });
//                 return 
//             }
//             const id = user[0].id_user
//             const formData = new FormData()
//             formData.append("file", file)
//             const response = await fetch('/api/upload', {
//                 method: "POST",
//                 body: formData
//             })
//             const data = await response.json()
//             await addObject(name_object,description,localization,startDate,category,data.image.secure_url,id, true)
//             Swal.fire({
//                 title: `${name_object}`,
//                 text: "Publicado Exitosamente",
//                 icon: "success"
//               })
//         } catch (error) {
//             console.log(error)
//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: "No se pudo subir el objeto perdido. Intentalo más tarde.",
//               })
//         }finally{
//             setLoader(false)
//         }
//     }    

//     return (
//         <>
//             <h1 className="bg-blue-950 text-white text-4xl font-bold py-14 text-center mb-6">Añadir objeto Encontrado</h1>
//             <main className="flex flex-col items-center gap-4">
//                 <h2 className="text-white bg-blue-950 w-4/5 py-2 text-2xl">Información general</h2>
//                 <form onSubmit={handleSubmit(onSubmit)} className="w-4/5">
//                     <div>
//                         <p className="mb-2 font-bold">¿Que es?</p>
//                         <input className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-2" type="text" placeholder="Escribe que tipo de objeto es."
//                         {...register("name_object", {required:true})}    
//                         />
//                     </div>
//                     <div>
//                         <p className="mb-2 font-bold">Descripcion General</p>
//                         <input type="text" 
//                             className="border-2 border-gray-500 shadow-md w-6/12 h-28 mb-2"
//                             placeholder="Escribe una breve descripción del objeto. como color,nombre,modelo etc."
//                             {...register("description")}
//                         />
//                     </div>
//                     <div>
//                         <p className="mb-2 font-bold">Lo he encontrado en</p>
//                         <input 
//                         className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-2" 
//                         type="text" 
//                         placeholder="Escribe una breve descripción del lugar donde recuerdes haberlo perdido." 
//                         {...register("localization", {required:true})}
//                         />
//                     </div>

//                     <div>
//                         <p className="mb-2 font-bold">Categorias</p>
//                         <select className="p-1 border-2 border-gray-500 w-6/12 shadow-md mb-1 bg-white" {...register("category")} >
//                             <option value="Accesorios Personales">Accesorios Personales</option>
//                             <option value="Documentos y Tarjetas">Documentos y Tarjetas</option>
//                             <option value="Electronica">Electrónica</option>
//                             <option value="Ropa y Calzado">Ropa o calzado</option>
//                             <option value="otro">Otro</option>
//                         </select>
//                     </div>
//                     <div className="mb-12">
//                         <p className="mb-2 font-bold">Fecha</p>
//                         <div className="p-1 border-2 border-gray-500 shadow-md w-6/12">
//                             <DatePicker   selected={startDate} onChange={(date) => setStartDate(date)} />   
//                         </div>
//                     </div>
//                     <h2 className="text-white bg-blue-950 w-full py-2 text-2xl mb-10">Imagen</h2>
//                     <section className="w-4/5 ml-auto mr-auto">
//                         <div className="bg-gray-100 flex flex-col gap-6 items-center mb-10">

//                             <button onClick={() => fileInputRef.current?.click()} type="button" className="bg-blue-950 p-2 text-white rounded-md mt-10">
//                                 Subir Foto
//                             </button>
//                             {image && <span>{image}</span>}
//                             {errors.file && <span className="text-red-500">{errors.file.message}</span>}
//                             <input onChange={onChange} ref={fileInputRef} className="hidden" type="file" />
//                             <p>☢️El tamaño maximo permitido del archivo es de 5.00MB ☢️</p>
//                             <p className="mb-10">☢️Maximo 1 archivo permitidos</p>
//                         </div>
//                         <div className="mb-10">
//                             <div className=" text-center mb-2">
//                                 <input type="checkbox" className="align-middle" required={true} />
//                                 <label className="ml-2 text-sm">
//                                     Acepto la <strong>
//                                         <a href="/terms/privacy" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
//                                             Política de privacidad
//                                         </a>
//                                     </strong>
//                                 </label>
//                             </div>
//                             <div className="text-center mb-4">
//                                 <input type="checkbox" className="align-middle" required={true} />
//                                 <label className="ml-2 text-sm">
//                                     Acepto los <strong>
//                                         <a href="/terms/termsConditions" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
//                                             Términos y condiciones
//                                         </a>
//                                     </strong>
//                                 </label>
//                             </div>
//                             <div className="text-center">
//                             <button className="bg-blue-950 py-2 w-[266px] text-white ">{loader ? "Subiendo..." : "Guardar"}</button>
//                             </div>
//                         </div>
//                     </section>
//                 </form>
//             </main>
//         </>
//     )
// }